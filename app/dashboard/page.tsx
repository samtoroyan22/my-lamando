"use client";

import DashboardHero from "@/components/dashboard/dashboard-hero";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import FuelConsumptionChart from "@/components/dashboard/fuel-consumption-chart";
import MonthlyExpensesChart from "@/components/dashboard/monthly-expenses-chart";
import NextService from "@/components/dashboard/next-service";
import RecentActivity from "@/components/dashboard/recent-activity";

const DashboardPage = () => {
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
