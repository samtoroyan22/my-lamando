"use client";

import { Wrench } from "lucide-react";
import ServiceDialog from "./service-dialog";

const ServicePageHeader = () => {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <Wrench className="size-5 text-muted-foreground" />

          <p className="text-sm font-medium text-muted-foreground">Service</p>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Vehicle maintenance
        </h1>

        <p className="text-sm text-muted-foreground">
          Maintenance schedule and service history.
        </p>
      </div>

      <ServiceDialog />
    </header>
  );
};

export default ServicePageHeader;
