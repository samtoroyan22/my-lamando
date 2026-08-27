"use client";

import { CheckCircle2, Clock3, CircleAlert, Wrench } from "lucide-react";

import { useCar } from "@/contexts/car-context";
import { useService } from "@/contexts/service-context";

import {
  DEFAULT_MAINTENANCE_ITEMS,
  getMaintenanceSchedule,
  type MaintenanceStatus,
} from "@/lib/calculations/maintenance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const statusConfig: Record<
  MaintenanceStatus,
  {
    label: string;
    icon: typeof CheckCircle2;
    className: string;
  }
> = {
  Normal: {
    label: "Normal",
    icon: CheckCircle2,
    className: "text-muted-foreground",
  },

  Soon: {
    label: "Soon",
    icon: Clock3,
    className: "text-amber-500",
  },

  Due: {
    label: "Due",
    icon: CircleAlert,
    className: "text-orange-500",
  },

  Overdue: {
    label: "Overdue",
    icon: CircleAlert,
    className: "text-destructive",
  },
};

const MaintenanceSchedule = () => {
  const { car } = useCar();
  const { serviceEntries } = useService();

  const schedule = getMaintenanceSchedule(
    DEFAULT_MAINTENANCE_ITEMS,
    serviceEntries,
    car.mileage,
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Maintenance schedule</CardTitle>

        <p className="mt-1 text-sm text-muted-foreground">
          Planned maintenance based on service history and current mileage.
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y">
          {schedule.map((item) => {
            const config = statusConfig[item.status];
            const Icon = config.icon;

            return (
              <div
                key={item.id}
                className="flex flex-col gap-4 p-4 transition-colors hover:bg-muted/40 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 rounded-md border p-2">
                    <Wrench className="size-4 text-muted-foreground" />
                  </div>

                  <div className="min-w-0">
                    <p className="font-medium">{item.name}</p>

                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.intervalKm
                        ? `Every ${formatNumber(item.intervalKm)} km`
                        : item.intervalMonths
                          ? `Every ${item.intervalMonths} months`
                          : "No interval"}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-6 sm:justify-end">
                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">
                      Last service
                    </p>

                    <p className="text-sm font-medium">
                      {item.lastServiceMileage !== undefined
                        ? `${formatNumber(item.lastServiceMileage)} km`
                        : "Not recorded"}
                    </p>
                  </div>

                  <div className="text-left sm:text-right">
                    <p className="text-xs text-muted-foreground">Next</p>

                    <p className="text-sm font-medium">
                      {item.nextServiceMileage !== undefined
                        ? `${formatNumber(item.nextServiceMileage)} km`
                        : "Not scheduled"}
                    </p>
                  </div>

                  <div className="min-w-24 text-left sm:text-right">
                    <div
                      className={`flex items-center gap-1.5 sm:justify-end ${config.className}`}
                    >
                      <Icon className="size-4" />

                      <span className="text-sm font-medium">
                        {config.label}
                      </span>
                    </div>

                    {item.remainingKm !== undefined && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {item.remainingKm >= 0
                          ? `${formatNumber(item.remainingKm)} km left`
                          : `${formatNumber(
                              Math.abs(item.remainingKm),
                            )} km overdue`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedule;
