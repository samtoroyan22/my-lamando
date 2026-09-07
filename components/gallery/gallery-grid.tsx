"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { format } from "date-fns";
import { motion } from "motion/react";

import { useGallery } from "@/contexts/gallery-context";
import type { GalleryPhoto, PhotoCategory } from "@/types/gallery";
import GalleryDialog from "@/components/gallery/gallery-dialog";
import GalleryLightbox from "@/components/gallery/gallery-lightbox";
import { ConfirmDialog } from "../shared/confirm-dialog";
import { toast } from "sonner";

interface GalleryGridProps {
  category: PhotoCategory | "All";
}

const GalleryGrid = ({ category }: GalleryGridProps) => {
  const { galleryEntries, deleteGalleryEntry } = useGallery();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const photos = useMemo(() => {
    if (category === "All") return galleryEntries;
    return galleryEntries.filter((photo) => photo.category === category);
  }, [galleryEntries, category]);

  const openLightbox = (photo: GalleryPhoto) => {
    const index = photos.findIndex((item) => item.id === photo.id);
    setLightboxIndex(index);
  };

  const handlePrevious = () => {
    setLightboxIndex((current) => {
      if (current === null || photos.length === 0) return current;
      return current === 0 ? photos.length - 1 : current - 1;
    });
  };

  const handleNext = () => {
    setLightboxIndex((current) => {
      if (current === null || photos.length === 0) return current;
      return current === photos.length - 1 ? 0 : current + 1;
    });
  };

  if (photos.length === 0) {
    return (
      <div className="flex min-h-55 items-center justify-center rounded-xl border border-dashed border-border/60">
        <p className="text-sm text-muted-foreground">
          No photos in this category yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.25,
              delay: index * 0.03,
              ease: "easeOut",
            }}
            className="group overflow-hidden rounded-xl border border-border/60 bg-card transition-colors hover:border-border"
          >
            <button
              type="button"
              onClick={() => openLightbox(photo)}
              className="block w-full cursor-pointer text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              aria-label={`Open photo: ${photo.title ?? photo.category}`}
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <Image
                  src={photo.src}
                  alt={photo.title ?? `${photo.category} photo`}
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
              </div>
            </button>

            <div className="relative px-4 py-3.5">
              <div className="absolute right-3 top-3 flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                <GalleryDialog entry={photo} />
                <ConfirmDialog
                  title="Delete gallery entry?"
                  description="This action cannot be undone."
                  onConfirm={() => {
                    deleteGalleryEntry(photo.id);
                    toast.success("Gallery entry deleted");
                  }}
                />
              </div>

              <div className="min-w-0 pr-16">
                <div className="flex min-w-0 items-center gap-2">
                  <p className="min-w-0 truncate text-sm font-medium">
                    {photo.title ?? "Untitled photo"}
                  </p>
                  <span className="shrink-0 rounded-md bg-muted/70 px-2 py-0.5 text-[11px] font-medium text-muted-foreground">
                    {photo.category}
                  </span>
                </div>

                <div className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                  <time dateTime={photo.date}>
                    {format(new Date(photo.date), "dd.MM.yyyy")}
                  </time>
                  {photo.mileage !== undefined && (
                    <>
                      <span className="text-border">•</span>
                      <span className="tabular-nums">
                        {photo.mileage.toLocaleString("ru-RU")} km
                      </span>
                    </>
                  )}
                </div>

                {photo.comment && (
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                    {photo.comment}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <GalleryLightbox
        photos={photos}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onPrevious={handlePrevious}
        onNext={handleNext}
      />
    </>
  );
};

export default GalleryGrid;
