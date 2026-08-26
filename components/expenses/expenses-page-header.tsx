"use client";

import ExpenseDialog from "./expense-dialog";

const ExpensesPageHeader = () => {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Expenses</p>

        <h1 className="text-2xl font-semibold tracking-tight">
          Vehicle expenses
        </h1>

        <p className="text-sm text-muted-foreground">
          Track and manage all vehicle-related expenses.
        </p>
      </div>

      <ExpenseDialog />
    </header>
  );
};

export default ExpensesPageHeader;
