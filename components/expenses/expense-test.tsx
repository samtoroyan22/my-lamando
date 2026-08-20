// do likewise for expense context, create a new context for expenses, with similar structure and methods for adding, updating, and deleting expense entries.

"use client";

import { useExpense } from "@/contexts/expense-context";
import { Expense } from "@/types/expense";

const ExpenseTest = () => {
  const {
    expenseEntries,
    addExpenseEntry,
    updateExpenseEntry,
    deleteExpenseEntry,
  } = useExpense();

  //     interface Expense {
  //     id: string;
  //     date: string;
  //     category: string;
  //     title: string;
  //     amount: number;
  //     mileage: number;
  //     note?: string;
  // }

  const handleAddExpense = () => {
    const newEntry: Expense = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      category: "Maintenance",
      title: "Oil Change",
      amount: 100,
      mileage: 38000,
      note: "Changed oil and filter",
    };

    addExpenseEntry(newEntry);
  };

  const handleUpdateExpense = (entry: Expense) => {
    const updatedEntry: Expense = {
      ...entry,
      amount: entry.amount + 100,
    };

    updateExpenseEntry(updatedEntry);
  };

  const handleDeleteExpense = (id: string) => {
    deleteExpenseEntry(id);
  };

  return (
    <div>
      <h2>Expense Test</h2>

      <p>Expense entries: {expenseEntries.length}</p>

      <button onClick={handleAddExpense}>Add Test Expense Entry</button>

      {expenseEntries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Category: {entry.category}</p>
          <p>Title: {entry.title}</p>
          <p>Amount: {entry.amount}</p>
          <p>Mileage: {entry.mileage}</p>
          <p>Note: {entry.note}</p>

          <button onClick={() => handleUpdateExpense(entry)}>Update</button>

          <button onClick={() => handleDeleteExpense(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ExpenseTest;
