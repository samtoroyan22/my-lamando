"use client";

import { useState } from "react";

import type { PhotoCategory } from "@/types/gallery";
import { useGallery } from "@/contexts/gallery-context";

import GalleryGrid from "@/components/gallery/gallery-grid";
import GallerySkeleton from "@/components/gallery/gallery-skeleton";
import { Button } from "../ui/button";

const categories: Array<PhotoCategory | "All"> = [
  "All",
  "Exterior",
  "Interior",
  "Engine",
  "Wheels",
  "Documents",
  "Service",
  "Before / After",
  "Other",
];

const GalleryPageContent = () => {
  const { isLoading } = useGallery();
  const [category, setCategory] = useState<PhotoCategory | "All">("All");

  if (isLoading) {
    return <GallerySkeleton />;
  }

  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categories.map((item) => {
          const isActive = category === item;

          return (
            <Button
              key={item}
              variant="secondary"
              onClick={() => setCategory(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "bg-background"
              }`}
            >
              {item}
            </Button>
          );
        })}
      </div>

      <GalleryGrid category={category} />
    </div>
  );
};

export default GalleryPageContent;
