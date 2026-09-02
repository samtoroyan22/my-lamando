"use client";

import { useExpense } from "@/contexts/expense-context";

import ExpenseTable from "@/components/expenses/expense-table";
import ExpensesPageHeader from "@/components/expenses/expenses-page-header";
import ExpenseStats from "@/components/expenses/expenses-stats";
import ExpenseSkeleton from "@/components/expenses/expense-skeleton";

const Expenses = () => {
  const { isLoading } = useExpense();

  return (
    <main className="space-y-8">
      <ExpensesPageHeader />

      {isLoading ? (
        <ExpenseSkeleton />
      ) : (
        <>
          <ExpenseStats />
          <ExpenseTable />
        </>
      )}
    </main>
  );
};

export default Expenses;
