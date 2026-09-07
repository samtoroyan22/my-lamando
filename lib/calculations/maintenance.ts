import type { MaintenanceItem, ServiceRecord } from "@/types/service";

export type MaintenanceStatus = "Normal" | "Soon" | "Due" | "Overdue";

export interface MaintenanceItemWithStatus extends MaintenanceItem {
  status: MaintenanceStatus;
  remainingKm?: number;
  remainingDays?: number;
}

export const DEFAULT_MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: "engine-oil",
    name: "Engine oil",
    maintenanceType: "replace",
    intervalKm: 7500,
    intervalMonths: 12,
  },
  {
    id: "oil-filter",
    name: "Oil filter",
    maintenanceType: "replace",
    intervalKm: 7500,
    intervalMonths: 12,
  },
  {
    id: "air-filter",
    name: "Air filter",
    maintenanceType: "replace",
    intervalKm: 15000,
  },
  {
    id: "cabin-filter",
    name: "Cabin filter",
    maintenanceType: "replace",
    intervalKm: 12000,
    intervalMonths: 12,
  },
  {
    id: "spark-plugs",
    name: "Spark plugs",
    maintenanceType: "replace",
    intervalKm: 30000,
  },
  {
    id: "dsg-service",
    name: "DSG service",
    maintenanceType: "replace",
    intervalKm: 60000,
  },
  {
    id: "brake-fluid",
    name: "Brake fluid",
    maintenanceType: "time-based",
    intervalMonths: 24,
  },
  {
    id: "coolant",
    name: "Coolant",
    maintenanceType: "time-based",
    intervalMonths: 60,
  },
  {
    id: "brake-pads",
    name: "Brake pads",
    maintenanceType: "inspect",
  },
  {
    id: "brake-discs",
    name: "Brake discs",
    maintenanceType: "inspect",
  },
  {
    id: "timing-belt-inspection",
    name: "Timing belt inspection",
    maintenanceType: "inspect",
    intervalKm: 90000,
  },
  {
    id: "battery-check",
    name: "Battery check",
    maintenanceType: "inspect",
    intervalMonths: 12,
  },
];

const normalizeText = (value: string) =>
  value.toLowerCase().trim().replace(/\s+/g, " ");

const isWorkMatch = (maintenanceName: string, work: string): boolean => {
  const maintenance = normalizeText(maintenanceName);
  const normalizedWork = normalizeText(work);

  return (
    normalizedWork === maintenance ||
    normalizedWork.includes(maintenance) ||
    maintenance.includes(normalizedWork)
  );
};

function findLastServiceForItem(
  item: MaintenanceItem,
  serviceEntries: ServiceRecord[],
): ServiceRecord | undefined {
  const matchingServices = serviceEntries.filter((service) =>
    service.works.some((work) => isWorkMatch(item.name, work)),
  );

  if (matchingServices.length === 0) {
    return undefined;
  }

  return [...matchingServices].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
}

function addMonths(dateString: string, months: number): Date {
  const date = new Date(dateString);
  date.setMonth(date.getMonth() + months);
  return date;
}

function getRemainingDays(
  nextServiceDate: string | undefined,
  currentDate: Date,
): number | undefined {
  if (!nextServiceDate) {
    return undefined;
  }

  const nextDate = new Date(nextServiceDate);

  return Math.ceil(
    (nextDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24),
  );
}

export function buildMaintenanceSchedule(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
): MaintenanceItem[] {
  return items.map((item) => {
    const lastService = findLastServiceForItem(item, serviceEntries);

    if (!lastService) {
      return item;
    }

    const nextServiceMileage =
      item.intervalKm !== undefined
        ? lastService.mileage + item.intervalKm
        : undefined;

    const nextServiceDate =
      item.intervalMonths !== undefined
        ? addMonths(lastService.date, item.intervalMonths).toISOString()
        : undefined;

    return {
      ...item,
      lastServiceMileage: lastService.mileage,
      lastServiceDate: lastService.date,
      nextServiceMileage,
      nextServiceDate,
    };
  });
}

