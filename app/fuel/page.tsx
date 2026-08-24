import FuelConsumption from "@/components/fuel/fuel-consumption";
import FuelPageHeader from "@/components/fuel/fuel-page-header";
import FuelStats from "@/components/fuel/fuel-stats";
import FuelTable from "@/components/fuel/fuel-table";

const Fuel = () => {
  return (
    <main className="space-y-8">
      <FuelPageHeader />

      <FuelStats />

      <FuelTable />

      <FuelConsumption />
    </main>
  );
};

export default Fuel;
