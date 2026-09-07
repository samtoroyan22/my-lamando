export type ServiceRecord = {
  id: string;
  date: string;
  mileage: number;
  title: string;
  works: string[];
  cost: number;
  serviceName?: string;
  comment?: string;
  attachments?: string[];
};

export type MaintenanceType = "replace" | "inspect" | "time-based";

export type MaintenanceItem = {
  id: string;
  name: string;
  maintenanceType: MaintenanceType;
  intervalKm?: number;
  intervalMonths?: number;
  lastServiceMileage?: number;
  lastServiceDate?: string;
  nextServiceMileage?: number;
  nextServiceDate?: string;
};