export function getMaintenanceStatus(
  item: MaintenanceItem,
  currentMileage: number,
  currentDate: Date = new Date(),
): MaintenanceStatus {
  const remainingKm =
    item.nextServiceMileage !== undefined
      ? item.nextServiceMileage - currentMileage
      : undefined;

  const remainingDays = getRemainingDays(item.nextServiceDate, currentDate);

  if (remainingKm === undefined && remainingDays === undefined) {
    return "Normal";
  }

  const isOverdueByMileage = remainingKm !== undefined && remainingKm < 0;
  const isOverdueByDate = remainingDays !== undefined && remainingDays < 0;

  if (isOverdueByMileage || isOverdueByDate) {
    return "Overdue";
  }

  const isDueByMileage = remainingKm === 0;
  const isDueByDate = remainingDays === 0;

  if (isDueByMileage || isDueByDate) {
    return "Due";
  }

  const isSoonByMileage = remainingKm !== undefined && remainingKm <= 2000;

  const isSoonByDate = remainingDays !== undefined && remainingDays <= 30;

  if (isSoonByMileage || isSoonByDate) {
    return "Soon";
  }

  return "Normal";
}

export function getRemainingKm(
  item: MaintenanceItem,
  currentMileage: number,
): number | undefined {
  if (item.nextServiceMileage === undefined) {
    return undefined;
  }

  return item.nextServiceMileage - currentMileage;
}

export function getRemainingDaysForMaintenance(
  item: MaintenanceItem,
  currentDate: Date = new Date(),
): number | undefined {
  return getRemainingDays(item.nextServiceDate, currentDate);
}

export function prepareMaintenanceItem(
  item: MaintenanceItem,
  currentMileage: number,
  currentDate: Date = new Date(),
): MaintenanceItemWithStatus {
  return {
    ...item,
    status: getMaintenanceStatus(item, currentMileage, currentDate),
    remainingKm: getRemainingKm(item, currentMileage),
    remainingDays: getRemainingDaysForMaintenance(item, currentDate),
  };
}

export function getMaintenanceSchedule(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
  currentMileage: number,
  currentDate: Date = new Date(),
): MaintenanceItemWithStatus[] {
  const schedule = buildMaintenanceSchedule(items, serviceEntries);

  return schedule.map((item) =>
    prepareMaintenanceItem(item, currentMileage, currentDate),
  );
}

export function getLastService(
  serviceEntries: ServiceRecord[],
): ServiceRecord | undefined {
  if (serviceEntries.length === 0) {
    return undefined;
  }

  return [...serviceEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0];
}

function getMaintenancePriority(item: MaintenanceItemWithStatus): number {
  if (item.status === "Overdue") {
    return 0;
  }

  if (item.status === "Due") {
    return 1;
  }

  if (item.status === "Soon") {
    return 2;
  }

  return 3;
}

function getMaintenanceDistance(item: MaintenanceItemWithStatus): number {
  const mileageDistance = item.remainingKm ?? Infinity;
  const timeDistance = item.remainingDays ?? Infinity;

  return Math.min(mileageDistance, timeDistance);
}

export function getNextMaintenance(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
  currentMileage: number,
  currentDate: Date = new Date(),
): MaintenanceItemWithStatus | undefined {
  const schedule = getMaintenanceSchedule(
    items,
    serviceEntries,
    currentMileage,
    currentDate,
  );

  return schedule
    .filter(
      (item) =>
        item.nextServiceMileage !== undefined ||
        item.nextServiceDate !== undefined,
    )
    .sort((a, b) => {
      const priorityDifference =
        getMaintenancePriority(a) - getMaintenancePriority(b);

      if (priorityDifference !== 0) {
        return priorityDifference;
      }

      return getMaintenanceDistance(a) - getMaintenanceDistance(b);
    })[0];
}

export function getServiceCount(serviceEntries: ServiceRecord[]): number {
  return serviceEntries.length;
}

export function getTotalServiceCost(serviceEntries: ServiceRecord[]): number {
  return serviceEntries.reduce((sum, entry) => sum + entry.cost, 0);
}
