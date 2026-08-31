"use client";

import { Fuel, Receipt, Wrench } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import Link from "next/link";

import { useFuel } from "@/contexts/fuel-context";
import { useExpense } from "@/contexts/expense-context";
import { useService } from "@/contexts/service-context";

import { getRecentActivity } from "@/lib/calculations/dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value)} ₽`;

const formatMileage = (value?: number) =>
  value !== undefined
    ? `${new Intl.NumberFormat("ru-RU").format(value)} km`
    : undefined;

const RecentActivity = () => {
  const { fuelEntries } = useFuel();
  const { expenseEntries } = useExpense();
  const { serviceEntries } = useService();

  const activities = getRecentActivity({
    fuelEntries,
    expenseEntries,
    serviceEntries,
    limit: 5,
  });

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent activity</CardTitle>

        <Button variant="ghost" size="sm">
          <Link href="/fuel">View all</Link>
        </Button>
      </CardHeader>

      <CardContent>
        {activities.length === 0 ? (
          <div className="flex min-h-48 items-center justify-center rounded-lg border border-dashed">
            <p className="text-sm text-muted-foreground">
              No recent activity yet.
            </p>
          </div>
        ) : (
          <div className="divide-y">
            {activities.map((activity) => {
              const Icon =
                activity.type === "fuel"
                  ? Fuel
                  : activity.type === "service"
                    ? Wrench
                    : Receipt;

              const typeLabel =
                activity.type === "fuel"
                  ? "Fuel"
                  : activity.type === "service"
                    ? "Service"
                    : "Expense";

              const mileage = formatMileage(activity.mileage);

              return (
                <div
                  key={activity.id}
                  className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-lg border bg-muted/40">
                    <Icon className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium">
                        {activity.title}
                      </p>

                      <span className="shrink-0 text-xs text-muted-foreground">
                        {typeLabel}
                      </span>
                    </div>

                    <div className="mt-1 flex flex-wrap gap-x-2 text-xs text-muted-foreground">
                      <span>
                        {format(new Date(activity.date), "d MMMM", {
                          locale: ru,
                        })}
                      </span>

                      {mileage && (
                        <>
                          <span>•</span>
                          <span>{mileage}</span>
                        </>
                      )}
                    </div>
                  </div>

                  <p className="shrink-0 text-sm font-medium">
                    {formatMoney(activity.amount)}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
