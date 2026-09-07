"use client";

import FuelDialog from "@/components/fuel/fuel-dialog";

const FuelPageHeader = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Fuel</p>
        <h1 className="text-3xl font-semibold tracking-tight">Fuel Entries</h1>
        <p className="text-muted-foreground">
          Track refueling history and fuel consumption
        </p>
      </div>

      <FuelDialog />
    </header>
  );
};

export default FuelPageHeader;
