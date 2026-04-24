import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function POST(request: NextRequest) {
  try {
    console.log('Starting upload...');
    
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const title = formData.get('title') as string;
    
    console.log('File received:', {
      name: file?.name,
      size: file?.size,
      type: file?.type,
    });
    
    if (!file || !title) {
      return NextResponse.json({ error: 'Missing file or title' }, { status: 400 });
    }
    
    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    console.log('Buffer created, size:', buffer.length);
    
    // Upload to Cloudinary
    const uploadResult: { secure_url: string } = await new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'leica-gallery',
          resource_type: 'image',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            reject(error);
          } else {
            console.log('Upload success!', result?.secure_url);
            if (result) resolve(result);
      else reject(new Error('No result from Cloudinary'));
          }
        }
      );
      
      uploadStream.end(buffer);
    });
    
    // Save to database
    const photo = await prisma.photo.create({
      data: {
        title,
        imageUrl: uploadResult.secure_url,
        userId: 'temp-user-id',
      },
    });
    
    return NextResponse.json({ success: true, photo }, { status: 201 });
    
  } catch {
    return NextResponse.json({ 
      error: 'Fetching photos failed',
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ photos });
  } catch {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Missing photo id' }, { status: 400 });
    }

    const photo = await prisma.photo.findUnique({ where: { id } });

    if (!photo) {
      return NextResponse.json({ error: 'Photo not found' }, { status: 404 });
    }

    // Delete from Cloudinary
    const publicId = photo.imageUrl.split('/').slice(-2).join('/').split('.')[0];
    await cloudinary.uploader.destroy(publicId);

    // Delete from DB
    await prisma.photo.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 });
  }
}