"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import { useExpense } from "@/contexts/expense-context";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseDialog from "./expense-dialog";

const ExpenseTable = () => {
  const { expenseEntries, deleteExpenseEntry } = useExpense();

  if (expenseEntries.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-sm text-muted-foreground">No expense records yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm text-muted-foreground">
          Expense records: {expenseEntries.length}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Mileage</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="w-25 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {expenseEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                {format(new Date(entry.date), "dd.MM.yyyy")}
              </TableCell>

              <TableCell>{entry.category}</TableCell>

              <TableCell>{entry.title}</TableCell>

              <TableCell>{entry.amount.toFixed(2)} ₽</TableCell>

              <TableCell>{entry.mileage.toLocaleString("ru-RU")} km</TableCell>

              <TableCell>{entry.note || "~"}</TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  <ExpenseDialog entry={entry} />

                  <Button
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={() => deleteExpenseEntry(entry.id)}
                    aria-label="Delete expense entry"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ExpenseTable;
