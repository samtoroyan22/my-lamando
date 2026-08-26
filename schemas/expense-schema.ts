import { z } from "zod";

export const expenseSchema = z.object({
  date: z.string().min(1, "Date is required"),

  category: z.string().min(1, "Category is required"),

  title: z.string().min(1, "Title is required").max(100, "Title is too long"),

  amount: z.number().positive("Amount must be greater than 0"),

  mileage: z.number().min(0, "Mileage cannot be negative"),

  note: z.string().max(500, "Note is too long").optional(),
});

export type ExpenseFormValues = z.infer<typeof expenseSchema>;
