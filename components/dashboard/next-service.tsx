"use client";

import { format } from "date-fns";
import { CalendarClock, CheckCircle2, CircleAlert, Wrench } from "lucide-react";
import Link from "next/link";
import { motion } from "motion/react";

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
    .filter(
      (item) =>
        item.nextServiceMileage !== undefined ||
        item.nextServiceDate !== undefined,
    )
    .sort((a, b) => {
      const aDist = Math.min(
        a.remainingKm ?? Infinity,
        a.remainingDays ?? Infinity,
      );
      const bDist = Math.min(
        b.remainingKm ?? Infinity,
        b.remainingDays ?? Infinity,
      );
      return aDist - bDist;
    });

  const nextService = scheduledItems[0];

  const isOverdue = nextService
    ? (nextService.remainingKm !== undefined && nextService.remainingKm < 0) ||
      (nextService.remainingDays !== undefined && nextService.remainingDays < 0)
    : false;

  const serviceAtLabel =
    nextService?.nextServiceMileage !== undefined
      ? `${formatNumber(nextService.nextServiceMileage)} km`
      : nextService?.nextServiceDate
        ? format(new Date(nextService.nextServiceDate), "d MMM yyyy")
        : "—";

  const remainingLabel = (() => {
    if (!nextService) return null;

    if (nextService.remainingKm !== undefined) {
      return {
        value: formatNumber(Math.abs(nextService.remainingKm)),
        unit: "km",
      };
    }

    if (nextService.remainingDays !== undefined) {
      return {
        value: String(Math.abs(nextService.remainingDays)),
        unit: "days",
      };
    }

    return null;
  })();

  return (
    <Card className="flex h-full flex-col border-border/50 bg-card/80">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-4">
        <div>
          <CardTitle className="text-base font-semibold tracking-tight">
            Next service
          </CardTitle>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Upcoming maintenance
          </p>
        </div>
        <CalendarClock
          className="size-5 text-amber-600 dark:text-amber-400"
          aria-hidden="true"
        />
      </CardHeader>

      <CardContent className="flex flex-1 flex-col">
        {!nextService ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            className="flex min-h-55 flex-1 flex-col items-center justify-center rounded-xl border border-dashed border-border/60 text-center"
          >
            <CheckCircle2
              className="mb-3 size-9 text-emerald-600/50 dark:text-emerald-400/50"
              aria-hidden="true"
            />
            <p className="font-medium text-foreground">No upcoming service</p>
            <p className="mt-1 max-w-55 text-sm text-muted-foreground">
              Maintenance schedule is currently clear
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className={`flex flex-1 flex-col rounded-xl border p-5 ${
              isOverdue
                ? "border-destructive/30 bg-destructive/5"
                : "border-border/60 bg-muted/20"
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full ${
                    isOverdue
                      ? "bg-destructive/15 text-destructive"
                      : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                  }`}
                >
                  {isOverdue ? (
                    <CircleAlert className="size-5" aria-hidden="true" />
                  ) : (
                    <Wrench className="size-5" aria-hidden="true" />
                  )}
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {isOverdue ? "Service overdue" : "Next service"}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug tracking-tight">
                    {nextService.name}
                  </h3>
                </div>
              </div>

              <span
                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                  isOverdue
                    ? "bg-destructive/15 text-destructive"
                    : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                }`}
              >
                {isOverdue ? "Overdue" : nextService.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Service at</p>
                <p className="mt-1 text-lg font-semibold tabular-nums tracking-tight">
                  {serviceAtLabel}
                </p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">
                  {isOverdue ? "Overdue by" : "Remaining"}
                </p>
                {remainingLabel && (
                  <p
                    className={`mt-1 text-lg font-semibold tabular-nums tracking-tight ${
                      isOverdue ? "text-destructive" : ""
                    }`}
                  >
                    {remainingLabel.value}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {remainingLabel.unit}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="mt-auto pt-6">
              <Button
                variant={isOverdue ? "destructive" : "secondary"}
                size="sm"
                className="w-full sm:w-auto"
              >
                <Link href="/service">
                  {isOverdue ? "Schedule service" : "Open service"}
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
};

export default NextService;
