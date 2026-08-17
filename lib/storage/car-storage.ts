import type { Car } from "@/types/car";

import { initialCar } from "@/data/initial-data";
import { STORAGE_KEYS } from "./keys";
import { getStorageItem, setStorageItem } from "./storage";

export function getCar(): Car {
  return getStorageItem<Car>(STORAGE_KEYS.car, initialCar);
}

export function updateCar(car: Car): void {
  setStorageItem(STORAGE_KEYS.car, car);
}
