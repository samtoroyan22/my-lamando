import type { GalleryPhoto } from "@/types/gallery";

import { initialGalleryPhotos } from "@/data/initial-data";
import { STORAGE_KEYS } from "./keys";
import { getStorageItem, setStorageItem } from "./storage";

// получение списка записей о фото из localStorage
export function getGalleryPhotos(): GalleryPhoto[] {
  return getStorageItem<GalleryPhoto[]>(
    STORAGE_KEYS.gallery,
    initialGalleryPhotos,
  );
}

// добавление новой записи о фото в localStorage
export function addGalleryPhoto(photo: GalleryPhoto): void {
  const photos = getGalleryPhotos();

  setStorageItem(STORAGE_KEYS.gallery, [...photos, photo]);
}

// обновление существующей записи о фото в localStorage
export function updateGalleryPhoto(photo: GalleryPhoto): void {
  const photos = getGalleryPhotos();

  const updatedPhotos = photos.map((item) =>
    item.id === photo.id ? photo : item,
  );

  setStorageItem(STORAGE_KEYS.gallery, updatedPhotos);
}

// удаление записи о фото из localStorage по идентификатору id
export function deleteGalleryPhoto(id: string): void {
  const photos = getGalleryPhotos();

  const filteredPhotos = photos.filter((item) => item.id !== id);

  setStorageItem(STORAGE_KEYS.gallery, filteredPhotos);
}
