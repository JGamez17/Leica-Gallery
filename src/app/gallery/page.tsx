"use client";

import { useState } from "react";
import ImageGallery from "@/components/ImageGallery";
import Header from "@/components/Header";

export default function GalleryPage() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleUploadSuccess = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gray-900">
      <Header onUploadSuccess={handleUploadSuccess} />
      <h1 className="text-4xl font-bold text-white text-center py-6">DtMF</h1>
      <ImageGallery key={refreshKey} />
    </main>
  );
}



