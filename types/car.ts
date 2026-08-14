export interface Car {
  id: string;
  brand: string;
  model: string;
  year: number;
  engine: Engine;
  transmission: string;
  mileage: number;
  vin: string;
  color: string;
  purchaseDate: string;
}

export interface Engine {
  type: string;
  displacement: number;
  power: number;
}
