"use client";

import { format } from "date-fns";
import { Trash2 } from "lucide-react";

import { useService } from "@/contexts/service-context";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import ServiceDialog from "@/components/service/service-dialog";

const ServiceTable = () => {
  const { serviceEntries, deleteServiceEntry } = useService();

  if (serviceEntries.length === 0) {
    return (
      <div className="rounded-lg border p-8 text-center">
        <p className="text-sm text-muted-foreground">No service records yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="flex items-center justify-between border-b p-4">
        <p className="text-sm text-muted-foreground">
          Service records: {serviceEntries.length}
        </p>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>Mileage</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Note</TableHead>
            <TableHead className="w-25 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {serviceEntries.map((entry) => (
            <TableRow key={entry.id}>
              <TableCell>
                {format(new Date(entry.date), "dd.MM.yyyy")}
              </TableCell>

              <TableCell>{entry.type}</TableCell>

              <TableCell>{entry.description}</TableCell>

              <TableCell>{entry.cost.toFixed(2)} ₽</TableCell>

              <TableCell>{entry.mileage.toLocaleString("ru-RU")} km</TableCell>

              <TableCell>{entry.service}</TableCell>

              <TableCell>{entry.note || "~"}</TableCell>

              <TableCell>
                <div className="flex justify-end gap-1">
                  <ServiceDialog entry={entry} />

                  <Button
                    type="button"
                    variant="link"
                    size="icon"
                    onClick={() => deleteServiceEntry(entry.id)}
                    aria-label="Delete service entry"
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

export default ServiceTable;
