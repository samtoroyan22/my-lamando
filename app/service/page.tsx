"use client";

import ServiceOverview from "@/components/service/service-overview";
import MaintenanceSchedule from "@/components/service/maintenance-schedule";
import ServiceHistory from "@/components/service/service-history";
import ServicePageHeader from "@/components/service/service-page-header";

const Service = () => {
  return (
    <main className="space-y-8">
      <ServicePageHeader />
      <ServiceOverview />
      <MaintenanceSchedule />
      <ServiceHistory />
    </main>
  );
};

export default Service;
