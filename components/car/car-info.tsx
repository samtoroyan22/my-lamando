"use client";

import {
  CarFront,
  CalendarDays,
  Gauge,
  Palette,
  Settings2,
  Zap,
} from "lucide-react";

import { useCar } from "@/contexts/car-context";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const CarInfo = () => {
  const { car } = useCar();

  const formattedMileage = new Intl.NumberFormat("ru-RU").format(car.mileage);

  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div className="absolute inset-0 from-muted/80 via-background to-background" />

            <div className="relative flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <CarFront className="size-5 text-muted-foreground" />

                    <span className="text-sm text-muted-foreground">
                      My vehicle
                    </span>
                  </div>

                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {car.brand} {car.model}
                  </h1>

                  <div className="flex flex-wrap items-center gap-2">
                    <Badge variant="secondary">{car.year}</Badge>

                    <Badge variant="outline">{car.engine.type}</Badge>

                    <Badge variant="outline">{car.transmission}</Badge>
                  </div>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">
                    Current mileage
                  </p>

                  <p className="text-3xl font-semibold tracking-tight">
                    {formattedMileage}
                    <span className="ml-1 text-base font-normal text-muted-foreground">
                      km
                    </span>
                  </p>
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-3">
                <div className="rounded-xl border bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">Engine</p>

                  <p className="mt-1 font-medium">{car.engine.type}</p>
                </div>

                <div className="rounded-xl border bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">Power</p>

                  <p className="mt-1 font-medium">{car.engine.power} HP</p>
                </div>

                <div className="rounded-xl border bg-background/60 p-4">
                  <p className="text-sm text-muted-foreground">Transmission</p>

                  <p className="mt-1 font-medium">{car.transmission}</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CarFront className="size-5" />
            General information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <InfoItem
              icon={<Gauge className="size-4" />}
              label="Mileage"
              value={`${formattedMileage} km`}
            />

            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="Year"
              value={String(car.year)}
            />

            <InfoItem
              icon={<Palette className="size-4" />}
              label="Color"
              value={car.color || "Not specified"}
            />

            <InfoItem
              icon={<CalendarDays className="size-4" />}
              label="Purchase date"
              value={car.purchaseDate || "Not specified"}
            />
          </div>
        </CardContent>
      </Card>

      {/* Technical information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings2 className="size-5" />
            Technical information
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <InfoItem
              icon={<CarFront className="size-4" />}
              label="Engine"
              value={car.engine.type}
            />

            <InfoItem
              icon={<Zap className="size-4" />}
              label="Displacement"
              value={`${car.engine.displacement} L`}
            />

            <InfoItem
              icon={<Zap className="size-4" />}
              label="Power"
              value={`${car.engine.power} HP`}
            />

            <InfoItem
              icon={<Settings2 className="size-4" />}
              label="Transmission"
              value={car.transmission}
            />

            <InfoItem
              icon={<Palette className="size-4" />}
              label="Color"
              value={car.color || "Not specified"}
            />

            <InfoItem
              icon={<CarFront className="size-4" />}
              label="VIN"
              value={car.vin || "Not specified"}
              mono={Boolean(car.vin)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  mono?: boolean;
}

function InfoItem({ icon, label, value, mono = false }: InfoItemProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4 transition-colors hover:bg-muted/50">
      <div className="flex items-center gap-2 text-muted-foreground">
        {icon}

        <span className="text-sm">{label}</span>
      </div>

      <p className={`mt-2 font-medium ${mono ? "font-mono text-sm" : ""}`}>
        {value}
      </p>
    </div>
  );
}

export default CarInfo;
