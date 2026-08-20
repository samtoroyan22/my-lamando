"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { FuelEntry } from "@/types/fuel";

import {
  getFuelEntries,
  addFuelEntry as saveFuelEntry,
  updateFuelEntry as saveUpdatedFuelEntry,
  deleteFuelEntry as removeFuelEntry,
} from "@/lib/storage/fuel-storage";

interface FuelContextValue {
  fuelEntries: FuelEntry[];

  addFuelEntry: (entry: FuelEntry) => void;
  updateFuelEntry: (entry: FuelEntry) => void;
  deleteFuelEntry: (id: string) => void;
}

const FuelContext = createContext<FuelContextValue | undefined>(undefined);

export function FuelProvider({ children }: { children: ReactNode }) {
  const [fuelEntries, setFuelEntries] = useState<FuelEntry[]>([]);

  // загрузка данных из локального хранилища при монтировании компонента
  useEffect(() => {
    const storedEntries = getFuelEntries();

    startTransition(() => {
      setFuelEntries(storedEntries);
    });
  }, []);

  const addFuelEntry = (entry: FuelEntry) => {
    setFuelEntries((currentEntries) => [...currentEntries, entry]);

    saveFuelEntry(entry);
  };

  const updateFuelEntry = (updatedEntry: FuelEntry) => {
    setFuelEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );

    saveUpdatedFuelEntry(updatedEntry);
  };

  const deleteFuelEntry = (id: string) => {
    setFuelEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );

    removeFuelEntry(id);
  };

  return (
    <FuelContext.Provider
      value={{
        fuelEntries,
        addFuelEntry,
        updateFuelEntry,
        deleteFuelEntry,
      }}
    >
      {children}
    </FuelContext.Provider>
  );
}

export function useFuel() {
  const context = useContext(FuelContext);

  if (!context) {
    throw new Error("useFuel must be used within a FuelProvider");
  }

  return context;
}
