"use client";

import { format } from "date-fns";
import { useExpense } from "@/contexts/expense-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ExpenseDialog from "./expense-dialog";
import { ConfirmDialog } from "../shared/confirm-dialog";
import { toast } from "sonner";

const ExpenseTable = () => {
  const { expenseEntries, deleteExpenseEntry } = useExpense();

  if (expenseEntries.length === 0) {
    return (
      <div className="flex min-h-45 items-center justify-center rounded-xl border border-dashed border-border/60">
        <p className="text-sm text-muted-foreground">No expense records yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/60">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Expense records:{" "}
          <span className="font-medium text-foreground">
            {expenseEntries.length}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-27.5">Date</TableHead>
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
              <TableRow key={entry.id} className="group">
                <TableCell className="font-medium tabular-nums">
                  {format(new Date(entry.date), "dd.MM.yyyy")}
                </TableCell>

                <TableCell>
                  <span className="inline-flex rounded-md bg-muted/60 px-2 py-0.5 text-xs font-medium">
                    {entry.category}
                  </span>
                </TableCell>

                <TableCell className="font-medium">{entry.title}</TableCell>

                <TableCell className="tabular-nums font-medium">
                  {entry.amount.toFixed(2)} ₽
                </TableCell>

                <TableCell className="tabular-nums">
                  {entry.mileage.toLocaleString("ru-RU")} km
                </TableCell>

                <TableCell className="max-w-40 truncate text-muted-foreground">
                  {entry.note || "~"}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                    <ExpenseDialog entry={entry} />
                    <ConfirmDialog
                      title="Delete expense entry?"
                      description="This action cannot be undone."
                      onConfirm={() => {
                        deleteExpenseEntry(entry.id);
                        toast.success("Expense entry deleted");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExpenseTable;
