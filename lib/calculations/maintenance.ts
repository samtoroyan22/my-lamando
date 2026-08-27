import type { MaintenanceItem, ServiceRecord } from "@/types/service";

export type MaintenanceStatus = "Normal" | "Soon" | "Due" | "Overdue";

export interface MaintenanceItemWithStatus extends MaintenanceItem {
  status: MaintenanceStatus;
  remainingKm?: number;
}

export const DEFAULT_MAINTENANCE_ITEMS: MaintenanceItem[] = [
  {
    id: "engine-oil",
    name: "Engine oil",
    intervalKm: 7500,
  },
  {
    id: "oil-filter",
    name: "Oil filter",
    intervalKm: 7500,
  },
  {
    id: "air-filter",
    name: "Air filter",
    intervalKm: 15000,
  },
  {
    id: "cabin-filter",
    name: "Cabin filter",
    intervalKm: 12000,
  },
  {
    id: "spark-plugs",
    name: "Spark plugs",
    intervalKm: 60000,
  },
  {
    id: "dsg-service",
    name: "DSG service",
    intervalKm: 60000,
  },
  {
    id: "brake-fluid",
    name: "Brake fluid",
    intervalMonths: 24,
  },
  {
    id: "coolant",
    name: "Coolant",
    intervalKm: 120000,
    intervalMonths: 60,
  },
  {
    id: "brake-pads",
    name: "Brake pads",
    intervalKm: 30000,
  },
  {
    id: "brake-discs",
    name: "Brake discs",
    intervalKm: 60000,
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

export function buildMaintenanceSchedule(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
): MaintenanceItem[] {
  return items.map((item) => {
    const lastService = findLastServiceForItem(item, serviceEntries);

    if (!lastService) {
      return item;
    }

    return {
      ...item,
      lastServiceMileage: lastService.mileage,
      lastServiceDate: lastService.date,

      nextServiceMileage: item.intervalKm
        ? lastService.mileage + item.intervalKm
        : undefined,

      nextServiceDate: item.intervalMonths
        ? new Date(
            new Date(lastService.date).setMonth(
              new Date(lastService.date).getMonth() + item.intervalMonths,
            ),
          ).toISOString()
        : undefined,
    };
  });
}

export function getMaintenanceStatus(
  item: MaintenanceItem,
  currentMileage: number,
): MaintenanceStatus {
  if (item.nextServiceMileage === undefined) {
    return "Normal";
  }

  const remainingKm = item.nextServiceMileage - currentMileage;

  if (remainingKm < 0) {
    return "Overdue";
  }

  if (remainingKm === 0) {
    return "Due";
  }

  if (remainingKm <= 2000) {
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

export function prepareMaintenanceItem(
  item: MaintenanceItem,
  currentMileage: number,
): MaintenanceItemWithStatus {
  return {
    ...item,

    status: getMaintenanceStatus(item, currentMileage),

    remainingKm: getRemainingKm(item, currentMileage),
  };
}

export function getMaintenanceSchedule(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
  currentMileage: number,
): MaintenanceItemWithStatus[] {
  const schedule = buildMaintenanceSchedule(items, serviceEntries);

  return schedule.map((item) => prepareMaintenanceItem(item, currentMileage));
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

export function getNextMaintenance(
  items: MaintenanceItem[],
  serviceEntries: ServiceRecord[],
  currentMileage: number,
): MaintenanceItemWithStatus | undefined {
  const schedule = getMaintenanceSchedule(
    items,
    serviceEntries,
    currentMileage,
  );

  return schedule
    .filter((item) => item.remainingKm !== undefined)
    .sort(
      (a, b) => (a.remainingKm ?? Infinity) - (b.remainingKm ?? Infinity),
    )[0];
}

export function getServiceCount(serviceEntries: ServiceRecord[]): number {
  return serviceEntries.length;
}

export function getTotalServiceCost(serviceEntries: ServiceRecord[]): number {
  return serviceEntries.reduce((sum, entry) => sum + entry.cost, 0);
}
