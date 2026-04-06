"use client"

import ImageGallery from '@/components/ImageGallery';
import Header from '@/components/Header';

export default function GalleryPage() {
    return (
        <main className="min-h-screen ">
            <Header />
            <h1 className="text-4xl font-bold  text-center py-6">DtMF</h1>
            <ImageGallery />


        </main>
    );
}



