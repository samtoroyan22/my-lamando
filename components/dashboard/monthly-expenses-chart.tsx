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
    if (expenseEntries.length === 0) {
      return [];
    }

    const groupedExpenses = new Map<
      string,
      {
        date: Date;
        amount: number;
      }
    >();

    expenseEntries.forEach((entry) => {
      const date = new Date(entry.date);

      if (Number.isNaN(date.getTime())) {
        return;
      }

      const monthKey = format(date, "yyyy-MM");

      const existing = groupedExpenses.get(monthKey);

      if (existing) {
        existing.amount += entry.amount;
      } else {
        groupedExpenses.set(monthKey, {
          date,
          amount: entry.amount,
        });
      }
    });

    return [...groupedExpenses.entries()]
      .sort(([first], [second]) => first.localeCompare(second))
      .map(([month, value]) => ({
        month,
        label: format(value.date, "MMM yy"),
        amount: value.amount,
      }));
  }, [expenseEntries]);

  const totalExpenses = useMemo(() => {
    return chartData.reduce((sum, item) => sum + item.amount, 0);
  }, [chartData]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="size-4 text-muted-foreground" />
            Expenses by month
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Total vehicle expenses grouped by month.
          </p>
        </div>

        {totalExpenses > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Total</p>

            <p className="text-lg font-semibold">
              {new Intl.NumberFormat("ru-RU", {
                maximumFractionDigits: 0,
              }).format(totalExpenses)}{" "}
              ₽
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex min-h-75 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Wallet className="mx-auto size-8 text-muted-foreground/50" />

              <p className="mt-3 text-sm font-medium">No expense data</p>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Add your first expense to see the monthly spending chart.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
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
                  width={55}
                  tickFormatter={(value: number) =>
                    new Intl.NumberFormat("ru-RU", {
                      notation: "compact",
                      maximumFractionDigits: 1,
                    }).format(value)
                  }
                  className="text-xs"
                />

                <Tooltip
                  cursor={{
                    fill: "currentColor",
                    fillOpacity: 0.04,
                  }}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) {
                      return null;
                    }

                    const point = payload[0]?.payload as
                      | ExpenseChartPoint
                      | undefined;

                    if (!point) {
                      return null;
                    }

                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
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
                  fill="currentColor"
                  className="text-primary"
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
