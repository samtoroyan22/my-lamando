"use client";

import { useFuel } from "@/contexts/fuel-context";

import FuelConsumption from "@/components/fuel/fuel-consumption";
import FuelPageHeader from "@/components/fuel/fuel-page-header";
import FuelStats from "@/components/fuel/fuel-stats";
import FuelTable from "@/components/fuel/fuel-table";
import FuelSkeleton from "@/components/fuel/fuel-skeleton";

const Fuel = () => {
  const { isLoading } = useFuel();

  return (
    <main className="space-y-8">
      <FuelPageHeader />

      {isLoading ? (
        <FuelSkeleton />
      ) : (
        <>
          <FuelStats />
          <FuelConsumption />
          <FuelTable />
        </>
      )}
    </main>
  );
};

export default Fuel;
