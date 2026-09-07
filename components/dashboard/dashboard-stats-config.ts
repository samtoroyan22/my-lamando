import { CircleDollarSign, Fuel, Gauge, Wallet, Wrench } from "lucide-react";

export const DASHBOARD_STATS_CONFIG = [
  {
    key: "mileage",
    title: "Current mileage",
    icon: Gauge,
    iconClass: "bg-red-500/15 text-red-600 dark:text-red-400",
  },
  {
    key: "consumption",
    title: "Average consumption",
    icon: Fuel,
    iconClass: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
  },
  {
    key: "expenses",
    title: "Total expenses",
    icon: Wallet,
    iconClass: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  },
  {
    key: "serviceFuel",
    title: "Service & fuel",
    icon: Wrench,
    iconClass: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  },
  {
    key: "costPerKm",
    title: "Cost per km",
    icon: CircleDollarSign,
    iconClass: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  },
] as const;

export type DashboardStatKey = (typeof DASHBOARD_STATS_CONFIG)[number]["key"];
