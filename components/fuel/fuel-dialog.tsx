"use client";

import { useEffect, useState } from "react";
import { CalendarIcon, Pencil, Plus } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";
import { useFuel } from "@/contexts/fuel-context";
import type { FuelEntry } from "@/types/fuel";
import { fuelSchema, type FuelFormValues } from "@/schemas/fuel-schema";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

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

interface FuelDialogProps {
  entry?: FuelEntry;
}

const getDateValue = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = parseISO(value);

  return isValid(date) ? date : undefined;
};

const FuelDialog = ({ entry }: FuelDialogProps) => {
  const { addFuelEntry, updateFuelEntry } = useFuel();

  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(entry);

  const form = useForm<FuelFormValues>({
    resolver: zodResolver(fuelSchema),
    defaultValues: {
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      liters: entry?.liters ?? 0,
      pricePerLiter: entry?.pricePerLiter ?? 0,
      mileage: entry?.mileage ?? 0,
      fuelType: entry?.fuelType ?? "AI-95",
      note: entry?.note ?? "",
    },
  });

  const fuelType = useWatch({
    control: form.control,
    name: "fuelType",
  });

  const date = useWatch({
    control: form.control,
    name: "date",
  });

  const selectedDate = getDateValue(date);

  useEffect(() => {
    if (!open) return;

    form.reset({
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      liters: entry?.liters ?? 0,
      pricePerLiter: entry?.pricePerLiter ?? 0,
      mileage: entry?.mileage ?? 0,
      fuelType: entry?.fuelType ?? "AI-95",
      note: entry?.note ?? "",
    });
  }, [open, entry, form]);

  const onSubmit = (values: FuelFormValues) => {
    const totalCost = values.liters * values.pricePerLiter;

    const fuelEntry: FuelEntry = {
      id: entry?.id ?? crypto.randomUUID(),
      date: new Date(values.date).toISOString(),
      liters: values.liters,
      pricePerLiter: values.pricePerLiter,
      totalCost,
      mileage: values.mileage,
      fuelType: values.fuelType,
      note: values.note || undefined,
    };

    if (entry) {
      updateFuelEntry(fuelEntry);
    } else {
      addFuelEntry(fuelEntry);
    }

    toast.success(`Fuel entry ${entry ? "updated" : "added"}`, {
      description: `${fuelEntry.liters} L · ${fuelEntry.mileage.toLocaleString(
        "ru-RU",
      )} km`,
    });

    setOpen(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {isEditMode ? (
        <DialogTrigger>
          <Pencil className="size-4 cursor-pointer text-muted-foreground hover:text-amber-400" />
        </DialogTrigger>
      ) : (
        <DialogTrigger className="inline-flex h-10 items-center cursor-pointer justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="size-4" />
          Add Fuel
        </DialogTrigger>
      )}

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit fuel entry" : "Add fuel entry"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <label htmlFor="fuel-date" className="text-sm font-medium">
              Date
            </label>

            <Popover>
              <PopoverTrigger
                type="button"
                id="fuel-date"
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="fuel-liters" className="text-sm font-medium">
                Liters
              </label>

              <Input
                id="fuel-liters"
                type="number"
                step="0.01"
                min="0"
                {...form.register("liters", {
                  valueAsNumber: true,
                })}
              />

              {form.formState.errors.liters && (
                <p className="text-sm text-destructive" role="alert">
                  {form.formState.errors.liters.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label htmlFor="fuel-price" className="text-sm font-medium">
                Price per liter
              </label>

              <Input
                id="fuel-price"
                type="number"
                step="0.01"
                min="0"
                {...form.register("pricePerLiter", {
                  valueAsNumber: true,
                })}
              />

              {form.formState.errors.pricePerLiter && (
                <p className="text-sm text-destructive" role="alert">
                  {form.formState.errors.pricePerLiter.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="fuel-mileage" className="text-sm font-medium">
              Mileage
            </label>

            <Input
              id="fuel-mileage"
              type="number"
              min="0"
              {...form.register("mileage", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.mileage && (
              <p className="text-sm text-destructive" role="alert">
                {form.formState.errors.mileage.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Fuel type</label>

            <Select
              value={fuelType}
              onValueChange={(value) => {
                if (value === null) return;

                form.setValue("fuelType", value, {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select fuel type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="AI-92">AI-92</SelectItem>
                <SelectItem value="AI-95">AI-95</SelectItem>
                <SelectItem value="AI-98">AI-98</SelectItem>
                <SelectItem value="AI-100">AI-100</SelectItem>
              </SelectContent>
            </Select>

            {form.formState.errors.fuelType && (
              <p className="text-sm text-destructive" role="alert">
                {form.formState.errors.fuelType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label htmlFor="fuel-note" className="text-sm font-medium">
              Note
            </label>

            <Input
              id="fuel-note"
              placeholder="Optional"
              {...form.register("note")}
            />

            {form.formState.errors.note && (
              <p className="text-sm text-destructive" role="alert">
                {form.formState.errors.note.message}
              </p>
            )}
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
              {isEditMode ? "Save changes" : "Add fuel"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default FuelDialog;
