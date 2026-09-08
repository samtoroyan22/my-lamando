"use client";

import { useEffect, useState, type ReactNode } from "react";
import { CalendarIcon, Pencil } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format, isValid, parseISO } from "date-fns";
import { ru } from "date-fns/locale";

import { useCar } from "@/contexts/car-context";
import { carSchema, type CarFormValues } from "@/schemas/car-schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

const getCarFormValues = (
  car: ReturnType<typeof useCar>["car"],
): CarFormValues => ({
  brand: car.brand,
  model: car.model,
  year: car.year,
  engineType: car.engine.type,
  displacement: car.engine.displacement,
  power: car.engine.power,
  transmission: car.transmission,
  mileage: car.mileage,
  vin: car.vin,
  color: car.color,
  purchaseDate: car.purchaseDate,
});

const getPurchaseDate = (value?: string): Date | undefined => {
  if (!value) {
    return undefined;
  }

  const date = parseISO(value);

  return isValid(date) ? date : undefined;
};

const CarEditForm = () => {
  const { car, updateCar } = useCar();
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<CarFormValues>({
    resolver: zodResolver(carSchema),
    defaultValues: getCarFormValues(car),
  });

  const purchaseDate = useWatch({
    control,
    name: "purchaseDate",
  });
  const selectedPurchaseDate = getPurchaseDate(purchaseDate);

  useEffect(() => {
    reset(getCarFormValues(car));
  }, [car, reset]);

  const onSubmit = (data: CarFormValues) => {
    updateCar({
      ...car,
      brand: data.brand,
      model: data.model,
      year: data.year,
      engine: {
        ...car.engine,
        type: data.engineType,
        displacement: data.displacement,
        power: data.power,
      },
      transmission: data.transmission,
      mileage: data.mileage,
      vin: data.vin,
      color: data.color,
      purchaseDate: data.purchaseDate,
    });

    toast.success("Vehicle information updated");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="inline-flex h-10 items-center cursor-pointer justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
        <Pencil className="size-4" />
        Edit vehicle
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit vehicle</DialogTitle>
          <DialogDescription>
            Update your vehicle information. Changes are saved locally.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField id="brand" label="Brand" error={errors.brand?.message}>
              <Input id="brand" {...register("brand")} />
            </FormField>

            <FormField id="model" label="Model" error={errors.model?.message}>
              <Input id="model" {...register("model")} />
            </FormField>

            <FormField id="year" label="Year" error={errors.year?.message}>
              <Input
                id="year"
                type="number"
                {...register("year", { valueAsNumber: true })}
              />
            </FormField>

            <FormField id="color" label="Color" error={errors.color?.message}>
              <Input id="color" {...register("color")} />
            </FormField>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium">Engine</h3>
              <p className="text-sm text-muted-foreground">
                Engine specifications
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <FormField
                id="engineType"
                label="Type"
                error={errors.engineType?.message}
              >
                <Input id="engineType" {...register("engineType")} />
              </FormField>

              <FormField
                id="displacement"
                label="Displacement, L"
                error={errors.displacement?.message}
              >
                <Input
                  id="displacement"
                  type="number"
                  step="0.1"
                  {...register("displacement", {
                    valueAsNumber: true,
                  })}
                />
              </FormField>

              <FormField
                id="power"
                label="Power, HP"
                error={errors.power?.message}
              >
                <Input
                  id="power"
                  type="number"
                  {...register("power", {
                    valueAsNumber: true,
                  })}
                />
              </FormField>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              id="transmission"
              label="Transmission"
              error={errors.transmission?.message}
            >
              <Input id="transmission" {...register("transmission")} />
            </FormField>

            <FormField
              id="mileage"
              label="Mileage, km"
              error={errors.mileage?.message}
            >
              <Input
                id="mileage"
                type="number"
                {...register("mileage", {
                  valueAsNumber: true,
                })}
              />
            </FormField>

            <FormField id="vin" label="VIN" error={errors.vin?.message}>
              <Input id="vin" {...register("vin")} />
            </FormField>

            <FormField
              id="purchaseDate"
              label="Purchase date"
              error={errors.purchaseDate?.message}
            >
              <Popover>
                <PopoverTrigger
                  type="button"
                  id="purchaseDate"
                  className="flex h-9 w-full min-w-0 items-center justify-start gap-2 rounded-md border border-input bg-transparent px-2.5 py-1 text-sm shadow-xs outline-none transition-[color,box-shadow] hover:bg-accent/50 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 data-popup-open:border-ring data-popup-open:ring-3 data-popup-open:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 dark:bg-input/30"
                >
                  <CalendarIcon className="size-4 shrink-0 text-muted-foreground" />

                  {selectedPurchaseDate ? (
                    <span className="truncate">
                      {format(selectedPurchaseDate, "dd.MM.yyyy", {
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
                    selected={selectedPurchaseDate}
                    onSelect={(date) => {
                      setValue(
                        "purchaseDate",
                        date ? format(date, "yyyy-MM-dd") : "",
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
            </FormField>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>

            <Button type="submit">Save changes</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

interface FormFieldProps {
  id: string;
  label: string;
  error?: string;
  children: ReactNode;
}

function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>

      {children}

      {error && (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export default CarEditForm;
