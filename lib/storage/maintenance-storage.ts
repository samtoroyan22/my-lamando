import type { MaintenanceItem } from "@/types/service";

const STORAGE_KEY = "lamando-maintenance";

export function getMaintenanceItems(): MaintenanceItem[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored) as MaintenanceItem[];
  } catch {
    return [];
  }
}

export function saveMaintenanceItems(items: MaintenanceItem[]): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addMaintenanceItem(item: MaintenanceItem): void {
  const current = getMaintenanceItems();

  saveMaintenanceItems([...current, item]);
}

export function updateMaintenanceItem(updatedItem: MaintenanceItem): void {
  const current = getMaintenanceItems();

  saveMaintenanceItems(
    current.map((item) => (item.id === updatedItem.id ? updatedItem : item)),
  );
}

export function deleteMaintenanceItem(id: string): void {
  const current = getMaintenanceItems();

  saveMaintenanceItems(current.filter((item) => item.id !== id));
}
