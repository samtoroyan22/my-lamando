import ServicePageHeader from "@/components/service/service-page-header";
import ServiceStats from "@/components/service/service-stats";
import ServiceTable from "@/components/service/service-table";

const Service = () => {
  return (
    <main className="space-y-8">
      <ServicePageHeader />

      <ServiceTable />

      <ServiceStats />
    </main>
  );
};

export default Service;
