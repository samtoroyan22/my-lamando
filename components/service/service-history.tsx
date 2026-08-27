"use client";

import { format } from "date-fns";
import { ChevronRight, Trash2 } from "lucide-react";

import { useService } from "@/contexts/service-context";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import ServiceDialog from "@/components/service/service-dialog";

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const formatMoney = (value: number) =>
  `${new Intl.NumberFormat("ru-RU", {
    maximumFractionDigits: 0,
  }).format(value)} ₽`;

const ServiceHistory = () => {
  const { serviceEntries, deleteServiceEntry } = useService();

  const sortedEntries = [...serviceEntries].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  if (sortedEntries.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Service history</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="rounded-lg border border-dashed p-8 text-center">
            <p className="text-sm text-muted-foreground">
              No service records yet.
            </p>

            <p className="mt-1 text-xs text-muted-foreground">
              Add your first maintenance record.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Service history</CardTitle>

        <p className="text-sm text-muted-foreground">
          {serviceEntries.length}{" "}
          {serviceEntries.length === 1 ? "service" : "services"} recorded
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        {sortedEntries.map((entry) => (
          <div
            key={entry.id}
            className="group rounded-xl border p-4 transition-colors hover:bg-muted/40"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0 space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-semibold">{entry.title}</p>
                </div>

                <div className="flex flex-wrap gap-x-5 gap-y-1 text-sm text-muted-foreground">
                  <span>{format(new Date(entry.date), "dd.MM.yyyy")}</span>

                  <span>{formatNumber(entry.mileage)} km</span>

                  {entry.serviceName && <span>{entry.serviceName}</span>}
                </div>

                {entry.works.length > 0 && (
                  <ul className="space-y-1 text-sm text-muted-foreground">
                    {entry.works.map((work, index) => (
                      <li key={`${entry.id}-${index}`}>• {work}</li>
                    ))}
                  </ul>
                )}

                {entry.comment && (
                  <p className="text-sm text-muted-foreground">
                    {entry.comment}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
                <p className="text-lg font-semibold">
                  {formatMoney(entry.cost)}
                </p>

                <div className="flex items-center gap-1">
                  <ServiceDialog entry={entry} />

                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="Delete service"
                    className="text-muted-foreground hover:text-destructive"
                    onClick={() => deleteServiceEntry(entry.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>

                  <ChevronRight className="hidden size-4 text-muted-foreground sm:block" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ServiceHistory;
