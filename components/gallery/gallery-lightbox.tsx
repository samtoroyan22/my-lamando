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
    if (index === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") onPrevious();
      if (event.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [index, onClose, onPrevious, onNext]);

  if (index === null) return null;

  const photo = photos[index];
  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="Photo lightbox"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        className="cursor-pointer absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
      >
        <X className="size-5" />
      </button>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={onPrevious}
            aria-label="Previous photo"
            className="cursor-pointer absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronLeft className="size-5" />
          </button>

          <button
            type="button"
            onClick={onNext}
            aria-label="Next photo"
            className="cursor-pointer absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
          >
            <ChevronRight className="size-5" />
          </button>
        </>
      )}

      <div className="flex max-h-full max-w-6xl flex-col items-center gap-4">
        <div className="relative h-[70vh] w-[90vw] max-w-5xl sm:h-[75vh]">
          <Image
            src={photo.src}
            alt={photo.title ?? "Car photo"}
            fill
            unoptimized
            sizes="90vw"
            className="object-contain"
            priority
          />
        </div>

        {(photo.title || photo.category || photo.comment) && (
          <div className="max-w-xl text-center text-white">
            {photo.title && (
              <h3 className="text-lg font-semibold tracking-tight">
                {photo.title}
              </h3>
            )}
            <p className="mt-1 text-sm text-white/60">{photo.category}</p>
            {photo.comment && (
              <p className="mt-2 text-sm text-white/75">{photo.comment}</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryLightbox;
