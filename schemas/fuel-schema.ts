import { z } from "zod";

export const fuelSchema = z.object({
  date: z.string().min(1, "Date is required"),

  liters: z.number().positive("Liters must be greater than 0"),

  pricePerLiter: z.number().positive("Price must be greater than 0"),

  mileage: z.number().nonnegative("Mileage cannot be negative"),

  fuelType: z.string().min(1, "Fuel type is required"),

  note: z.string().optional(),
});

export type FuelFormValues = z.infer<typeof fuelSchema>;
