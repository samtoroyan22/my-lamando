"use client";

import { useMemo } from "react";
import { Wallet } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

import { useExpense } from "@/contexts/expense-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ExpenseChartPoint {
  month: string;
  label: string;
  amount: number;
}

const MonthlyExpensesChart = () => {
  const { expenseEntries } = useExpense();

  const chartData = useMemo<ExpenseChartPoint[]>(() => {
    if (expenseEntries.length === 0) return [];

    const groupedExpenses = new Map<string, { date: Date; amount: number }>();

    expenseEntries.forEach((entry) => {
      const date = new Date(entry.date);
      if (Number.isNaN(date.getTime())) return;

      const monthKey = format(date, "yyyy-MM");
      const existing = groupedExpenses.get(monthKey);

      if (existing) {
        existing.amount += entry.amount;
      } else {
        groupedExpenses.set(monthKey, { date, amount: entry.amount });
      }
    });

    return [...groupedExpenses.entries()]
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([month, value]) => ({
        month,
        label: format(value.date, "MMM yy"),
        amount: value.amount,
      }));
  }, [expenseEntries]);

  const totalExpenses = useMemo(
    () => chartData.reduce((sum, item) => sum + item.amount, 0),
    [chartData],
  );

  return (
    <Card className="overflow-hidden border-border/50 bg-card/80">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Wallet className="size-4 text-violet-400" />
            Expenses by month
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">
            Total vehicle expenses grouped by month
          </p>
        </div>

        {totalExpenses > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>
            <p className="text-lg font-semibold tracking-tight tabular-nums">
              {new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 0,
              }).format(totalExpenses)}{" "}
              <span className="text-sm font-normal text-muted-foreground">
                ₽
              </span>
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent className="pt-4">
        {chartData.length === 0 ? (
          <div className="flex min-h-70 items-center justify-center rounded-xl border border-dashed border-border/60">
            <div className="px-4 text-center">
              <Wallet className="mx-auto size-8 text-violet-400/40" />
              <p className="mt-3 text-sm font-medium">No expense data</p>
              <p className="mt-1 max-w-xs text-sm text-muted-foreground">
                Add your first expense to see the monthly spending chart.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-72 w-full sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border/40"
                  vertical={false}
                />

                <XAxis
                  dataKey="label"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-xs"
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={50}
                  tickFormatter={(value: number) =>
                    new Intl.NumberFormat("en-US", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  className="text-xs"
                />

                <Tooltip
                  cursor={{ fill: "currentColor", fillOpacity: 0.04 }}
                  content={({ active, payload }) => {
                    if (!active || !payload?.length) return null;
                    const point = payload[0]?.payload as
                      | ExpenseChartPoint
                      | undefined;
                    if (!point) return null;

                    return (
                      <div className="rounded-lg border border-border/60 bg-background px-3 py-2 shadow-md">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(`${point.month}-01`), "MMMM yyyy")}
                        </p>
                        <p className="mt-1 text-sm font-medium">
                          {new Intl.NumberFormat("ru-RU", {
                            maximumFractionDigits: 0,
                          }).format(point.amount)}{" "}
                          ₽
                        </p>
                      </div>
                    );
                  }}
                />

                <Bar
                  dataKey="amount"
                  fill="#8b5cf6"
                  radius={[6, 6, 0, 0]}
                  animationDuration={700}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MonthlyExpensesChart;
