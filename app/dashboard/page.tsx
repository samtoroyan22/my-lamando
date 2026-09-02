"use client";

import { useCar } from "@/contexts/car-context";
import { useFuel } from "@/contexts/fuel-context";
import { useExpense } from "@/contexts/expense-context";
import { useService } from "@/contexts/service-context";

import DashboardHero from "@/components/dashboard/dashboard-hero";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import FuelConsumptionChart from "@/components/dashboard/fuel-consumption-chart";
import MonthlyExpensesChart from "@/components/dashboard/monthly-expenses-chart";
import NextService from "@/components/dashboard/next-service";
import RecentActivity from "@/components/dashboard/recent-activity";
import DashboardSkeleton from "@/components/dashboard/dashboard-skeleton";

const DashboardPage = () => {
  const { isLoading: isCarLoading } = useCar();
  const { isLoading: isFuelLoading } = useFuel();
  const { isLoading: isExpenseLoading } = useExpense();
  const { isLoading: isServiceLoading } = useService();

  const isLoading =
    isCarLoading || isFuelLoading || isExpenseLoading || isServiceLoading;

  if (isLoading) {
    return (
      <main className="space-y-6">
        <DashboardSkeleton />
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <DashboardHero />
      <DashboardStats />

      <div className="grid gap-4 lg:grid-cols-2">
        <FuelConsumptionChart />
        <MonthlyExpensesChart />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <RecentActivity />
        <NextService />
      </div>
    </main>
  );
};

export default DashboardPage;
