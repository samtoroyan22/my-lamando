"use client";

import { useCar } from "@/contexts/car-context";
import { useFuel } from "@/contexts/fuel-context";
import { useExpense } from "@/contexts/expense-context";
import { useService } from "@/contexts/service-context";

import {
  getAverageFuelConsumption,
  getCostPerKm,
  getTotalExpenses,
  getTotalFuelCost,
  getTotalTrackedCost,
} from "@/lib/calculations/dashboard";

import { Card, CardContent } from "@/components/ui/card";
import {
  DASHBOARD_STATS_CONFIG,
  type DashboardStatKey,
} from "./dashboard-stats-config";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value)} ₽`;

const DashboardStats = () => {
  const { car } = useCar();
  const { fuelEntries } = useFuel();
  const { expenseEntries } = useExpense();
  const { serviceEntries } = useService();

  const averageConsumption = getAverageFuelConsumption(fuelEntries);
  const totalFuelCost = getTotalFuelCost(fuelEntries);
  const totalExpenses = getTotalExpenses(expenseEntries);
  const totalCost = getTotalTrackedCost(
    fuelEntries,
    expenseEntries,
    serviceEntries,
  );
  const costPerKm = getCostPerKm(totalCost, car.mileage);

  const values: Record<DashboardStatKey, string> = {
    mileage: formatNumber(car.mileage),
    consumption:
      averageConsumption !== undefined ? averageConsumption.toFixed(1) : "—",
    expenses: formatMoney(totalExpenses),
    serviceFuel: formatMoney(
      totalFuelCost +
        serviceEntries.reduce((sum, entry) => sum + entry.cost, 0),
    ),
    costPerKm: costPerKm !== undefined ? costPerKm.toFixed(2) : "—",
  };

  const units: Record<DashboardStatKey, string> = {
    mileage: "km",
    consumption: averageConsumption !== undefined ? "L/100 km" : "",
    expenses: "",
    serviceFuel: "",
    costPerKm: costPerKm !== undefined ? "₽/km" : "",
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {DASHBOARD_STATS_CONFIG.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card
            key={stat.key}
            className="border-border/50 bg-card/80 transition-colors hover:border-border"
          >
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full ${stat.iconClass}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </div>
              </div>

              <div className="mt-4">
                <p className="text-2xl font-semibold tracking-tight tabular-nums">
                  {values[stat.key]}
                </p>

                {units[stat.key] && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {units[stat.key]}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default DashboardStats;
