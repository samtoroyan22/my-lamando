"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

import {
  getServiceRecords,
  addServiceRecord as saveService,
  updateServiceRecord as saveUpdatedService,
  deleteServiceRecord as removeService,
} from "@/lib/storage/service-storage";

import { ServiceRecord } from "@/types/service";

interface ServiceContextValue {
  serviceEntries: ServiceRecord[];
  isLoading: boolean;
  addServiceEntry: (entry: ServiceRecord) => void;
  updateServiceEntry: (entry: ServiceRecord) => void;
  deleteServiceEntry: (id: string) => void;
}

const ServiceContext = createContext<ServiceContextValue | undefined>(
  undefined,
);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [serviceEntries, setServiceEntries] = useState<ServiceRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const startedAt = Date.now();

    const storedEntries = getServiceRecords();

    const elapsed = Date.now() - startedAt;
    const remainingDelay = Math.max(500 - elapsed, 0);

    const timeoutId = setTimeout(() => {
      startTransition(() => {
        setServiceEntries(storedEntries);
        setIsLoading(false);
      });
    }, remainingDelay);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const addServiceEntry = (entry: ServiceRecord) => {
    setServiceEntries((currentEntries) => [...currentEntries, entry]);
    saveService(entry);
  };

  const updateServiceEntry = (updatedEntry: ServiceRecord) => {
    setServiceEntries((currentEntries) =>
      currentEntries.map((entry) =>
        entry.id === updatedEntry.id ? updatedEntry : entry,
      ),
    );
    saveUpdatedService(updatedEntry);
  };

  const deleteServiceEntry = (id: string) => {
    setServiceEntries((currentEntries) =>
      currentEntries.filter((entry) => entry.id !== id),
    );
    removeService(id);
  };

  return (
    <ServiceContext.Provider
      value={{
        serviceEntries,
        isLoading,
        addServiceEntry,
        updateServiceEntry,
        deleteServiceEntry,
      }}
    >
      {children}
    </ServiceContext.Provider>
  );
}

export function useService() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw new Error("useService must be used within a ServiceProvider");
  }

  return context;
}
