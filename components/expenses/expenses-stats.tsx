"use client";

import { Wallet, CircleDollarSign, Hash } from "lucide-react";
import { useExpense } from "@/contexts/expense-context";
import { Card, CardContent } from "@/components/ui/card";

const ExpenseStats = () => {
  const { expenseEntries } = useExpense();

  const totalSpent = expenseEntries.reduce(
    (sum, entry) => sum + entry.amount,
    0,
  );
  const numberOfExpenses = expenseEntries.length;
  const averageExpense =
    numberOfExpenses > 0 ? totalSpent / numberOfExpenses : 0;

  const stats = [
    {
      title: "Total spent",
      value: `${totalSpent.toFixed(2)} ₽`,
      icon: Wallet,
      iconClass: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    },
    {
      title: "Number of expenses",
      value: String(numberOfExpenses),
      icon: Hash,
      iconClass: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
    },
    {
      title: "Average expense",
      value: `${averageExpense.toFixed(2)} ₽`,
      icon: CircleDollarSign,
      iconClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.title}
            className="border-border/60 transition-colors hover:border-border"
          >
            <CardContent>
              <div className="flex items-start justify-between gap-3">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>
                <div
                  className={`flex size-8 shrink-0 items-center justify-center rounded-full ${stat.iconClass}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </div>
              </div>

              <p className="mt-1 text-2xl font-semibold tracking-tight tabular-nums">
                {stat.value}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default ExpenseStats;
