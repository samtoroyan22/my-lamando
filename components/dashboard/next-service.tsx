"use client";

import { CalendarClock, CheckCircle2, CircleAlert, Wrench } from "lucide-react";
import Link from "next/link";

import { useCar } from "@/contexts/car-context";
import { useService } from "@/contexts/service-context";

import {
  DEFAULT_MAINTENANCE_ITEMS,
  getMaintenanceSchedule,
} from "@/lib/calculations/maintenance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const NextService = () => {
  const { car } = useCar();
  const { serviceEntries } = useService();

  const schedule = getMaintenanceSchedule(
    DEFAULT_MAINTENANCE_ITEMS,
    serviceEntries,
    car.mileage,
  );

  const scheduledItems = schedule
    .filter((item) => item.nextServiceMileage !== undefined)
    .sort((a, b) => {
      const aRemaining = a.remainingKm ?? Infinity;
      const bRemaining = b.remainingKm ?? Infinity;

      return aRemaining - bRemaining;
    });

  const nextService = scheduledItems[0];

  const isOverdue = nextService ? (nextService.remainingKm ?? 0) < 0 : false;

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>Next service</CardTitle>

          <p className="text-sm text-muted-foreground">Upcoming maintenance</p>
        </div>

        <CalendarClock className="size-5 text-muted-foreground" />
      </CardHeader>

      <CardContent>
        {!nextService ? (
          <div className="flex min-h-48 flex-col items-center justify-center text-center">
            <CheckCircle2 className="mb-3 size-8 text-muted-foreground" />

            <p className="font-medium">No upcoming service</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Maintenance schedule is clear.
            </p>
          </div>
        ) : (
          <div
            className={`rounded-xl border p-5 ${
              isOverdue
                ? "border-destructive/40 bg-destructive/5"
                : "bg-muted/20"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-lg border ${
                    isOverdue ? "border-destructive/30" : "bg-background"
                  }`}
                >
                  {isOverdue ? (
                    <CircleAlert className="size-5 text-destructive" />
                  ) : (
                    <Wrench className="size-5 text-muted-foreground" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {isOverdue ? "Service overdue" : "Next service"}
                  </p>

                  <h3 className="mt-1 text-xl font-semibold">
                    {nextService.name}
                  </h3>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isOverdue
                    ? "bg-destructive/10 text-destructive"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {isOverdue ? "Overdue" : nextService.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Service at</p>

                <p className="mt-1 text-lg font-semibold">
                  {formatNumber(nextService.nextServiceMileage!)} km
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {isOverdue ? "Overdue by" : "Remaining"}
                </p>

                <p
                  className={`mt-1 text-lg font-semibold ${
                    isOverdue ? "text-destructive" : ""
                  }`}
                >
                  {formatNumber(Math.abs(nextService.remainingKm ?? 0))} km
                </p>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <Button variant="ghost" className="bg-muted" size="sm">
                <Link href="/service">Open service</Link>
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NextService;
