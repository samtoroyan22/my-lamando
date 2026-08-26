"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil } from "lucide-react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";

import { useExpense } from "@/contexts/expense-context";
import type { Expense } from "@/types/expense";

import {
  expenseSchema,
  type ExpenseFormValues,
} from "@/schemas/expense-schema";

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

interface ExpenseDialogProps {
  entry?: Expense;
}

const ExpenseDialog = ({ entry }: ExpenseDialogProps) => {
  const { addExpenseEntry, updateExpenseEntry } = useExpense();

  const [open, setOpen] = useState(false);

  const isEditMode = Boolean(entry);

  const form = useForm<ExpenseFormValues>({
    resolver: zodResolver(expenseSchema),

    defaultValues: {
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),

      category: entry?.category ?? "Maintenance",

      title: entry?.title ?? "",

      amount: entry?.amount ?? 0,

      mileage: entry?.mileage ?? 0,

      note: entry?.note ?? "",
    },
  });

  const category = useWatch({
    control: form.control,
    name: "category",
  });

  useEffect(() => {
    if (!open) {
      return;
    }

    form.reset({
      date: entry?.date
        ? entry.date.slice(0, 10)
        : new Date().toISOString().slice(0, 10),

      category: entry?.category ?? "Maintenance",

      title: entry?.title ?? "",

      amount: entry?.amount ?? 0,

      mileage: entry?.mileage ?? 0,

      note: entry?.note ?? "",
    });
  }, [open, entry, form]);

  const onSubmit = (values: ExpenseFormValues) => {
    if (entry) {
      const updatedEntry: Expense = {
        ...entry,

        date: new Date(values.date).toISOString(),

        category: values.category,

        title: values.title,

        amount: values.amount,

        mileage: values.mileage,

        note: values.note || undefined,
      };

      updateExpenseEntry(updatedEntry);
    } else {
      const newEntry: Expense = {
        id: crypto.randomUUID(),

        date: new Date(values.date).toISOString(),

        category: values.category,

        title: values.title,

        amount: values.amount,

        mileage: values.mileage,

        note: values.note || undefined,
      };

      addExpenseEntry(newEntry);
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
        <DialogTrigger className="inline-flex h-10 items-center cursor-pointer justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          <Plus className="size-4" />
          Add Expense
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit expense" : "Add expense"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          {/* DATE */}

          <div className="space-y-2">
            <label htmlFor="expense-date" className="text-sm font-medium">
              Date
            </label>

            <Input id="expense-date" type="date" {...form.register("date")} />

            {form.formState.errors.date && (
              <p className="text-sm text-destructive">
                {form.formState.errors.date.message}
              </p>
            )}
          </div>

          {/* CATEGORY */}

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>

            <Select
              value={category}
              onValueChange={(value) => {
                if (value === null) {
                  return;
                }

                form.setValue("category", value, {
                  shouldValidate: true,
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value="Maintenance">Maintenance</SelectItem>

                <SelectItem value="Fuel">Fuel</SelectItem>

                <SelectItem value="Insurance">Insurance</SelectItem>

                <SelectItem value="Car wash">Car wash</SelectItem>

                <SelectItem value="Parts">Parts</SelectItem>

                <SelectItem value="Taxes">Taxes</SelectItem>

                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>

            {form.formState.errors.category && (
              <p className="text-sm text-destructive">
                {form.formState.errors.category.message}
              </p>
            )}
          </div>

          {/* TITLE */}

          <div className="space-y-2">
            <label htmlFor="expense-title" className="text-sm font-medium">
              Title
            </label>

            <Input
              id="expense-title"
              placeholder="Oil change"
              {...form.register("title")}
            />

            {form.formState.errors.title && (
              <p className="text-sm text-destructive">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          {/* AMOUNT */}

          <div className="space-y-2">
            <label htmlFor="expense-amount" className="text-sm font-medium">
              Amount
            </label>

            <Input
              id="expense-amount"
              type="number"
              step="0.01"
              min="0"
              {...form.register("amount", {
                valueAsNumber: true,
              })}
            />

            {form.formState.errors.amount && (
              <p className="text-sm text-destructive">
                {form.formState.errors.amount.message}
              </p>
            )}
          </div>

          {/* MILEAGE */}

          <div className="space-y-2">
            <label htmlFor="expense-mileage" className="text-sm font-medium">
              Mileage
            </label>

            <Input
              id="expense-mileage"
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

          {/* NOTE */}

          <div className="space-y-2">
            <label htmlFor="expense-note" className="text-sm font-medium">
              Note
            </label>

            <Input
              id="expense-note"
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
              {isEditMode ? "Save changes" : "Add expense"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ExpenseDialog;
