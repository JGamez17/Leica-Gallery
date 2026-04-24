"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  // Text to be split
  const text = "Welcome to My Leica Project";

  // Split the text into individual characters
  const characters = text.split("");

  // Variants for the animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  };

  return (
    <section className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Text Content */}
      <div className="text-center mb-8">
        <motion.h1
          className="text-5xl font-bold"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {characters.map((char, index) => (
            <motion.span key={index} variants={childVariants}>
              {char}
            </motion.span>
          ))}
        </motion.h1>
        <p className="mt-4 text-lg">
          Capturing moments through the lens of a Leica camera.
        </p>
      </div>

      <motion.div
        className="w-40 h-40 relative mb-8 flex justify-center items-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-40 h-40 overflow-hidden rounded-full">
          <Image
            src="/photos/photo1.jpg?v=1"
            alt="Sample Leica Image"
            width={160}
            height={160}
            className="rounded-full"
            /> 
        </div>
      </motion.div>

      {/* Call to Action Button */}
      <div>
        <Link href="/gallery">
          <button className="px-6 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg">
            Explore Gallery
          </button>
        </Link>
      </div>
    </section>
  );
}