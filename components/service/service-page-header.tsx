"use client";

import ServiceDialog from "./service-dialog";

const ServicePageHeader = () => {
  return (
    <header className="flex items-center justify-between">
      <div className="space-y-1">
        <p className="text-sm font-medium text-muted-foreground">Service</p>

        <h1 className="text-2xl font-bold tracking-tight">Service Records</h1>

        <p className="text-sm text-muted-foreground">
          Maintenance and service history of your car
        </p>
      </div>

      <ServiceDialog />
    </header>
  );
};

export default ServicePageHeader;
