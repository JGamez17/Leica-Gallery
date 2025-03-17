"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <section className="h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      {/* Text Content */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-bold">Welcome to My Leica Project</h1>
        <p className="mt-4 text-lg">
          Capturing moments through the lens of a Leica camera.
        </p>
      </div>

      {/* Rotating Static Image */}
      <motion.div
        className="w-40 h-40 relative mb-8 flex justify-center items-center"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-40 h-40 overflow-hidden rounded-full">
          <img
            src="/photos/photo1.jpg?v=1"
            alt="Sample Leica Image"
            // layout="responsive"
            width={160}
            height={160}
            className="rounded-full"
          // priority={true}
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
