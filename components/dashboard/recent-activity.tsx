"use client";

import { Fuel, ListChecks, Receipt, Wrench } from "lucide-react";
import { format } from "date-fns";
import { motion } from "motion/react";

import { useFuel } from "@/contexts/fuel-context";
import { useExpense } from "@/contexts/expense-context";
import { useService } from "@/contexts/service-context";
import { getRecentActivity } from "@/lib/calculations/dashboard";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

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
    <Card className="flex h-full flex-col border-border/50 bg-card/80">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Recent activity
          </CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Latest fuel, expenses and service
          </p>
        </div>

        <ListChecks
          className="size-5 text-emerald-600 dark:text-emerald-400"
          aria-hidden="true"
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        {activities.length === 0 ? (
          <div className="flex min-h-55 flex-1 items-center justify-center rounded-xl border border-dashed border-border/60">
            <p className="text-sm text-muted-foreground">
              No recent activity yet
            </p>
          </div>
        ) : (
          <ul className="flex flex-1 flex-col" role="list">
            {activities.map((activity, index) => {
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

              const iconClass =
                activity.type === "fuel"
                  ? "bg-violet-500/15 text-violet-600 dark:text-violet-400"
                  : activity.type === "service"
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400";

              const mileage = formatMileage(activity.mileage);

              return (
                <motion.li
                  key={activity.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: index * 0.04,
                    ease: "easeOut",
                  }}
                  className="group"
                >
                  <div className="flex items-center gap-3 py-3.5 first:pt-0 last:pb-0">
                    <div
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full ${iconClass}`}
                    >
                      <Icon className="size-4" aria-hidden="true" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-medium text-foreground">
                          {activity.title}
                        </p>
                        <span className="shrink-0 rounded-md bg-muted/70 px-1.5 py-0.5 text-[11px] font-medium text-muted-foreground">
                          {typeLabel}
                        </span>
                      </div>

                      <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                        <time dateTime={activity.date}>
                          {format(new Date(activity.date), "d MMM yyyy")}
                        </time>
                        {mileage && (
                          <>
                            <span aria-hidden="true" className="text-border">
                              •
                            </span>
                            <span>{mileage}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <p className="shrink-0 text-sm font-medium tabular-nums text-foreground">
                      {formatMoney(activity.amount)}
                    </p>
                  </div>

                  {index < activities.length - 1 && (
                    <div className="h-px w-full bg-border/40" />
                  )}
                </motion.li>
              );
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
