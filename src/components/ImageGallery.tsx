"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import UploadModal from './UploadModal';

type Photo = {
  id: string;
  title: string;
  imageUrl: string;
};

const ImageGallery = () => {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchPhotos = () => {
    setLoading(true);
    fetch('/api/photos')
      .then(res => res.json())
      .then(data => {
        setPhotos(data.photos || []);
        setLoading(false);
      })
      .catch(err => {
        console.error('Failed to fetch photos:', err);
        setLoading(false);
      });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this photo?')) return;
    try {
      await fetch('/api/photos', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      });
      fetchPhotos();
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px] bg-gray-900">
        <p className="text-white text-lg">Loading gallery...</p>
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="relative min-h-screen bg-gray-900">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-white text-lg">No photos yet. Upload some!</p>
        </div>
        <UploadModal onUploadSuccess={fetchPhotos} />
      </div>
    );
  }

  return (
    <div className="bg-gray-900 min-h-screen p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {photos.map((photo) => (
         <motion.div
         key={photo.id}
         className="relative cursor-pointer group"
         whileHover={{ scale: 1.05 }}
         whileTap={{ scale: 0.95 }}
       >
         <div onClick={() => setSelectedPhoto(photo)}>
           <Image
             src={photo.imageUrl}
             alt={photo.title}
             width={300}
             height={300}
             className="rounded-lg shadow-md object-cover w-full h-64"
           />
           <p className="text-white text-sm text-center mt-2">{photo.title}</p>
         </div>
         <button
           onClick={() => handleDelete(photo.id)}
           className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
         >
           Delete
         </button>
       </motion.div>
        ))}
      </div>

      <UploadModal onUploadSuccess={fetchPhotos} />

      {/* Fullscreen Lightbox */}
      <Dialog.Root open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/80 z-40" />
          <Dialog.Content className="fixed inset-0 flex items-center justify-center z-50">
            <VisuallyHidden>
              <Dialog.Title>Selected Photo</Dialog.Title>
              <Dialog.Description>
                A larger view of the selected photo from the gallery.
              </Dialog.Description>
            </VisuallyHidden>

            {selectedPhoto && (
              <motion.div
                className="relative"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <Image
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.title}
                  width={800}
                  height={800}
                  className="rounded-lg shadow-lg object-contain max-h-[80vh]"
                />
                <p className="text-white text-center mt-3 text-lg">{selectedPhoto.title}</p>
                <button
                  onClick={() => setSelectedPhoto(null)}
                  className="absolute top-2 right-2 bg-white text-black px-3 py-1 rounded-full shadow-md text-sm"
                >
                  Close
                </button>
              </motion.div>
            )}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
};

export default ImageGallery;