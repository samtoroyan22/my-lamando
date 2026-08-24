"use client";

import { useFuel } from "@/contexts/fuel-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const FuelStats = () => {
  const { fuelEntries } = useFuel();

  const totalSpent = fuelEntries.reduce(
    (sum, entry) => sum + entry.totalCost,
    0,
  );

  const totalLiters = fuelEntries.reduce((sum, entry) => sum + entry.liters, 0);

  const averagePrice = totalLiters > 0 ? totalSpent / totalLiters : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total spent
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{totalSpent.toFixed(2)} ₽</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total liters
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{totalLiters.toFixed(2)} L</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average price
          </CardTitle>
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">
            {averagePrice.toFixed(2)} ₽/L
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default FuelStats;
