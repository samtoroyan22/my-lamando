import type { Car } from "@/types/car";
import type { FuelEntry } from "@/types/fuel";
import type { Expense } from "@/types/expense";
import type { ServiceRecord } from "@/types/service";
import type { GalleryPhoto } from "@/types/gallery";

export const initialCar: Car = {
  id: "021532",
  brand: "Volkswagen",
  model: "Lamando L",
  year: 2023,
  engine: {
    type: "1.4 TSI",
    displacement: 1.4,
    power: 150,
  },
  transmission: "7-speed DSG DQ200",
  mileage: 38000,
  vin: "021532",
  color: "White",
  purchaseDate: "06.07.2026",
};

export const initialFuelEntries: FuelEntry[] = [];

export const initialExpenses: Expense[] = [];

export const initialServiceRecords: ServiceRecord[] = [];

export const initialGalleryPhotos: GalleryPhoto[] = [];
