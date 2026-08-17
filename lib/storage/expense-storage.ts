import type { Expense } from "@/types/expense";

import { initialExpenses } from "@/data/initial-data";
import { STORAGE_KEYS } from "./keys";
import { getStorageItem, setStorageItem } from "./storage";

// получение списка записей о расходах из localStorage
export function getExpenses(): Expense[] {
  return getStorageItem<Expense[]>(STORAGE_KEYS.expenses, initialExpenses);
}

// добавление новой записи о расходе в localStorage
export function addExpense(entry: Expense): void {
  const entries = getExpenses();

  setStorageItem(STORAGE_KEYS.expenses, [...entries, entry]);
}

// обновление существующей записи о расходе в localStorage
export function updateExpense(entry: Expense): void {
  const entries = getExpenses();

  const updatedEntries = entries.map((item) =>
    item.id === entry.id ? entry : item,
  );

  setStorageItem(STORAGE_KEYS.expenses, updatedEntries);
}

// удаление записи о расходе из localStorage по идентификатору id
export function deleteExpense(id: string): void {
  const entries = getExpenses();

  const filteredEntries = entries.filter((item) => item.id !== id);

  setStorageItem(STORAGE_KEYS.expenses, filteredEntries);
}
