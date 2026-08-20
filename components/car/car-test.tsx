"use client";

import { useCar } from "@/contexts/car-context";

const CarTest = () => {
  const { car, updateCar } = useCar();

  const handleIncreaseMileage = () => {
    const updatedCar = { ...car, mileage: car.mileage + 1 };
    updateCar(updatedCar);
  };

  return (
    <div>
      <h2>Car Test</h2>
      <p>Brand: {car.brand}</p>
      <p>Model: {car.model}</p>
      <p>Year: {car.year}</p>
      <p>Mileage: {car.mileage}</p>
      <p>Engine Type: {car.engine.type}</p>
      <p>Engine Power: {car.engine.power}</p>
      <p>Transmission: {car.transmission}</p>
      <button onClick={handleIncreaseMileage}>Increase Mileage</button>
    </div>
  );
};

export default CarTest;
