"use client";

import { useEffect, useState } from "react";
import { Edit, ImagePlus } from "lucide-react";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";

import { useGallery } from "@/contexts/gallery-context";

import type { GalleryPhoto, PhotoCategory } from "@/types/gallery";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";

import {
  gallerySchema,
  type GalleryFormValues,
} from "@/schemas/gallery-schema";
import { toast } from "sonner";

interface GalleryDialogProps {
  entry?: GalleryPhoto;
}

const categories: PhotoCategory[] = [
  "Exterior",
  "Interior",
  "Engine",
  "Wheels",
  "Documents",
  "Service",
  "Before / After",
  "Other",
];

const compressImage = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const image = document.createElement("img");

      image.onload = () => {
        const maxWidth = 1600;
        const maxHeight = 1600;

        let width = image.width;
        let height = image.height;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);

          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement("canvas");

        canvas.width = width;
        canvas.height = height;

        const context = canvas.getContext("2d");

        if (!context) {
          reject(new Error("Unable to create canvas context"));
          return;
        }

        context.drawImage(image, 0, 0, width, height);

        const result = canvas.toDataURL("image/jpeg", 0.8);

        resolve(result);
      };

      image.onerror = () => {
        reject(new Error("Unable to load image"));
      };

      image.src = reader.result as string;
    };

    reader.onerror = () => {
      reject(new Error("Unable to read image"));
    };

    reader.readAsDataURL(file);
  });
};

const GalleryDialog = ({ entry }: GalleryDialogProps) => {
  const { addGalleryEntry, updateGalleryEntry } = useGallery();

  const [open, setOpen] = useState(false);

  const [imagePreview, setImagePreview] = useState<string | undefined>(
    entry?.src,
  );

  const [imageError, setImageError] = useState<string | undefined>();

  const isEditMode = Boolean(entry);

  const form = useForm<GalleryFormValues>({
    resolver: zodResolver(gallerySchema),

    defaultValues: {
      title: entry?.title ?? "",
      category: entry?.category ?? "Exterior",
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      mileage: entry?.mileage ?? 0,
      comment: entry?.comment ?? "",
    },
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      title: entry?.title ?? "",
      category: entry?.category ?? "Exterior",
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      mileage: entry?.mileage ?? 0,
      comment: entry?.comment ?? "",
    });
  }, [open, entry, form]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setImageError("Please select an image file.");
      return;
    }

    try {
      setImageError(undefined);

      const compressedImage = await compressImage(file);

      setImagePreview(compressedImage);
    } catch {
      setImageError("Failed to process image.");
    }
  };

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (nextOpen) {
      setImagePreview(entry?.src);
      setImageError(undefined);
    }
  };

  const onSubmit = (values: GalleryFormValues) => {
    if (!imagePreview) {
      setImageError("Please select an image.");
      return;
    }

    const galleryEntry: GalleryPhoto = {
      id: entry?.id ?? crypto.randomUUID(),
      src: imagePreview,
      title: values.title || undefined,
      category: values.category,
      date: new Date(values.date).toISOString(),
      mileage: values.mileage > 0 ? values.mileage : undefined,
      comment: values.comment || undefined,
    };

    if (entry) {
      updateGalleryEntry(galleryEntry);
    } else {
      addGalleryEntry(galleryEntry);
    }

    toast.success(`Gallery entry ${entry ? "updated" : "added"}`);

    setOpen(false);
    form.reset();
    setImagePreview(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      {isEditMode ? (
        <DialogTrigger className="inline-flex size-8 shrink-0 items-center justify-center rounded-md border-0 hover:text-amber-400 transition-all outline-none hover:bg-secondary/90 cursor-pointer">
          <Edit className="size-4" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
          <ImagePlus className="size-4" />
          Add photo
        </DialogTrigger>
      )}

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{isEditMode ? "Edit photo" : "Add photo"}</DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* IMAGE */}

          <div className="space-y-2">
            <label htmlFor="gallery-image" className="text-sm font-medium">
              Image
            </label>

            <Input
              id="gallery-image"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />

            {imagePreview && (
              <div className="relative h-48 overflow-hidden rounded-lg border">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  unoptimized
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                />
              </div>
            )}

            {imageError && (
              <p className="text-sm text-destructive">{imageError}</p>
            )}
          </div>

          {/* TITLE */}

          <div className="space-y-2">
            <label htmlFor="gallery-title" className="text-sm font-medium">
              Title
            </label>

            <Input
              id="gallery-title"
              placeholder="e.g. Front view"
              {...form.register("title")}
            />
          </div>

          {/* CATEGORY */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>

            <Select
              value={category}
              onValueChange={(value) => {
                if (value === null) {
                  return;
                }

                form.setValue("category", value as PhotoCategory, {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                {categories.map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {form.formState.errors.category && (
              <p className="text-sm text-destructive">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          {/* DATE + MILEAGE */}

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="gallery-date" className="text-sm font-medium">
                Date
              </label>

              <Input id="gallery-date" type="date" {...form.register("date")} />
            </div>

            <div className="space-y-2">
              <label htmlFor="gallery-mileage" className="text-sm font-medium">
                Mileage
              </label>

              <Input
                id="gallery-mileage"
                type="number"
                min="0"
                {...form.register("mileage", {
                  valueAsNumber: true,
                })}
              />
            </div>
          </div>

          {/* COMMENT */}

          <div className="space-y-2">
            <label htmlFor="gallery-comment" className="text-sm font-medium">
              Comment
            </label>

            <Textarea
              id="gallery-comment"
              placeholder="Optional"
              {...form.register("comment")}
            />
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">
              {isEditMode ? "Save changes" : "Add photo"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default GalleryDialog;
