"use client";

import { Fuel, Gauge, Route } from "lucide-react";
import { useFuel } from "@/contexts/fuel-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FuelConsumption = () => {
  const { fuelEntries } = useFuel();

  if (fuelEntries.length < 2) {
    return (
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Gauge
              className="size-4 text-cyan-600 dark:text-cyan-400"
              aria-hidden="true"
            />
            Fuel consumption
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border/60 py-10 text-center">
            <div className="mb-3 flex size-11 items-center justify-center rounded-full bg-cyan-500/15">
              <Fuel
                className="size-5 text-cyan-600 dark:text-cyan-400"
                aria-hidden="true"
              />
            </div>
            <p className="font-medium">Not enough data</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add at least two fuel entries with different mileage values to
              calculate fuel consumption.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const sortedEntries = [...fuelEntries].sort((a, b) => a.mileage - b.mileage);

  const consumptionValues: number[] = [];
  const distances: number[] = [];

  for (let i = 1; i < sortedEntries.length; i++) {
    const previousEntry = sortedEntries[i - 1];
    const currentEntry = sortedEntries[i];
    const distance = currentEntry.mileage - previousEntry.mileage;

    if (distance <= 0) continue;

    const consumption = (currentEntry.liters / distance) * 100;
    consumptionValues.push(consumption);
    distances.push(distance);
  }

  if (consumptionValues.length === 0) {
    return (
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base font-semibold">
            <Gauge
              className="size-4 text-cyan-600 dark:text-cyan-400"
              aria-hidden="true"
            />
            Fuel consumption
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-xl border border-dashed border-border/60 py-10 text-center">
            <p className="font-medium">Unable to calculate consumption</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Fuel entries must have increasing mileage values.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0);
  const totalFuel = sortedEntries
    .slice(1)
    .reduce((sum, entry) => sum + entry.liters, 0);
  const weightedConsumption =
    totalDistance > 0 ? (totalFuel / totalDistance) * 100 : 0;

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <Gauge
            className="size-4 text-red-600 dark:text-red-400"
            aria-hidden="true"
          />
          Fuel consumption*
        </CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">
          Estimated consumption based on fuel entries and mileage.
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge
                className="size-4 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
              Average consumption
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {weightedConsumption.toFixed(2)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                L/100 km
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Route
                className="size-4 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
              Distance tracked
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {totalDistance.toLocaleString("ru-RU")}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                km
              </span>
            </p>
          </div>

          <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Fuel
                className="size-4 text-red-600 dark:text-red-400"
                aria-hidden="true"
              />
              Fuel tracked
            </div>
            <p className="mt-2 text-2xl font-semibold tracking-tight tabular-nums">
              {totalFuel.toFixed(2)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                L
              </span>
            </p>
          </div>
        </div>

        <div className="rounded-xl px-4 py-3">
          <p className="text-xs leading-relaxed text-muted-foreground">
            *Consumption is estimated from the distance between consecutive fuel
            entries. The result is most accurate when entries represent
            full-tank refuels.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumption;
