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

import { MAINTENANCE_WORKS } from "@/lib/constants/maintenance";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

import MultiSelect from "@/components/ui/multi-select";
import { useCar } from "@/contexts/car-context";

interface ServiceDialogProps {
  entry?: ServiceRecord;
}

const ServiceDialog = ({ entry }: ServiceDialogProps) => {
  const { addServiceEntry, updateServiceEntry } = useService();
  const { car } = useCar();

  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(entry);

  const form = useForm<ServiceFormValues>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      mileage: entry?.mileage ?? car?.mileage ?? 0,
      title: entry?.title ?? "",
      works: entry?.works ?? [],
      cost: entry?.cost ?? 0,
      serviceName: entry?.serviceName ?? "",
      comment: entry?.comment ?? "",
    },
  });

  const works = useWatch({
    control: form.control,
    name: "works",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
      mileage: entry?.mileage ?? car?.mileage ?? 0,
      title: entry?.title ?? "",
      works: entry?.works ?? [],
      cost: entry?.cost ?? 0,
      serviceName: entry?.serviceName ?? "",
      comment: entry?.comment ?? "",
    });
  }, [open, entry, form, car?.mileage]);

  const onSubmit = (values: ServiceFormValues) => {
    if (entry) {
      const updatedEntry: ServiceRecord = {
        ...entry,
        date: new Date(values.date).toISOString(),
        mileage: values.mileage,
        title: values.title,
        works: values.works,
        cost: values.cost,
        serviceName: values.serviceName || undefined,
        comment: values.comment || undefined,
      };

      updateServiceEntry(updatedEntry);
    } else {
      const newEntry: ServiceRecord = {
        id: crypto.randomUUID(),
        date: new Date(values.date).toISOString(),
        mileage: values.mileage,
        title: values.title,
        works: values.works,
        cost: values.cost,
        serviceName: values.serviceName || undefined,
        comment: values.comment || undefined,
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

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit service" : "Add service"}
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

          {/* TITLE */}

          <div className="space-y-2">
            <label htmlFor="service-title" className="text-sm font-medium">
              Service name
            </label>

            <Input
              id="service-title"
              placeholder="e.g. ТО №1"
              {...form.register("title")}
            />

            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* COMPLETED WORKS */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Completed works</label>

            <MultiSelect
              options={MAINTENANCE_WORKS}
              value={works ?? []}
              onChange={(value) => {
                form.setValue("works", value, {
                  shouldValidate: true,
                  shouldDirty: true,
                });
              }}
              placeholder="Select completed works..."
            />

            {form.formState.errors.works && (
              <p className="text-sm text-destructive">
                {form.formState.errors.works.message}
              </p>
            )}

            <p className="text-xs text-muted-foreground">
              Select all works completed during this service.
            </p>
          </div>

          {/* COST */}

          <div className="space-y-2">
            <label htmlFor="service-cost" className="text-sm font-medium">
              Cost
            </label>

            <Input
              id="service-cost"
              type="number"
              min="0"
              step="0.01"
              placeholder="0"
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

          {/* SERVICE NAME */}

          <div className="space-y-2">
            <label htmlFor="service-company" className="text-sm font-medium">
              Service center
            </label>

            <Input
              id="service-company"
              placeholder="e.g. Volkswagen Service"
              {...form.register("serviceName")}
            />

            {form.formState.errors.serviceName && (
              <p className="text-sm text-destructive">
                {form.formState.errors.serviceName.message}
              </p>
            )}
          </div>

          {/* COMMENT */}

          <div className="space-y-2">
            <label htmlFor="service-comment" className="text-sm font-medium">
              Comment
            </label>

            <Input
              id="service-comment"
              placeholder="Optional"
              {...form.register("comment")}
            />

            {form.formState.errors.comment && (
              <p className="text-sm text-destructive">
                {form.formState.errors.comment.message}
              </p>
            )}
          </div>

          {/* ACTIONS */}

          <div className="flex justify-end gap-2 pt-2">
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
