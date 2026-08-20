"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getExpenses,
  addExpense as saveExpense,
  updateExpense as saveUpdatedExpense,
  deleteExpense as removeExpense,
} from "@/lib/storage/expense-storage";

import { Expense } from "@/types/expense";

interface ExpenseContextValue {
  expenseEntries: Expense[];
  addExpenseEntry: (entry: Expense) => void;
  updateExpenseEntry: (entry: Expense) => void;
  deleteExpenseEntry: (id: string) => void;
}

const ExpenseContext = createContext<ExpenseContextValue | undefined>(
  undefined,
);

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const [expenseEntries, setExpenseEntries] = useState<Expense[]>([]);

  // загрузка данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const storedEntries = getExpenses();

    startTransition(() => {
      setExpenseEntries(storedEntries);
    });
  }, []);

  const addExpenseEntry = (entry: Expense) => {
    setExpenseEntries((currentEntries) => [...currentEntries, entry]);

    saveExpense(entry);
  };

  const updateExpenseEntry = (updatedEntry: Expense) => {
    setExpenseEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );

    saveUpdatedExpense(updatedEntry);
  };

  const deleteExpenseEntry = (id: string) => {
    setExpenseEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );

    removeExpense(id);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expenseEntries,
        addExpenseEntry,
        updateExpenseEntry,
        deleteExpenseEntry,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
}

export function useExpense() {
  const context = useContext(ExpenseContext);

  if (!context) {
    throw new Error("useExpense must be used within an ExpenseProvider");
  }

  return context;
}
