import CarTest from "@/components/car/car-test";
import ExpenseTest from "@/components/expenses/expense-test";
import FuelTest from "@/components/fuel/fuel-test";
import GalleryTest from "@/components/gallery/gallery-test";
import ServiceTest from "@/components/service/service-test";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <CarTest />
      <FuelTest />
      <ExpenseTest />
      <ServiceTest />
      <GalleryTest />
    </div>
  );
};

export default Dashboard;
