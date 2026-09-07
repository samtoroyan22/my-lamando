"use client";

import { format } from "date-fns";
import { Wrench } from "lucide-react";

import type { MaintenanceType } from "@/types/service";
import type { MaintenanceItemWithStatus } from "@/lib/calculations/maintenance";

import MaintenanceProgress from "./maintenance-progress";
import MaintenanceTimeInfo from "./maintenance-time-info";
import MaintenanceStatusBadge from "./maintenance-status";

type MaintenanceRowProps = {
  item: MaintenanceItemWithStatus;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const getProgressPercent = (
  remainingKm: number | undefined,
  intervalKm: number | undefined,
) => {
  if (remainingKm === undefined || !intervalKm || intervalKm <= 0) {
    return 0;
  }

  const used = intervalKm - remainingKm;
  const percent = (used / intervalKm) * 100;

  return Math.min(100, Math.max(0, percent));
};

const maintenanceTypeConfig: Record<
  MaintenanceType,
  { label: string; className: string }
> = {
  replace: {
    label: "Replace",
    className:
      "bg-violet-500/10 text-violet-600 dark:bg-violet-500/15 dark:text-violet-400",
  },
  inspect: {
    label: "Inspect",
    className:
      "bg-amber-500/10 text-amber-600 dark:bg-amber-500/15 dark:text-amber-400",
  },
  "time-based": {
    label: "Time-based",
    className:
      "bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400",
  },
};

const MaintenanceRow = ({ item }: MaintenanceRowProps) => {
  const progress = getProgressPercent(item.remainingKm, item.intervalKm);

  const isOverdueByKm = item.remainingKm !== undefined && item.remainingKm < 0;
  const isOverdueByDays =
    item.remainingDays !== undefined && item.remainingDays < 0;
  const isOverdue = isOverdueByKm || isOverdueByDays;

  const showProgress =
    item.intervalKm !== undefined && item.remainingKm !== undefined;

  const showTimeInfo =
    !showProgress &&
    (item.nextServiceDate !== undefined ||
      item.remainingDays !== undefined ||
      item.intervalMonths !== undefined);

  const typeBadge = maintenanceTypeConfig[item.maintenanceType];

  return (
    <div className="grid grid-cols-1 items-center gap-5 px-5 py-4 transition-colors hover:bg-muted/30 lg:grid-cols-[minmax(240px,0.9fr)_minmax(360px,1.5fr)_minmax(400px,1fr)]">
      {/* Left */}
      <div className="flex min-w-0 items-start gap-3.5">
        <div className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/5">
          <Wrench className="size-4 text-primary" aria-hidden="true" />
        </div>

        <div className="min-w-0 space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-medium tracking-tight">{item.name}</p>

            <span
              className={`inline-flex shrink-0 items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${typeBadge.className}`}
            >
              {typeBadge.label}
            </span>
          </div>

          <p className="text-sm text-muted-foreground">
            {item.intervalKm && item.intervalMonths
              ? `Every ${formatNumber(item.intervalKm)} km / ${item.intervalMonths} mo`
              : item.intervalKm
                ? `Every ${formatNumber(item.intervalKm)} km`
                : item.intervalMonths
                  ? `Every ${item.intervalMonths} months`
                  : item.maintenanceType === "inspect"
                    ? "Inspect as needed"
                    : "No interval"}
          </p>
        </div>
      </div>

      {/* Center */}
      <div className="min-w-0 w-full">
        {showProgress ? (
          <MaintenanceProgress
            progress={progress}
            remainingKm={item.remainingKm}
            intervalKm={item.intervalKm}
            isOverdue={isOverdue}
          />
        ) : showTimeInfo ? (
          <MaintenanceTimeInfo
            nextServiceDate={item.nextServiceDate}
            remainingDays={item.remainingDays}
            intervalMonths={item.intervalMonths}
            isOverdue={isOverdue}
          />
        ) : (
          <div className="flex justify-center">
            <span className="text-xs text-muted-foreground">—</span>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 lg:justify-end">
        <div className="min-w-22.5">
          <p className="text-xs text-muted-foreground">Last service</p>
          <p className="mt-0.5 text-sm font-medium tabular-nums">
            {item.lastServiceMileage !== undefined
              ? `${formatNumber(item.lastServiceMileage)} km`
              : item.lastServiceDate
                ? format(new Date(item.lastServiceDate), "d MMM yyyy")
                : "Not recorded"}
          </p>
        </div>

        <div className="min-w-22.5">
          <p className="text-xs text-muted-foreground">Next</p>
          <p className="mt-0.5 text-sm font-medium tabular-nums">
            {item.nextServiceMileage !== undefined
              ? `${formatNumber(item.nextServiceMileage)} km`
              : item.nextServiceDate
                ? format(new Date(item.nextServiceDate), "d MMM yyyy")
                : "Not scheduled"}
          </p>
        </div>

        <MaintenanceStatusBadge
          status={item.status}
          remainingKm={item.remainingKm}
          remainingDays={item.remainingDays}
        />
      </div>
    </div>
  );
};

export default MaintenanceRow;
