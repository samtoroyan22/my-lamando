import { z } from "zod";

export const gallerySchema = z.object({
  title: z.string().max(100, "Title is too long").optional().or(z.literal("")),
  category: z.enum([
    "Exterior",
    "Interior",
    "Engine",
    "Wheels",
    "Documents",
    "Service",
    "Before / After",
    "Other",
  ]),
  date: z.string().min(1, "Date is required"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  comment: z
    .string()
    .max(500, "Comment is too long")
    .optional()
    .or(z.literal("")),
});

export type GalleryFormValues = z.infer<typeof gallerySchema>;
