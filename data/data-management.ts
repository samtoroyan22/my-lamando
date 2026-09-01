import type { Car } from "@/types/car";
import type { FuelEntry } from "@/types/fuel";
import type { Expense } from "@/types/expense";
import type { ServiceRecord } from "@/types/service";
import type { GalleryPhoto } from "@/types/gallery";

import { STORAGE_KEYS } from "@/lib/storage/keys";

import {
  getStorageItem,
  setStorageItem,
  removeStorageItem,
} from "@/lib/storage/storage";

interface LamandoBackup {
  version: 1;
  exportedAt: string;

  data: {
    car: Car[];
    fuel: FuelEntry[];
    expenses: Expense[];
    services: ServiceRecord[];
    gallery: GalleryPhoto[];
  };
}

const STORAGE_DATA_KEYS = [
  STORAGE_KEYS.car,
  STORAGE_KEYS.fuel,
  STORAGE_KEYS.expenses,
  STORAGE_KEYS.service,
  STORAGE_KEYS.gallery,
];

export function exportApplicationData(): void {
  const backup: LamandoBackup = {
    version: 1,

    exportedAt: new Date().toISOString(),

    data: {
      car: getStorageItem<Car[]>(STORAGE_KEYS.car, []),

      fuel: getStorageItem<FuelEntry[]>(STORAGE_KEYS.fuel, []),

      expenses: getStorageItem<Expense[]>(STORAGE_KEYS.expenses, []),

      services: getStorageItem<ServiceRecord[]>(STORAGE_KEYS.service, []),

      gallery: getStorageItem<GalleryPhoto[]>(STORAGE_KEYS.gallery, []),
    },
  };

  const json = JSON.stringify(backup, null, 2);

  const blob = new Blob([json], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;

  link.download = `my-lamando-backup-${new Date()
    .toISOString()
    .slice(0, 10)}.json`;

  document.body.appendChild(link);

  link.click();

  link.remove();

  URL.revokeObjectURL(url);
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isValidBackup(value: unknown): value is LamandoBackup {
  if (!isObject(value)) {
    return false;
  }

  if (value.version !== 1) {
    return false;
  }

  if (!isObject(value.data)) {
    return false;
  }

  return (
    Array.isArray(value.data.car) &&
    Array.isArray(value.data.fuel) &&
    Array.isArray(value.data.expenses) &&
    Array.isArray(value.data.services) &&
    Array.isArray(value.data.gallery) &&
    isObject(value.data.settings)
  );
}

export async function importApplicationData(file: File): Promise<void> {
  const text = await file.text();

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("Invalid JSON file.");
  }

  if (!isValidBackup(parsed)) {
    throw new Error("Invalid My Lamando backup file.");
  }

  setStorageItem(STORAGE_KEYS.car, parsed.data.car);

  setStorageItem(STORAGE_KEYS.fuel, parsed.data.fuel);

  setStorageItem(STORAGE_KEYS.expenses, parsed.data.expenses);

  setStorageItem(STORAGE_KEYS.service, parsed.data.services);

  setStorageItem(STORAGE_KEYS.gallery, parsed.data.gallery);
}

export function clearAllData(): void {
  STORAGE_DATA_KEYS.forEach((key) => {
    removeStorageItem(key);
  });
}

export function resetApplication(): void {
  clearAllData();
}
