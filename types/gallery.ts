export type PhotoCategory =
  | "Exterior"
  | "Interior"
  | "Engine"
  | "Wheels"
  | "Documents"
  | "Service"
  | "Before / After"
  | "Other";

export interface GalleryPhoto {
  id: string;
  src: string;
  title?: string;
  category: PhotoCategory;
  date: string;
  mileage?: number;
  comment?: string;
}
