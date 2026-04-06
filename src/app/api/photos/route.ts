import { NextRequest, NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Hardcoded config (TEMPORARY)
cloudinary.config({
  cloud_name: 'ddnjcyynn',
  api_key: '269731457526941',
  api_secret: 'DYrpxD7QIvBsXhX0mdhNWWTmskg',
  secure: true,
});

console.log('Cloudinary hardcoded config:', {
  cloud_name: cloudinary.config().cloud_name,
  api_key: cloudinary.config().api_key ? 'present' : 'MISSING',
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
    const uploadResult: any = await new Promise((resolve, reject) => {
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
            resolve(result);
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
    
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload failed',
      details: error,
    }, { status: 500 });
  }
}

export async function GET() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ photos });
  } catch (error) {
    return NextResponse.json({ error: 'Fetch failed' }, { status: 500 });
  }
}