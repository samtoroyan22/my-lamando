"use client";

import { useState } from "react";
import {
  CalendarClock,
  ChevronLeft,
  ChevronRight,
  Gauge,
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

  const nextMaintenanceDistance = maintenanceSchedule
    .filter((item) => item.remainingKm !== undefined)
    .reduce<number | undefined>((closest, item) => {
      if (item.remainingKm === undefined) {
        return closest;
      }

      if (closest === undefined) {
        return item.remainingKm;
      }

      return Math.min(closest, item.remainingKm);
    }, undefined);

  const nextMaintenances: MaintenanceItemWithStatus[] =
    nextMaintenanceDistance !== undefined
      ? maintenanceSchedule.filter(
          (item) => item.remainingKm === nextMaintenanceDistance,
        )
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

  const canNavigate = nextMaintenances.length > 1;

  const showPreviousMaintenance = () => {
    if (nextMaintenances.length <= 1) {
      return;
    }

    setNextMaintenanceIndex((currentIndex) =>
      currentIndex === 0 ? nextMaintenances.length - 1 : currentIndex - 1,
    );
  };

  const showNextMaintenance = () => {
    if (nextMaintenances.length <= 1) {
      return;
    }

    setNextMaintenanceIndex((currentIndex) =>
      currentIndex === nextMaintenances.length - 1 ? 0 : currentIndex + 1,
    );
  };

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
      {/* LAST SERVICE */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Last service
          </CardTitle>

          <History className="size-4 text-muted-foreground" />
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

      {/* NEXT SERVICE */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Next service
          </CardTitle>

          <CalendarClock className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          {currentNextMaintenance ? (
            <div className="space-y-2">
              {/* TITLE + NAVIGATION */}

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

              {/* NEXT SERVICE MILEAGE */}

              <p className="text-sm text-muted-foreground">
                {formatNumber(currentNextMaintenance.nextServiceMileage ?? 0)}{" "}
                km
              </p>

              {/* REMAINING */}

              {remainingKm !== undefined && (
                <p
                  className={
                    remainingKm < 0
                      ? "text-xs font-medium text-destructive"
                      : "text-xs text-muted-foreground"
                  }
                >
                  {remainingKm >= 0
                    ? `${formatNumber(remainingKm)} km remaining`
                    : `${formatNumber(Math.abs(remainingKm))} km overdue`}
                </p>
              )}

              {/* INDICATORS */}

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

      {/* CURRENT MILEAGE */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Current mileage
          </CardTitle>

          <Gauge className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">
            {formatNumber(currentMileage)}
          </p>

          <p className="mt-1 text-sm text-muted-foreground">km</p>
        </CardContent>
      </Card>

      {/* SERVICES */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Services
          </CardTitle>

          <History className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{serviceCount}</p>

          <p className="mt-1 text-sm text-muted-foreground">completed</p>
        </CardContent>
      </Card>

      {/* TOTAL COST */}

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total cost
          </CardTitle>

          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{formatMoney(totalCost)}</p>

          {remainingKm !== undefined && (
            <p className="mt-1 text-sm text-muted-foreground">
              {remainingKm >= 0
                ? `${formatNumber(remainingKm)} km remaining`
                : `${formatNumber(Math.abs(remainingKm))} km overdue`}
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceOverview;
