import { z } from "zod";

export const serviceSchema = z.object({
  date: z.string().min(1, "Date is required"),

  type: z.string().min(1, "Type is required"),

  description: z.string().min(1, "Description is required"),

  cost: z.number().min(0, "Cost cannot be negative"),

  mileage: z.number().min(0, "Mileage cannot be negative"),

  service: z.string().min(1, "Service is required"),

  note: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
