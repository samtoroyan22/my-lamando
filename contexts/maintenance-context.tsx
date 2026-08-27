"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import type { MaintenanceItem } from "@/types/service";

import {
  getMaintenanceItems,
  addMaintenanceItem,
  updateMaintenanceItem,
  deleteMaintenanceItem,
} from "@/lib/storage/maintenance-storage";

interface MaintenanceContextValue {
  maintenanceItems: MaintenanceItem[];

  addMaintenanceEntry: (entry: MaintenanceItem) => void;

  updateMaintenanceEntry: (entry: MaintenanceItem) => void;

  deleteMaintenanceEntry: (id: string) => void;
}

const MaintenanceContext = createContext<MaintenanceContextValue | undefined>(
  undefined,
);

export function MaintenanceProvider({ children }: { children: ReactNode }) {
  const [maintenanceItems, setMaintenanceItems] = useState<MaintenanceItem[]>(
    [],
  );

  useEffect(() => {
    const storedItems = getMaintenanceItems();

    startTransition(() => {
      setMaintenanceItems(storedItems);
    });
  }, []);

  const addMaintenanceEntry = (entry: MaintenanceItem) => {
    setMaintenanceItems((currentItems) => [...currentItems, entry]);

    addMaintenanceItem(entry);
  };

  const updateMaintenanceEntry = (updatedEntry: MaintenanceItem) => {
    setMaintenanceItems((currentItems) =>
      currentItems.map((item) =>
        item.id === updatedEntry.id ? updatedEntry : item,
      ),
    );

    updateMaintenanceItem(updatedEntry);
  };

  const deleteMaintenanceEntry = (id: string) => {
    setMaintenanceItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );

    deleteMaintenanceItem(id);
  };

  return (
    <MaintenanceContext.Provider
      value={{
        maintenanceItems,
        addMaintenanceEntry,
        updateMaintenanceEntry,
        deleteMaintenanceEntry,
      }}
    >
      {children}
    </MaintenanceContext.Provider>
  );
}

export function useMaintenance() {
  const context = useContext(MaintenanceContext);

  if (!context) {
    throw new Error("useMaintenance must be used within a MaintenanceProvider");
  }

  return context;
}
