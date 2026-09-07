"use client";

import { useState } from "react";
import { format } from "date-fns";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Gauge,
  Hash,
  History,
  Wallet,
} from "lucide-react";

import { useCar } from "@/contexts/car-context";
import { useService } from "@/contexts/service-context";

import {
  DEFAULT_MAINTENANCE_ITEMS,
  getLastService,
  getMaintenanceSchedule,
  getServiceCount,
  getTotalServiceCost,
  type MaintenanceItemWithStatus,
} from "@/lib/calculations/maintenance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value)} ₽`;

const getDistance = (item: MaintenanceItemWithStatus) =>
  Math.min(item.remainingKm ?? Infinity, item.remainingDays ?? Infinity);

const ServiceOverview = () => {
  const { car } = useCar();
  const { serviceEntries } = useService();

  const currentMileage = car.mileage;
  const lastService = getLastService(serviceEntries);

  const maintenanceSchedule = getMaintenanceSchedule(
    DEFAULT_MAINTENANCE_ITEMS,
    serviceEntries,
    currentMileage,
  );

  const sortedUpcoming = [...maintenanceSchedule]
    .filter(
      (item) =>
        item.nextServiceMileage !== undefined ||
        item.nextServiceDate !== undefined,
    )
    .sort((a, b) => getDistance(a) - getDistance(b));

  const closestDistance =
    sortedUpcoming.length > 0 ? getDistance(sortedUpcoming[0]) : undefined;

  const nextMaintenances: MaintenanceItemWithStatus[] =
    closestDistance !== undefined
      ? sortedUpcoming.filter((item) => getDistance(item) === closestDistance)
      : [];

  const [nextMaintenanceIndex, setNextMaintenanceIndex] = useState(0);

  const safeIndex =
    nextMaintenances.length > 0
      ? Math.min(nextMaintenanceIndex, nextMaintenances.length - 1)
      : 0;

  const currentNextMaintenance = nextMaintenances[safeIndex];
  const serviceCount = getServiceCount(serviceEntries);
  const totalCost = getTotalServiceCost(serviceEntries);

  const remainingKm = currentNextMaintenance?.remainingKm;
  const remainingDays = currentNextMaintenance?.remainingDays;
  const isOverdue =
    (remainingKm !== undefined && remainingKm < 0) ||
    (remainingDays !== undefined && remainingDays < 0);

  const canNavigate = nextMaintenances.length > 1;

  const showPreviousMaintenance = () => {
    if (nextMaintenances.length <= 1) return;
    setNextMaintenanceIndex((i) =>
      i === 0 ? nextMaintenances.length - 1 : i - 1,
    );
  };

  const showNextMaintenance = () => {
    if (nextMaintenances.length <= 1) return;
    setNextMaintenanceIndex((i) =>
      i === nextMaintenances.length - 1 ? 0 : i + 1,
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {/* Last service */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last service
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-sky-500/15 text-sky-600 dark:text-sky-400">
            <History className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          {lastService ? (
            <>
              <p className="text-lg font-semibold">{lastService.title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {formatNumber(lastService.mileage)} km
              </p>
            </>
          ) : (
            <p className="text-sm text-muted-foreground">No service records</p>
          )}
        </CardContent>
      </Card>

      {/* Next service */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Next service
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400">
            <CalendarClock className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          {currentNextMaintenance ? (
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                {canNavigate && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0"
                    onClick={showPreviousMaintenance}
                    aria-label="Previous maintenance"
                  >
                    <ChevronLeft className="size-4" />
                  </Button>
                )}

                <p className="min-w-0 flex-1 truncate text-lg font-semibold">
                  {currentNextMaintenance.name}
                </p>

                {canNavigate && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="size-7 shrink-0"
                    onClick={showNextMaintenance}
                    aria-label="Next maintenance"
                  >
                    <ChevronRight className="size-4" />
                  </Button>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {currentNextMaintenance.nextServiceMileage !== undefined
                  ? `${formatNumber(currentNextMaintenance.nextServiceMileage)} km`
                  : currentNextMaintenance.nextServiceDate
                    ? format(
                        new Date(currentNextMaintenance.nextServiceDate),
                        "d MMM yyyy",
                      )
                    : "—"}
              </p>

              {(remainingKm !== undefined || remainingDays !== undefined) && (
                <p
                  className={
                    isOverdue
                      ? "text-xs font-medium text-destructive"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {remainingKm !== undefined
                    ? remainingKm >= 0
                      ? `${formatNumber(remainingKm)} km remaining`
                      : `${formatNumber(Math.abs(remainingKm))} km overdue`
                    : remainingDays !== undefined
                      ? remainingDays >= 0
                        ? `${remainingDays} days remaining`
                        : `${Math.abs(remainingDays)} days overdue`
                      : null}
                </p>
              )}

              {canNavigate && (
                <div className="flex items-center gap-1 pt-1">
                  {nextMaintenances.map((item, index) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setNextMaintenanceIndex(index)}
                      aria-label={`Show ${item.name}`}
                      className={`h-1.5 rounded-full transition-all ${
                        index === safeIndex
                          ? "w-4 bg-foreground"
                          : "w-1.5 bg-muted-foreground/30"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-muted-foreground">No upcoming service</p>
          )}
        </CardContent>
      </Card>

      {/* Current mileage */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current mileage
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-red-500/15 text-red-600 dark:text-red-400">
            <Gauge className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">
            {formatNumber(currentMileage)}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">km</p>
        </CardContent>
      </Card>

      {/* Services */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Services
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-green-500/15 text-green-600 dark:text-green-400">
            <Hash className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{serviceCount}</p>
          <p className="mt-1 text-sm text-muted-foreground">completed</p>
        </CardContent>
      </Card>

      {/* Total cost */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total cost
          </CardTitle>
          <div className="flex size-8 items-center justify-center rounded-full bg-violet-500/15 text-violet-600 dark:text-violet-400">
            <Wallet className="size-4" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-semibold">{formatMoney(totalCost)}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceOverview;
