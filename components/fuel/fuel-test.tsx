"use client";

import type { FuelEntry } from "@/types/fuel";
import { useFuel } from "@/contexts/fuel-context";

const FuelTest = () => {
  const { fuelEntries, addFuelEntry, updateFuelEntry, deleteFuelEntry } =
    useFuel();

  const handleAddFuel = () => {
    const newEntry: FuelEntry = {
      id: crypto.randomUUID(),
      date: new Date().toISOString(),
      liters: 40,
      pricePerLiter: 60,
      totalCost: 2400,
      mileage: 38000,
      fuelType: "AI-95",
    };

    addFuelEntry(newEntry);
  };

  const handleUpdateFuel = (entry: FuelEntry) => {
    const updatedEntry: FuelEntry = {
      ...entry,
      liters: entry.liters + 1,
      totalCost: (entry.liters + 1) * entry.pricePerLiter,
    };

    updateFuelEntry(updatedEntry);
  };

  const handleDeleteFuel = (id: string) => {
    deleteFuelEntry(id);
  };

  return (
    <div>
      <h2>Fuel Test</h2>

      <p>Fuel entries: {fuelEntries.length}</p>

      <button onClick={handleAddFuel}>Add Test Fuel Entry</button>

      {fuelEntries.map((entry) => (
        <div key={entry.id}>
          <p>Date: {entry.date}</p>
          <p>Liters: {entry.liters}</p>
          <p>Price per liter: {entry.pricePerLiter}</p>
          <p>Total cost: {entry.totalCost}</p>
          <p>Mileage: {entry.mileage}</p>
          <p>Fuel type: {entry.fuelType}</p>

          <button onClick={() => handleUpdateFuel(entry)}>Update</button>

          <button onClick={() => handleDeleteFuel(entry.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default FuelTest;
