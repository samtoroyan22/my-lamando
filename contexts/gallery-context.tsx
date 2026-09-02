"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getGalleryPhotos,
  addGalleryPhoto as saveGalleryPhoto,
  updateGalleryPhoto as saveUpdatedGalleryPhoto,
  deleteGalleryPhoto as removeGalleryPhoto,
} from "@/lib/storage/gallery-storage";

import type { GalleryPhoto } from "@/types/gallery";

interface GalleryContextValue {
  galleryEntries: GalleryPhoto[];
  isLoading: boolean;
  addGalleryEntry: (entry: GalleryPhoto) => void;
  updateGalleryEntry: (entry: GalleryPhoto) => void;
  deleteGalleryEntry: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextValue | undefined>(
  undefined,
);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [galleryEntries, setGalleryEntries] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();

    const storedEntries = getGalleryPhotos();

    const elapsed = Date.now() - startedAt;
    const remainingDelay = Math.max(500 - elapsed, 0);

    const timeoutId = setTimeout(() => {
      startTransition(() => {
        setGalleryEntries(storedEntries);
        setIsLoading(false);
      });
    }, remainingDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const addGalleryEntry = (entry: GalleryPhoto) => {
    setGalleryEntries((currentEntries) => [...currentEntries, entry]);
    saveGalleryPhoto(entry);
  };

  const updateGalleryEntry = (updatedEntry: GalleryPhoto) => {
    setGalleryEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );
    saveUpdatedGalleryPhoto(updatedEntry);
  };

  const deleteGalleryEntry = (id: string) => {
    setGalleryEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
    removeGalleryPhoto(id);
  };

  return (
    <GalleryContext.Provider
      value={{
        galleryEntries,
        isLoading,
        addGalleryEntry,
        updateGalleryEntry,
        deleteGalleryEntry,
      }}
    >
      {children}
    </GalleryContext.Provider>
  );
}

export function useGallery() {
  const context = useContext(GalleryContext);

  if (!context) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }

  return context;
}
