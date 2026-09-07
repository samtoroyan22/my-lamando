"use client";

import { CheckCircle2, CircleAlert, Clock3 } from "lucide-react";

import type { MaintenanceStatus } from "@/lib/calculations/maintenance";

type MaintenanceStatusProps = {
  status: MaintenanceStatus;
  remainingKm?: number;
  remainingDays?: number;
};

const statusConfig: Record<
  MaintenanceStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    badgeClassName: string;
  }
> = {
  Normal: {
    label: "Normal",
    icon: CheckCircle2,
    badgeClassName: "bg-muted/60 text-muted-foreground",
  },
  Soon: {
    label: "Soon",
    icon: Clock3,
    badgeClassName: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  },
  Due: {
    label: "Due",
    icon: CircleAlert,
    badgeClassName: "bg-orange-500/10 text-orange-600 dark:text-orange-400",
  },
  Overdue: {
    label: "Overdue",
    icon: CircleAlert,
    badgeClassName: "bg-destructive/10 text-destructive",
  },
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const MaintenanceStatusBadge = ({
  status,
  remainingKm,
  remainingDays,
}: MaintenanceStatusProps) => {
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  const subtitle = (() => {
    if (remainingKm !== undefined) {
      return remainingKm >= 0
        ? `${formatNumber(remainingKm)} km left`
        : `${formatNumber(Math.abs(remainingKm))} km overdue`;
    }

    if (remainingDays !== undefined) {
      return remainingDays >= 0
        ? `${remainingDays} days left`
        : `${Math.abs(remainingDays)} days overdue`;
    }

    return null;
  })();

  return (
    <div className="min-w-27.5 lg:text-right">
      <div
        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${config.badgeClassName}`}
      >
        <StatusIcon className="size-3.5" aria-hidden="true" />
        {config.label}
      </div>

      {subtitle && (
        <p className="mt-1.5 text-xs text-muted-foreground">{subtitle}</p>
      )}
    </div>
  );
};

export default MaintenanceStatusBadge;
