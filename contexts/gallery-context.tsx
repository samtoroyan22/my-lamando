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

import { GalleryPhoto } from "@/types/gallery";

interface GalleryContextValue {
  galleryEntries: GalleryPhoto[];
  addGalleryEntry: (entry: GalleryPhoto) => void;
  updateGalleryEntry: (entry: GalleryPhoto) => void;
  deleteGalleryEntry: (id: string) => void;
}

const GalleryContext = createContext<GalleryContextValue | undefined>(
  undefined,
);

export function GalleryProvider({ children }: { children: ReactNode }) {
  const [galleryEntries, setGalleryEntries] = useState<GalleryPhoto[]>([]);

  // загрузка данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const storedEntries = getGalleryPhotos();

    startTransition(() => {
      setGalleryEntries(storedEntries);
    });
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
