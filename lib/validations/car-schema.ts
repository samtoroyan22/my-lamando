import { z } from "zod";

export const carSchema = z.object({
  brand: z.string().min(1, "Brand is required"),

  model: z.string().min(1, "Model is required"),

  year: z
    .number()
    .int("Year must be an integer")
    .min(1900, "Invalid year")
    .max(2100, "Invalid year"),

  engineType: z.string().min(1, "Engine type is required"),

  displacement: z.number().positive("Displacement must be greater than 0"),

  power: z.number().positive("Power must be greater than 0"),

  transmission: z.string().min(1, "Transmission is required"),

  mileage: z.number().min(0, "Mileage cannot be negative"),

  vin: z.string(),

  color: z.string().min(1, "Color is required"),

  purchaseDate: z.string(),
});

export type CarFormValues = z.infer<typeof carSchema>;
