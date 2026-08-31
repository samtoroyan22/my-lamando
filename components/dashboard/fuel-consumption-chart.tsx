"use client";

import { useMemo } from "react";
import { Fuel } from "lucide-react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format } from "date-fns";

import { useFuel } from "@/contexts/fuel-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface FuelChartPoint {
  date: string;
  mileage: number;
  consumption: number;
}

const FuelConsumptionChart = () => {
  const { fuelEntries } = useFuel();

  const chartData = useMemo<FuelChartPoint[]>(() => {
    if (fuelEntries.length < 2) {
      return [];
    }

    const sortedEntries = [...fuelEntries].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    const result: FuelChartPoint[] = [];

    for (let index = 1; index < sortedEntries.length; index += 1) {
      const previousEntry = sortedEntries[index - 1];
      const currentEntry = sortedEntries[index];

      const distance = currentEntry.mileage - previousEntry.mileage;

      if (distance <= 0) {
        continue;
      }

      const consumption = (currentEntry.liters / distance) * 100;

      if (!Number.isFinite(consumption) || consumption <= 0) {
        continue;
      }

      result.push({
        date: currentEntry.date,
        mileage: currentEntry.mileage,
        consumption,
      });
    }

    return result;
  }, [fuelEntries]);

  const averageConsumption = useMemo(() => {
    if (chartData.length === 0) {
      return 0;
    }

    const total = chartData.reduce((sum, item) => sum + item.consumption, 0);

    return total / chartData.length;
  }, [chartData]);

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Fuel className="size-4 text-muted-foreground" />
            Fuel consumption
          </CardTitle>

          <p className="mt-1 text-sm text-muted-foreground">
            Consumption history based on refueling data.
          </p>
        </div>

        {averageConsumption > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Average</p>

            <p className="text-lg font-semibold">
              {averageConsumption.toFixed(1)} L/100 km
            </p>
          </div>
        )}
      </CardHeader>

      <CardContent>
        {chartData.length === 0 ? (
          <div className="flex min-h-75 items-center justify-center rounded-lg border border-dashed">
            <div className="text-center">
              <Fuel className="mx-auto size-8 text-muted-foreground/50" />

              <p className="mt-3 text-sm font-medium">Not enough fuel data</p>

              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Add at least two fuel records with different mileage values to
                see the consumption chart.
              </p>
            </div>
          </div>
        ) : (
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{
                  top: 10,
                  right: 10,
                  left: 0,
                  bottom: 0,
                }}
              >
                <defs>
                  <linearGradient
                    id="fuelConsumptionGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop
                      offset="5%"
                      stopColor="currentColor"
                      stopOpacity={0.2}
                    />

                    <stop
                      offset="95%"
                      stopColor="currentColor"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>

                <CartesianGrid
                  strokeDasharray="3 3"
                  className="stroke-border"
                  vertical={false}
                />

                <XAxis
                  dataKey="date"
                  tickFormatter={(value: string) =>
                    format(new Date(value), "dd.MM")
                  }
                  tickLine={false}
                  axisLine={false}
                  tickMargin={10}
                  className="text-xs"
                />

                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  width={45}
                  tickFormatter={(value: number) => `${value}`}
                  className="text-xs"
                />

                <Tooltip
                  cursor={{
                    stroke: "hsl(var(--border))",
                    strokeWidth: 1,
                  }}
                  content={({ active, payload }) => {
                    if (!active || !payload || payload.length === 0) {
                      return null;
                    }

                    const point = payload[0]?.payload as
                      | FuelChartPoint
                      | undefined;

                    if (!point) {
                      return null;
                    }

                    return (
                      <div className="rounded-lg border bg-background px-3 py-2 shadow-md">
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(point.date), "dd.MM.yyyy")}
                        </p>

                        <p className="mt-1 text-sm font-medium">
                          {point.consumption.toFixed(1)} L/100 km
                        </p>

                        <p className="text-xs text-muted-foreground">
                          {point.mileage.toLocaleString("ru-RU")} km
                        </p>
                      </div>
                    );
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="consumption"
                  stroke="currentColor"
                  strokeWidth={2}
                  fill="url(#fuelConsumptionGradient)"
                  className="text-primary"
                  dot={{
                    r: 3,
                    strokeWidth: 2,
                  }}
                  activeDot={{
                    r: 5,
                    strokeWidth: 2,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FuelConsumptionChart;
