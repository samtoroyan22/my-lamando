"use client";

import ServiceDialog from "./service-dialog";

const ServicePageHeader = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Service</p>
        <h1 className="text-3xl font-semibold tracking-tight">
          Vehicle maintenance
        </h1>
        <p className="text-muted-foreground">
          Maintenance schedule and service history.
        </p>
      </div>

      <ServiceDialog />
    </header>
  );
};

export default ServicePageHeader;
