import { z } from "zod";

export const serviceSchema = z.object({
  date: z.string().min(1, "Date is required"),
  mileage: z.number().min(0, "Mileage cannot be negative"),
  title: z.string().min(1, "Service name is required"),
  works: z.array(z.string()).min(1, "Select at least one completed work"),
  cost: z.number().min(0, "Cost cannot be negative"),
  serviceName: z.string().optional(),
  comment: z.string().optional(),
});

export type ServiceFormValues = z.infer<typeof serviceSchema>;
