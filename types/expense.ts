export interface Expense {
  id: string;
  date: string;
  category: string;
  title: string;
  amount: number;
  mileage: number;
  note?: string;
}
