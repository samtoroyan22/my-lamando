"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { Car } from "@/types/car";

import { initialCar } from "@/data/initial-data";
import { getCar, updateCar as saveCar } from "@/lib/storage/car-storage";

interface CarContextValue {
  car: Car;
  updateCar: (car: Car) => void;
}

const CarContext = createContext<CarContextValue | undefined>(undefined);

export function CarProvider({ children }: { children: ReactNode }) {
  const [car, setCar] = useState<Car>(initialCar);

  useEffect(() => {
    const storedCar = getCar();

    startTransition(() => {
      setCar(storedCar);
    });
  }, []);

  const updateCar = (updatedCar: Car) => {
    setCar(updatedCar);
    saveCar(updatedCar);
  };

  return (
    <CarContext.Provider
      value={{
        car,
        updateCar,
      }}
    >
      {children}
    </CarContext.Provider>
  );
}

export function useCar() {
  const context = useContext(CarContext);

  if (!context) {
    throw new Error("useCar must be used within a CarProvider");
  }

  return context;
}
