"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import { useFuel } from "@/contexts/fuel-context";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import FuelDialog from "@/components/fuel/fuel-dialog";

const FuelTable = () => {
  const { fuelEntries, deleteFuelEntry } = useFuel();

  if (fuelEntries.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-sm text-muted-foreground">No fuel records yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm text-muted-foreground">
          Fuel records: {fuelEntries.length}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Liters</TableHead>
            <TableHead>Price / L</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Mileage</TableHead>
            <TableHead>Fuel type</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="w-25 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {fuelEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                {format(new Date(entry.date), "dd.MM.yyyy")}
              </TableCell>

              <TableCell>{entry.liters.toFixed(2)} L</TableCell>

              <TableCell>{entry.pricePerLiter.toFixed(2)} ₽</TableCell>

              <TableCell>{entry.totalCost.toFixed(2)} ₽</TableCell>

              <TableCell>{entry.mileage.toLocaleString("ru-RU")} km</TableCell>

              <TableCell>{entry.fuelType}</TableCell>

              <TableCell>{entry.note || "~"}</TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  <FuelDialog entry={entry} />

                  <Button
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={() => deleteFuelEntry(entry.id)}
                    aria-label="Delete fuel entry"
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default FuelTable;
