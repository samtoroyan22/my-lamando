"use client";

import {
  CarFront,
  CalendarDays,
  Gauge,
  Palette,
  Settings2,
  Zap,
  Hash,
} from "lucide-react";
import { motion } from "motion/react";

import { useCar } from "@/contexts/car-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import InfoItem from "./car-info-item";
import CarSkeleton from "./car-skeleton";

const CarInfo = () => {
  const { car, isLoading } = useCar();

  if (isLoading) {
    return <CarSkeleton />;
  }

  const formattedMileage = new Intl.NumberFormat("ru-RU").format(car.mileage);

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      >
        <Card className="overflow-hidden border-border/60">
          <CardContent>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <h2 className="text-3xl font-semibold tracking-tight sm:text-[2.5rem] sm:leading-tight">
                    {car.brand} {car.model}
                  </h2>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary" className="text-sm">
                      {car.year}
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                      {car.engine.type}
                    </Badge>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">
                    Current mileage
                  </p>
                  <p className="mt-1 text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                    {formattedMileage}
                    <span className="ml-1.5 text-base font-normal text-muted-foreground">
                      km
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <InfoItem
                  icon={
                    <span className="flex size-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                      <CarFront className="size-4" />
                    </span>
                  }
                  label="Engine"
                  value={car.engine.type}
                />
                <InfoItem
                  icon={
                    <span className="flex size-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                      <Zap className="size-4" />
                    </span>
                  }
                  label="Power"
                  value={`${car.engine.power} HP`}
                />
                <InfoItem
                  icon={
                    <span className="flex size-8 items-center justify-center rounded-full bg-sky-500/10 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400">
                      <Settings2 className="size-4" />
                    </span>
                  }
                  label="Transmission"
                  value={car.transmission}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* General information */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.05, ease: "easeOut" }}
      >
        <Card className="border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold sm:text-lg">
              <CarFront
                className="size-4 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              General information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Gauge className="size-4" />
                  </span>
                }
                label="Mileage"
                value={`${formattedMileage} km`}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CalendarDays className="size-4" />
                  </span>
                }
                label="Year"
                value={String(car.year)}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Palette className="size-4" />
                  </span>
                }
                label="Color"
                value={car.color || "Not specified"}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CalendarDays className="size-4" />
                  </span>
                }
                label="Purchase date"
                value={car.purchaseDate || "Not specified"}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Technical information */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.1, ease: "easeOut" }}
      >
        <Card className="border-border/60">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-base font-semibold sm:text-lg">
              <Settings2
                className="size-4 text-sky-600 dark:text-sky-400"
                aria-hidden="true"
              />
              Technical information
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <CarFront className="size-4" />
                  </span>
                }
                label="Engine"
                value={car.engine.type}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Zap className="size-4" />
                  </span>
                }
                label="Displacement"
                value={`${car.engine.displacement} L`}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Zap className="size-4" />
                  </span>
                }
                label="Power"
                value={`${car.engine.power} HP`}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Settings2 className="size-4" />
                  </span>
                }
                label="Transmission"
                value={car.transmission}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Palette className="size-4" />
                  </span>
                }
                label="Color"
                value={car.color || "Not specified"}
              />
              <InfoItem
                icon={
                  <span className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <Hash className="size-4" />
                  </span>
                }
                label="VIN"
                value={car.vin || "Not specified"}
                mono={Boolean(car.vin)}
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CarInfo;
