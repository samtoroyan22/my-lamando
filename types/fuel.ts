export interface FuelEntry {
  id: string;
  date: string;
  liters: number;
  pricePerLiter: number;
  totalCost: number;
  mileage: number;
  fuelType: string;
  note?: string;
}
