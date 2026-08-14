export interface ServiceRecord {
  id: string;
  date: string;
  type: string;
  description: string;
  cost: number;
  mileage: number;
  service: string;
  note?: string;
}
