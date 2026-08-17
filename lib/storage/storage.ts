// получение значения из localStorage по ключу key, если значение не найдено, возвращается fallback
export function getStorageItem<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") {
    return fallback;
  }

  try {
    const item = localStorage.getItem(key);

    if (!item) {
      return fallback;
    }

    return JSON.parse(item) as T;
  } catch {
    return fallback;
  }
}

// установка значения в localStorage с ключом key и значением value
export function setStorageItem<T>(key: string, value: T): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.setItem(key, JSON.stringify(value));
}

// удаление значения из localStorage по ключу key
export function removeStorageItem(key: string): void {
  if (typeof window === "undefined") {
    return;
  }

  localStorage.removeItem(key);
}
