import type { FuelEntry } from "@/types/fuel";
import type { Expense } from "@/types/expense";
import type { ServiceRecord } from "@/types/service";
import { DashboardActivity, GetRecentActivityParams } from "@/types/dashboard";

export function getTotalFuelCost(fuelEntries: FuelEntry[]): number {
  return fuelEntries.reduce((sum, entry) => sum + entry.totalCost, 0);
}

export function getTotalExpenses(expenseEntries: Expense[]): number {
  return expenseEntries.reduce((sum, entry) => sum + entry.amount, 0);
}

export function getAverageFuelConsumption(
  fuelEntries: FuelEntry[],
): number | undefined {
  if (fuelEntries.length < 2) {
    return undefined;
  }

  const sortedEntries = [...fuelEntries].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  let totalLiters = 0;
  let totalDistance = 0;

  for (let index = 1; index < sortedEntries.length; index += 1) {
    const previous = sortedEntries[index - 1];
    const current = sortedEntries[index];

    const distance = current.mileage - previous.mileage;

    if (distance <= 0) {
      continue;
    }

    totalLiters += current.liters;
    totalDistance += distance;
  }

  if (totalDistance <= 0) {
    return undefined;
  }

  return (totalLiters / totalDistance) * 100;
}

export function getTotalTrackedCost(
  fuelEntries: FuelEntry[],
  expenseEntries: Expense[],
  serviceEntries: ServiceRecord[],
): number {
  const fuelCost = getTotalFuelCost(fuelEntries);
  const expensesCost = getTotalExpenses(expenseEntries);
  const serviceCost = serviceEntries.reduce(
    (sum, entry) => sum + entry.cost,
    0,
  );

  return fuelCost + expensesCost + serviceCost;
}

export function getCostPerKm(
  totalCost: number,
  currentMileage: number,
): number | undefined {
  if (currentMileage <= 0 || totalCost <= 0) {
    return undefined;
  }

  return totalCost / currentMileage;
}

export function getRecentActivity({
  fuelEntries,
  expenseEntries,
  serviceEntries,
  limit = 5,
}: GetRecentActivityParams): DashboardActivity[] {
  const fuelActivities: DashboardActivity[] = fuelEntries.map((entry) => ({
    id: `fuel-${entry.id}`,
    type: "fuel",
    date: entry.date,
    title: "Fuel",
    amount: entry.totalCost,
    mileage: entry.mileage,
  }));

  const expenseActivities: DashboardActivity[] = expenseEntries.map(
    (entry) => ({
      id: `expense-${entry.id}`,
      type: "expense",
      date: entry.date,
      title: entry.title,
      amount: entry.amount,
      mileage: entry.mileage,
    }),
  );

  const serviceActivities: DashboardActivity[] = serviceEntries.map(
    (entry) => ({
      id: `service-${entry.id}`,
      type: "service",
      date: entry.date,
      title: entry.title,
      amount: entry.cost,
      mileage: entry.mileage,
    }),
  );

  return [...fuelActivities, ...expenseActivities, ...serviceActivities]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
}
