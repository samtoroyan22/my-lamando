"use client";

import { useService } from "@/contexts/service-context";

import ServiceOverview from "@/components/service/service-overview";
import MaintenanceSchedule from "@/components/service/maintenance-schedule";
import ServiceHistory from "@/components/service/service-history";
import ServicePageHeader from "@/components/service/service-page-header";
import ServiceSkeleton from "@/components/service/service-skeleton";

const Service = () => {
  const { isLoading } = useService();

  return (
    <main className="space-y-8">
      <ServicePageHeader />

      {isLoading ? (
        <ServiceSkeleton />
      ) : (
        <>
          <ServiceOverview />
          <MaintenanceSchedule />
          <ServiceHistory />
        </>
      )}
    </main>
  );
};

export default Service;
