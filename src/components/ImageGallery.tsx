import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import * as Dialog from '@radix-ui/react-dialog';

const photos = [
    { src: '/photos/photo1.jpg', alt: 'Photo 1' },
    { src: '/photos/photo2.jpg', alt: 'Photo 2' },
    { src: '/photos/photo3.jpg', alt: 'Photo 3' },
];

const ImageGallery = () => {
    const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-6">
            {photos.map((photo, index) => (
                <motion.div
                    key={index}
                    className="relative cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedPhoto(photo.src)}
                >
                    <img
                        src={photo.src}
                        alt={photo.alt}
                        width={300}
                        height={300}
                        className="rounded-lg shadow-md object-cover"
                    />
                </motion.div>
            ))}

            {/* Radix Dialog for Fullscreen View */}
            <Dialog.Root open={!!selectedPhoto} onOpenChange={() => setSelectedPhoto(null)}>
                <Dialog.Portal>
                    <Dialog.Overlay className="DialogOverlay" />
                    <Dialog.Content
                        asChild
                        className="fixed inset-0 flex items-center justify-center z-50"
                    >
                        {selectedPhoto && (
                            <motion.div
                                className="relative"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                            >
                                <Image
                                    src={selectedPhoto}
                                    alt="Selected Photo"
                                    width={800}
                                    height={800}
                                    className="rounded-lg shadow-lg object-contain"
                                />
                                <button
                                    onClick={() => setSelectedPhoto(null)}
                                    className="absolute top-2 right-2 bg-white text-black p-2 rounded-full shadow-md"
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
