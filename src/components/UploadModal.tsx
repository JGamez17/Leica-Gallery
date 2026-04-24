"use client";

import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { motion, AnimatePresence } from "framer-motion";

type UploadModalProps = {
  onUploadSuccess: () => void;
};

const UploadModal = ({ onUploadSuccess }: UploadModalProps) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!file || !title) {
      setError("Please add a title and select a photo.");
      return;
    }

    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("image", file);

    try {
      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Upload failed");

      setOpen(false);
      setTitle("");
      setFile(null);
      onUploadSuccess();
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="fixed bottom-8 right-8 bg-white text-black font-semibold px-5 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all z-50">
          + Upload Photo
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/70 z-40" />
        <Dialog.Content className="fixed z-50 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-900 border border-gray-700 rounded-2xl p-8 w-full max-w-md shadow-2xl">
          <VisuallyHidden>
            <Dialog.Title>Upload a Photo</Dialog.Title>
          </VisuallyHidden>

          <h2 className="text-white text-2xl font-bold mb-6">Upload a Photo</h2>

          {/* Title Input */}
          <div className="mb-4">
            <label className="text-gray-400 text-sm mb-1 block">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Street shot, Tokyo 2024"
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-white/20"
            />
          </div>

          {/* File Input */}
          <div className="mb-6">
            <label className="text-gray-400 text-sm mb-1 block">Photo</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full bg-gray-800 text-white rounded-lg px-4 py-2 file:mr-4 file:py-1 file:px-3 file:rounded-full file:border-0 file:bg-white file:text-black file:text-sm cursor-pointer"
            />
            {file && (
              <p className="text-gray-400 text-xs mt-1">{file.name}</p>
            )}
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-4">{error}</p>
          )}

          {/* Actions */}
          <div className="flex gap-3 justify-end">
            <Dialog.Close asChild>
              <button className="px-4 py-2 text-gray-400 hover:text-white transition-colors">
                Cancel
              </button>
            </Dialog.Close>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-5 py-2 bg-white text-black font-semibold rounded-lg hover:bg-gray-200 transition-all disabled:opacity-50"
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default UploadModal;