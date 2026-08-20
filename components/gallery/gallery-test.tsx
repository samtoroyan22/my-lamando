"use client";

import { useGallery } from "@/contexts/gallery-context";
import { GalleryPhoto } from "@/types/gallery";

const GalleryTest = () => {
  const {
    galleryEntries,
    addGalleryEntry,
    updateGalleryEntry,
    deleteGalleryEntry,
  } = useGallery();

  const handleAddGallery = () => {
    const newEntry: GalleryPhoto = {
      id: crypto.randomUUID(),
      url: "https://example.com/photo.jpg",
      date: new Date().toISOString(),
      category: "Nature",
      description: "A beautiful landscape photo",
    };

    addGalleryEntry(newEntry);
  };

  const handleUpdateGallery = (entry: GalleryPhoto) => {
    const updatedEntry: GalleryPhoto = {
      ...entry,
      description: entry.description + " (Updated)",
    };

    updateGalleryEntry(updatedEntry);
  };

  const handleDeleteGallery = (id: string) => {
    deleteGalleryEntry(id);
  };

  return (
    <div>
      <h2>Gallery Test</h2>

      <p>Gallery entries: {galleryEntries.length}</p>

      <button onClick={handleAddGallery}>Add Test Gallery Entry</button>

      {galleryEntries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Category: {entry.category}</p>
          <p>Description: {entry.description}</p>
          <p>URL: {entry.url}</p>

          <button onClick={() => handleUpdateGallery(entry)}>Update</button>

          <button onClick={() => handleDeleteGallery(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default GalleryTest;
