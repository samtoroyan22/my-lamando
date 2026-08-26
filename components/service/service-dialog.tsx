"use client";

import { useEffect, useState } from "react";
import { Pencil, Plus } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { useService } from "@/contexts/service-context";
import type { ServiceRecord } from "@/types/service";

import {
  serviceSchema,
  type ServiceFormValues,
} from "@/schemas/service-schema";

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

interface ServiceDialogProps {
  entry?: ServiceRecord;
}

const ServiceDialog = ({ entry }: ServiceDialogProps) => {
  const { addServiceEntry, updateServiceEntry } = useService();

  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(entry);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),

    defaultValues: {
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),

      type: entry?.type ?? "Maintenance",

      description: entry?.description ?? "",

      cost: entry?.cost ?? 0,

      mileage: entry?.mileage ?? 0,

      service: entry?.service ?? "",

      note: entry?.note ?? "",
    },
  });

  const serviceType = useWatch({
    control: form.control,
    name: "type",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),

      type: entry?.type ?? "Maintenance",

      description: entry?.description ?? "",

      cost: entry?.cost ?? 0,

      mileage: entry?.mileage ?? 0,

      service: entry?.service ?? "",

      note: entry?.note ?? "",
    });
  }, [open, entry, form]);

  const onSubmit = (values: ServiceFormValues) => {
    if (entry) {
      const updatedEntry: ServiceRecord = {
        ...entry,

        date: new Date(values.date).toISOString(),

        type: values.type,

        description: values.description,

        cost: values.cost,

        mileage: values.mileage,

        service: values.service,

        note: values.note || undefined,
      };

      updateServiceEntry(updatedEntry);
    } else {
      const newEntry: ServiceRecord = {
        id: crypto.randomUUID(),

        date: new Date(values.date).toISOString(),

        type: values.type,

        description: values.description,

        cost: values.cost,

        mileage: values.mileage,

        service: values.service,

        note: values.note || undefined,
      };

      addServiceEntry(newEntry);
    }

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
        <DialogTrigger className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="size-4" />
          Add Service
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit service record" : "Add service record"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* DATE */}

          <div className="space-y-2">
            <label htmlFor="service-date" className="text-sm font-medium">
              Date
            </label>

            <Input id="service-date" type="date" {...form.register("date")} />

            {form.formState.errors.date && (
              <p className="text-sm text-destructive">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* TYPE */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Type</label>

            <Select
              value={serviceType}
              onValueChange={(value) => {
                if (value === null) {
                  return;
                }

                form.setValue("type", value, {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Maintenance">Maintenance</SelectItem>

                <SelectItem value="Repair">Repair</SelectItem>

                <SelectItem value="Inspection">Inspection</SelectItem>

                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            {form.formState.errors.type && (
              <p className="text-sm text-destructive">
                {form.formState.errors.type.message}
              </p>
            )}
          </div>

          {/* DESCRIPTION */}

          <div className="space-y-2">
            <label
              htmlFor="service-description"
              className="text-sm font-medium"
            >
              Description
            </label>

            <Input
              id="service-description"
              placeholder="For example: Oil and filter replacement"
              {...form.register("description")}
            />

            {form.formState.errors.description && (
              <p className="text-sm text-destructive">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>

          {/* COST */}

          <div className="space-y-2">
            <label htmlFor="service-cost" className="text-sm font-medium">
              Cost
            </label>

            <Input
              id="service-cost"
              type="number"
              step="0.01"
              min="0"
              {...form.register("cost", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.cost && (
              <p className="text-sm text-destructive">
                {form.formState.errors.cost.message}
              </p>
            )}
          </div>

          {/* MILEAGE */}

          <div className="space-y-2">
            <label htmlFor="service-mileage" className="text-sm font-medium">
              Mileage
            </label>

            <Input
              id="service-mileage"
              type="number"
              min="0"
              {...form.register("mileage", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.mileage && (
              <p className="text-sm text-destructive">
                {form.formState.errors.mileage.message}
              </p>
            )}
          </div>

          {/* SERVICE */}

          <div className="space-y-2">
            <label htmlFor="service-name" className="text-sm font-medium">
              Service
            </label>

            <Input
              id="service-name"
              placeholder="For example: Oil Change"
              {...form.register("service")}
            />

            {form.formState.errors.service && (
              <p className="text-sm text-destructive">
                {form.formState.errors.service.message}
              </p>
            )}
          </div>

          {/* NOTE */}

          <div className="space-y-2">
            <label htmlFor="service-note" className="text-sm font-medium">
              Note
            </label>

            <Input
              id="service-note"
              placeholder="Optional"
              {...form.register("note")}
            />

            {form.formState.errors.note && (
              <p className="text-sm text-destructive">
                {form.formState.errors.note.message}
              </p>
            )}
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
              {isEditMode ? "Save changes" : "Add service"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
