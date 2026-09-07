"use client";

import { Wallet, Fuel, CircleDollarSign } from "lucide-react";
import { useFuel } from "@/contexts/fuel-context";
import { Card, CardContent } from "@/components/ui/card";

const FuelStats = () => {
  const { fuelEntries } = useFuel();

  const totalSpent = fuelEntries.reduce(
    (sum, entry) => sum + entry.totalCost,
    0,
  );
  const totalLiters = fuelEntries.reduce((sum, entry) => sum + entry.liters, 0);
  const averagePrice = totalLiters > 0 ? totalSpent / totalLiters : 0;

  const stats = [
    {
      title: "Total spent",
      value: `${totalSpent.toFixed(2)} ₽`,
      icon: Wallet,
      iconClass: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
    },
    {
      title: "Total liters",
      value: `${totalLiters.toFixed(2)} L`,
      icon: Fuel,
      iconClass: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
    },
    {
      title: "Average price",
      value: `${averagePrice.toFixed(2)} ₽/L`,
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

export default FuelStats;
