"use client";

import UploadDialog from "./UploadDialog";

type HeaderProps = {
  onUploadSuccess?: () => void;
};

const Header = ({ onUploadSuccess }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-30 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-white text-lg font-semibold tracking-wide">
            Leica Gallery
          </span>
        </div>

        <UploadDialog onUploadSuccess={onUploadSuccess} />
      </div>
    </header>
  );
};

export default Header;
