"use client";

import { useState } from "react";

import type { PhotoCategory } from "@/types/gallery";

import GalleryDialog from "@/components/gallery/gallery-dialog";
import GalleryGrid from "@/components/gallery/gallery-grid";
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
  const [category, setCategory] = useState<PhotoCategory | "All">("All");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Gallery</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Visual history of your Lamando.
          </p>
        </div>

        <GalleryDialog />
      </div>

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
