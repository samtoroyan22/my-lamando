import { Expense } from "./expense";
import { FuelEntry } from "./fuel";
import { ServiceRecord } from "./service";

export type ActivityType = "fuel" | "expense" | "service";

export interface DashboardActivity {
  id: string;
  type: ActivityType;
  date: string;
  title: string;
  amount: number;
  mileage?: number;
}

export interface GetRecentActivityParams {
  fuelEntries: FuelEntry[];
  expenseEntries: Expense[];
  serviceEntries: ServiceRecord[];
  limit?: number;
}
