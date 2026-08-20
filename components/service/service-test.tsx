"use client";

import { useService } from "@/contexts/service-context";
import { ServiceRecord } from "@/types/service";

const ServiceTest = () => {
  const {
    serviceEntries,
    addServiceEntry,
    updateServiceEntry,
    deleteServiceEntry,
  } = useService();

  const handleAddService = () => {
    const newEntry: ServiceRecord = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      type: "Maintenance",
      description: "Oil Change",
      cost: 100,
      mileage: 38000,
      service: "Oil Change",
      note: "Changed oil and filter",
    };

    addServiceEntry(newEntry);
  };

  const handleUpdateService = (entry: ServiceRecord) => {
    const updatedEntry: ServiceRecord = {
      ...entry,
      cost: entry.cost + 100,
    };

    updateServiceEntry(updatedEntry);
  };

  const handleDeleteService = (id: string) => {
    deleteServiceEntry(id);
  };

  return (
    <div>
      <h2>Service Test</h2>

      <p>Service entries: {serviceEntries.length}</p>

      <button onClick={handleAddService}>Add Test Service Entry</button>

      {serviceEntries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Type: {entry.type}</p>
          <p>Description: {entry.description}</p>
          <p>Cost: {entry.cost}</p>
          <p>Mileage: {entry.mileage}</p>
          <p>Note: {entry.note}</p>

          <button onClick={() => handleUpdateService(entry)}>Update</button>

          <button onClick={() => handleDeleteService(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ServiceTest;
