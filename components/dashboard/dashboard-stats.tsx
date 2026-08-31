"use client";

import { Fuel, Gauge, Wallet, Wrench } from "lucide-react";

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

  const stats = [
    {
      title: "Current mileage",
      value: formatNumber(car.mileage),
      unit: "km",
      icon: Gauge,
    },
    {
      title: "Average consumption",
      value:
        averageConsumption !== undefined ? averageConsumption.toFixed(1) : "—",
      unit: averageConsumption !== undefined ? "L/100 km" : "",
      icon: Fuel,
    },
    {
      title: "Total expenses",
      value: formatMoney(totalExpenses),
      unit: "",
      icon: Wallet,
    },
    {
      title: "Service & fuel",
      value: formatMoney(
        totalFuelCost +
          serviceEntries.reduce((sum, entry) => sum + entry.cost, 0),
      ),
      unit: "",
      icon: Wrench,
    },
    {
      title: "Cost per km",
      value: costPerKm !== undefined ? costPerKm.toFixed(2) : "—",
      unit: costPerKm !== undefined ? "₽/km" : "",
      icon: Wallet,
    },
  ];

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <Card key={stat.title}>
            <CardContent>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </p>

                <Icon className="size-4 text-muted-foreground" />
              </div>

              <div className="mt-4">
                <p className="text-2xl font-semibold tracking-tight">
                  {stat.value}
                </p>

                {stat.unit && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {stat.unit}
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
