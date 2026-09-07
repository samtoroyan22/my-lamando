"use client";

import { useState } from "react";
import type { PhotoCategory } from "@/types/gallery";
import { useGallery } from "@/contexts/gallery-context";
import GalleryGrid from "@/components/gallery/gallery-grid";
import GallerySkeleton from "@/components/gallery/gallery-skeleton";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/utils";

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
      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map((item) => {
          const isActive = category === item;

          return (
            <Button
              key={item}
              variant="ghost"
              size="sm"
              onClick={() => setCategory(item)}
              className={cn(
                "h-8 rounded-full  px-3.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  : " bg-background text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
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
