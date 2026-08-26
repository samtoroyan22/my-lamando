"use client";

import { useExpense } from "@/contexts/expense-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExpenseStats = () => {
  const { expenseEntries } = useExpense();

  const totalSpent = expenseEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );

  const numberOfExpenses = expenseEntries.length;

  const averageExpense =
    numberOfExpenses > 0 ? totalSpent / numberOfExpenses : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total spent
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{totalSpent.toFixed(2)} ₽</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Number of expenses
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{numberOfExpenses}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average expense
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">
            {averageExpense.toFixed(2)} ₽
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExpenseStats;
