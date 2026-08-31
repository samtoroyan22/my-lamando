"use client";

import Image from "next/image";

import { useCar } from "@/contexts/car-context";
import { useGallery } from "@/contexts/gallery-context";

const DashboardHero = () => {
  const { car } = useCar();
  const { galleryEntries } = useGallery();

  const heroPhoto =
    galleryEntries.find(
      (photo) => photo.category === "Exterior" && Boolean(photo.src),
    ) ?? galleryEntries.find((photo) => Boolean(photo.src));

  return (
    <section className="relative overflow-hidden rounded-2xl border bg-card">
      <div className="relative min-h-70 sm:min-h-85">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.title ?? `${car.brand} ${car.model}`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-black/10" />

        <div className="relative z-10 flex min-h-70 flex-col justify-end p-6 sm:min-h-85 sm:p-8">
          <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-white/70">
            My Lamando
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-white sm:text-5xl">
            {car.brand} {car.model}
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/80">
            <span>{car.year}</span>
            <span className="text-white/40">•</span>
            <span>{car.engine.type}</span>
            <span className="text-white/40">•</span>
            <span>{car.engine.power} HP</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
