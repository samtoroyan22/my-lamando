import type { ServiceRecord } from "@/types/service";

import { initialServiceRecords } from "@/data/initial-data";
import { STORAGE_KEYS } from "./keys";
import { getStorageItem, setStorageItem } from "./storage";

// получение списка записей о сервисах из localStorage
export function getServiceRecords(): ServiceRecord[] {
  return getStorageItem<ServiceRecord[]>(
    STORAGE_KEYS.service,
    initialServiceRecords,
  );
}

// добавление новой записи о сервисе в localStorage
export function addServiceRecord(entry: ServiceRecord): void {
  const entries = getServiceRecords();

  setStorageItem(STORAGE_KEYS.service, [...entries, entry]);
}

// обновление существующей записи о сервисе в localStorage
export function updateServiceRecord(entry: ServiceRecord): void {
  const entries = getServiceRecords();

  const updatedEntries = entries.map((item) =>
    item.id === entry.id ? entry : item,
  );

  setStorageItem(STORAGE_KEYS.service, updatedEntries);
}

// удаление записи о сервисе из localStorage по идентификатору id
export function deleteServiceRecord(id: string): void {
  const entries = getServiceRecords();

  const filteredEntries = entries.filter((item) => item.id !== id);

  setStorageItem(STORAGE_KEYS.service, filteredEntries);
}
