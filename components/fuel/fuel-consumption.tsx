"use client";

import { Fuel, Gauge, Route } from "lucide-react";

import { useFuel } from "@/contexts/fuel-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FuelConsumption = () => {
  const { fuelEntries } = useFuel();

  if (fuelEntries.length < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="size-5" />
            Fuel consumption
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 rounded-full bg-muted p-3">
              <Fuel className="size-5 text-muted-foreground" />
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

    if (distance <= 0) {
      continue;
    }

    const consumption = (currentEntry.liters / distance) * 100;

    consumptionValues.push(consumption);
    distances.push(distance);
  }

  if (consumptionValues.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Gauge className="size-5" />
            Fuel consumption
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="py-8 text-center">
            <p className="font-medium">Unable to calculate consumption</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Fuel entries must have increasing mileage values.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const averageConsumption =
    consumptionValues.reduce((sum, value) => sum + value, 0) /
    consumptionValues.length;

  const totalDistance = distances.reduce((sum, distance) => sum + distance, 0);

  const totalFuel = sortedEntries
    .slice(1)
    .reduce((sum, entry) => sum + entry.liters, 0);

  const weightedConsumption =
    totalDistance > 0 ? (totalFuel / totalDistance) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="size-5" />
              Fuel consumption
            </CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">
              Estimated consumption based on fuel entries and mileage.
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Gauge className="size-4" />
              Average consumption
            </div>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {weightedConsumption.toFixed(2)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                L/100 km
              </span>
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Route className="size-4" />
              Distance tracked
            </div>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {totalDistance.toLocaleString("ru-RU")}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                km
              </span>
            </p>
          </div>

          <div className="rounded-lg border bg-muted/30 p-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Fuel className="size-4" />
              Fuel tracked
            </div>

            <p className="mt-2 text-2xl font-semibold tracking-tight">
              {totalFuel.toFixed(2)}
              <span className="ml-1 text-sm font-normal text-muted-foreground">
                L
              </span>
            </p>
          </div>
        </div>
        <div className="mt-4 rounded-lg bg-muted/40 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Consumption is estimated from the distance between consecutive fuel
            entries. The result is most accurate when entries represent
            full-tank refuels.
          </p>
        </div>
        {/* add averageConsumption */}
        <div className="mt-4 rounded-lg bg-muted/40 px-4 py-3">
          <p className="text-xs text-muted-foreground">
            Average consumption (simple average):{" "}
            {averageConsumption.toFixed(2)} L/100 km
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default FuelConsumption;
