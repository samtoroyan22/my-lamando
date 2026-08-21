import CarEditForm from "@/components/car/car-edit-form";
import CarInfo from "@/components/car/car-info";

const Car = () => {
  return (
    <main className="space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">Vehicle</p>

          <h1 className="text-3xl font-semibold tracking-tight">My Car</h1>

          <p className="text-muted-foreground">
            Your vehicle information and specifications.
          </p>
        </div>

        <CarEditForm />
      </header>

      <CarInfo />
    </main>
  );
};

export default Car;
