"use client";

import ExpenseDialog from "./expense-dialog";

const ExpensesPageHeader = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Expenses</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Vehicle expenses
        </h1>
        <p className="text-muted-foreground">
          Track and manage all vehicle-related expenses
        </p>
      </div>

      <ExpenseDialog />
    </header>
  );
};

export default ExpensesPageHeader;
