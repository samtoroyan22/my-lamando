"use client";

import { format, formatDistanceStrict } from "date-fns";
import { CalendarDays } from "lucide-react";

type MaintenanceTimeInfoProps = {
  nextServiceDate?: string;
  remainingDays?: number;
  intervalMonths?: number;
  isOverdue: boolean;
};

const MaintenanceTimeInfo = ({
  nextServiceDate,
  remainingDays,
  intervalMonths,
  isOverdue,
}: MaintenanceTimeInfoProps) => {
  return (
    <div className="flex min-h-7 w-full items-center gap-3 rounded-full border border-border/60 bg-muted/40 px-3.5 py-1.5 dark:bg-white/5">
      <div
        className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
          isOverdue
            ? "bg-destructive/15 text-destructive"
            : "bg-sky-500/15 text-sky-600 dark:text-sky-400"
        }`}
      >
        <CalendarDays className="size-3.5" aria-hidden="true" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium tabular-nums">
          {nextServiceDate
            ? format(new Date(nextServiceDate), "d MMM yyyy")
            : "Not scheduled"}
        </p>
      </div>

      <div className="shrink-0 text-right">
        {remainingDays !== undefined ? (
          <p
            className={`text-[11px] font-medium ${
              isOverdue ? "text-destructive" : "text-muted-foreground"
            }`}
          >
            {remainingDays >= 0
              ? formatDistanceStrict(0, remainingDays * 24 * 60 * 60 * 1000, {
                  unit: "day",
                  addSuffix: false,
                }) + " left"
              : `${Math.abs(remainingDays)} days overdue`}
          </p>
        ) : intervalMonths ? (
          <p className="text-[11px] text-muted-foreground">
            Every {intervalMonths} mo
          </p>
        ) : null}
      </div>
    </div>
  );
};

export default MaintenanceTimeInfo;
