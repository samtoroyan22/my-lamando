"use client";

import FuelDialog from "@/components/fuel/fuel-dialog";

const FuelPageHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Fuel</p>

        <h1 className="text-2xl font-semibold tracking-tight">Fuel Entries</h1>
      </div>

      <FuelDialog />
    </header>
  );
};

export default FuelPageHeader;
