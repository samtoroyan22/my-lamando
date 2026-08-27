export const MAINTENANCE_WORKS = [
  "Engine oil",
  "Oil filter",
  "Air filter",
  "Cabin filter",
  "Spark plugs",
  "DSG service",
  "Brake fluid",
  "Coolant",
  "Brake pads",
  "Brake discs",
  "Diagnostics",
  "Brake inspection",
] as const;

export type MaintenanceWork = (typeof MAINTENANCE_WORKS)[number];
