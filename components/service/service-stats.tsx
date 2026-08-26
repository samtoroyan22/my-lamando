"use client";

import { Wrench, Wallet, ClipboardList } from "lucide-react";

import { useService } from "@/contexts/service-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ServiceStats = () => {
  const { serviceEntries } = useService();

  const totalSpent = serviceEntries.reduce((sum, entry) => sum + entry.cost, 0);

  const averageCost =
    serviceEntries.length > 0 ? totalSpent / serviceEntries.length : 0;

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total spent
          </CardTitle>

          <Wallet className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{totalSpent.toFixed(2)} ₽</p>

          <p className="mt-1 text-xs text-muted-foreground">
            All service expenses
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Service records
          </CardTitle>

          <ClipboardList className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{serviceEntries.length}</p>

          <p className="mt-1 text-xs text-muted-foreground">Total records</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Average cost
          </CardTitle>

          <Wrench className="size-4 text-muted-foreground" />
        </CardHeader>

        <CardContent>
          <p className="text-2xl font-semibold">{averageCost.toFixed(2)} ₽</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Per service record
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceStats;
