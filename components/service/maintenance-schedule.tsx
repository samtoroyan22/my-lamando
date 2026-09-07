"use client";

import { useCar } from "@/contexts/car-context";
import { useService } from "@/contexts/service-context";

import {
  DEFAULT_MAINTENANCE_ITEMS,
  getMaintenanceSchedule,
} from "@/lib/calculations/maintenance";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import MaintenanceRow from "./maintenance-row";

const MaintenanceSchedule = () => {
  const { car } = useCar();
  const { serviceEntries } = useService();

  const schedule = getMaintenanceSchedule(
    DEFAULT_MAINTENANCE_ITEMS,
    serviceEntries,
    car.mileage,
  );

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          Maintenance schedule
        </CardTitle>

        <p className="mt-0.5 text-sm text-muted-foreground">
          Planned maintenance based on service history and current mileage.
        </p>
      </CardHeader>

      <CardContent className="p-0">
        <div className="divide-y divide-border/60">
          {schedule.map((item) => (
            <MaintenanceRow key={item.id} item={item} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MaintenanceSchedule;
