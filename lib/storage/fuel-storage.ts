import type { FuelEntry } from "@/types/fuel";

import { initialFuelEntries } from "@/data/initial-data";
import { STORAGE_KEYS } from "./keys";
import { getStorageItem, setStorageItem } from "./storage";

// получение списка записей о заправках из localStorage
export function getFuelEntries(): FuelEntry[] {
  return getStorageItem<FuelEntry[]>(STORAGE_KEYS.fuel, initialFuelEntries);
}

// добавление новой записи о заправке в localStorage
export function addFuelEntry(entry: FuelEntry): void {
  const entries = getFuelEntries();

  setStorageItem(STORAGE_KEYS.fuel, [...entries, entry]);
}

// обновление существующей записи о заправке в localStorage
export function updateFuelEntry(entry: FuelEntry): void {
  const entries = getFuelEntries();

  const updatedEntries = entries.map((item) =>
    item.id === entry.id ? entry : item,
  );

  setStorageItem(STORAGE_KEYS.fuel, updatedEntries);
}

// удаление записи о заправке из localStorage по идентификатору id
export function deleteFuelEntry(id: string): void {
  const entries = getFuelEntries();

  const filteredEntries = entries.filter((item) => item.id !== id);

  setStorageItem(STORAGE_KEYS.fuel, filteredEntries);
}
