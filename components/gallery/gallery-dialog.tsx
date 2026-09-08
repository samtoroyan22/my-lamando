"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, ImagePlus, Edit } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import Image from "next/image";
import { useGallery } from "@/contexts/gallery-context";
import type { GalleryPhoto, PhotoCategory } from "@/types/gallery";

import {
  gallerySchema,
  type GalleryFormValues,
} from "@/schemas/gallery-schema";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Textarea } from "@/components/ui/textarea";
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

        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };

      image.onerror = () => reject(new Error("Unable to load image"));

      image.src = reader.result as string;
    };

    reader.onerror = () => reject(new Error("Unable to read image"));

    reader.readAsDataURL(file);
  });
};

const getDateValue = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = parseISO(value);

  return isValid(date) ? date : undefined;
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

  const date = useWatch({
    control: form.control,
    name: "date",
  });

  const selectedDate = getDateValue(date);

  useEffect(() => {
    if (!open) return;

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

    if (!file) return;

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
      date: new Date(`${values.date}T00:00:00`).toISOString(),
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
        <DialogTrigger className="inline-flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-md border-0 outline-none transition-all hover:text-amber-400">
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
              <div className="relative h-48 overflow-hidden rounded-xl border border-border/60">
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
              <p className="text-sm text-destructive" role="alert">
                {imageError}
              </p>
            )}
          </div>

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

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>

            <Select
              value={category}
              onValueChange={(value) => {
                if (value === null) return;

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
              <p className="text-sm text-destructive" role="alert">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="gallery-date" className="text-sm font-medium">
                Date
              </label>

              <Popover>
                <PopoverTrigger
                  type="button"
                  id="gallery-date"
                  className="flex h-9 w-full min-w-0 items-center justify-start gap-2 rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring data-popup-open:ring-3 data-popup-open:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                >
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />

                  {selectedDate ? (
                    <span className="truncate">
                      {format(selectedDate, "dd.MM.yyyy", {
                        locale: ru,
                      })}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Select date</span>
                  )}
                </PopoverTrigger>

                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(selectedDate) => {
                      form.setValue(
                        "date",
                        selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
                        {
                          shouldValidate: true,
                          shouldDirty: true,
                        },
                      );
                    }}
                    locale={ru}
                  />
                </PopoverContent>
              </Popover>

              {form.formState.errors.date && (
                <p className="text-sm text-destructive" role="alert">
                  {form.formState.errors.date.message}
                </p>
              )}
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

          <div className="flex justify-end gap-2 pt-2">
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
