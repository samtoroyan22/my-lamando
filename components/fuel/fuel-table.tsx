"use client";

import { format } from "date-fns";
import { useFuel } from "@/contexts/fuel-context";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import FuelDialog from "@/components/fuel/fuel-dialog";
import { toast } from "sonner";
import { ConfirmDialog } from "../shared/confirm-dialog";

const FuelTable = () => {
  const { fuelEntries, deleteFuelEntry } = useFuel();

  if (fuelEntries.length === 0) {
    return (
      <div className="flex min-h-45 items-center justify-center rounded-xl border border-dashed border-border/60">
        <p className="text-sm text-muted-foreground">No fuel records yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-border/60">
      <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
        <p className="text-sm text-muted-foreground">
          Fuel records:{" "}
          <span className="font-medium text-foreground">
            {fuelEntries.length}
          </span>
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-27.5">Date</TableHead>
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
              <TableRow key={entry.id} className="group">
                <TableCell className="font-medium tabular-nums">
                  {format(new Date(entry.date), "dd.MM.yyyy")}
                </TableCell>

                <TableCell className="tabular-nums">
                  {entry.liters.toFixed(2)} L
                </TableCell>

                <TableCell className="tabular-nums">
                  {entry.pricePerLiter.toFixed(2)} ₽
                </TableCell>

                <TableCell className="tabular-nums font-medium">
                  {entry.totalCost.toFixed(2)} ₽
                </TableCell>

                <TableCell className="tabular-nums">
                  {entry.mileage.toLocaleString("ru-RU")} km
                </TableCell>

                <TableCell>
                  <span className="inline-flex rounded-md bg-muted/60 px-2 py-0.5 text-xs font-medium">
                    {entry.fuelType}
                  </span>
                </TableCell>

                <TableCell className="max-w-40 truncate text-muted-foreground">
                  {entry.note || "~"}
                </TableCell>

                <TableCell>
                  <div className="flex justify-end gap-1 opacity-70 transition-opacity group-hover:opacity-100">
                    <FuelDialog entry={entry} />
                    <ConfirmDialog
                      title="Delete fuel entry?"
                      description="This action cannot be undone."
                      onConfirm={() => {
                        deleteFuelEntry(entry.id);
                        toast.success("Fuel entry deleted");
                      }}
                    />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FuelTable;
