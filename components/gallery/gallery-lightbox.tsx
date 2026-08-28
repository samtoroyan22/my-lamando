"use client";

import { useEffect } from "react";

import Image from "next/image";

import { X, ChevronLeft, ChevronRight } from "lucide-react";

import type { GalleryPhoto } from "@/types/gallery";

interface GalleryLightboxProps {
  photos: GalleryPhoto[];
  index: number | null;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}

const GalleryLightbox = ({
  photos,
  index,
  onClose,
  onPrevious,
  onNext,
}: GalleryLightboxProps) => {
  useEffect(() => {
    if (index === null) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onPrevious();
      }

      if (event.key === "ArrowRight") {
        onNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrevious, onNext]);

  if (index === null) {
    return null;
  }

  const photo = photos[index];

  if (!photo) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20 cursor-pointer"
      >
        <X className="size-6" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous photo"
            className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 cursor-pointer"
          >
            <ChevronLeft className="size-6" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 cursor-pointer"
          >
            <ChevronRight className="size-6" />
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-6xl flex-col items-center gap-4">
        <div className="relative h-[75vh] w-[90vw] max-w-6xl">
          <Image
            src={photo.src}
            alt={photo.title ?? "Car photo"}
            fill
            unoptimized
            sizes="90vw"
            className="object-contain"
          />
        </div>

        {(photo.title || photo.category || photo.comment) && (
          <div className="max-w-xl text-center text-white">
            {photo.title && (
              <h3 className="text-lg font-semibold">{photo.title}</h3>
            )}

            <p className="mt-1 text-sm text-white/70">{photo.category}</p>

            {photo.comment && (
              <p className="mt-2 text-sm text-white/80">{photo.comment}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
