"use client";

import { format } from "date-fns";
import { Wrench } from "lucide-react";
import { motion } from "motion/react";

import { useService } from "@/contexts/service-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ServiceDialog from "@/components/service/service-dialog";
import { ConfirmDialog } from "../shared/confirm-dialog";
import { toast } from "sonner";

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
      <Card className="border-border/60">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">
            Service history
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex min-h-55 flex-col items-center justify-center rounded-xl border border-dashed border-border/60 text-center">
            <div className="mb-3 flex size-12 items-center justify-center rounded-full bg-muted/50">
              <Wrench className="size-5 text-muted-foreground" />
            </div>
            <p className="font-medium">No service records yet</p>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Add your first maintenance record to start tracking service
              history.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-border/60">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">
          Service history
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          {serviceEntries.length}{" "}
          {serviceEntries.length === 1 ? "record" : "records"}
        </p>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="relative space-y-0">
          {/* Vertical line */}
          <div className="absolute left-3.75 top-2 bottom-2 w-px bg-border/70" />

          {sortedEntries.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.04,
                ease: "easeOut",
              }}
              className="group relative flex gap-5 pb-8 last:pb-0"
            >
              <div className="relative z-10 mt-1.5 flex size-7.75 shrink-0 items-center justify-center">
                <div className="size-3 rounded-full border-2 border-primary bg-background ring-4 ring-background transition-colors group-hover:bg-primary" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] font-semibold tracking-tight">
                        {entry.title}
                      </h3>
                      {entry.serviceName && (
                        <span className="rounded-md bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                          {entry.serviceName}
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
                      <time dateTime={entry.date}>
                        {format(new Date(entry.date), "d MMMM yyyy")}
                      </time>
                      <span>•</span>
                      <span className="tabular-nums">
                        {formatNumber(entry.mileage)} km
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <p className="text-base font-semibold tabular-nums">
                      {formatMoney(entry.cost)}
                    </p>

                    <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover:opacity-100">
                      <ServiceDialog entry={entry} />
                      <ConfirmDialog
                        title="Delete service entry?"
                        description="This action cannot be undone."
                        onConfirm={() => {
                          deleteServiceEntry(entry.id);
                          toast.success("Service entry deleted");
                        }}
                      />
                    </div>
                  </div>
                </div>

                {entry.works.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.works.map((work, i) => (
                      <span
                        key={`${entry.id}-${i}`}
                        className="rounded-full border border-border/60 bg-muted/40 px-2.5 py-0.5 text-xs text-muted-foreground"
                      >
                        {work}
                      </span>
                    ))}
                  </div>
                )}

                {entry.comment && (
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {entry.comment}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ServiceHistory;
