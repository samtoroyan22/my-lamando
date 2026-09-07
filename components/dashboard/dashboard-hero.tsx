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
    <section className="relative overflow-hidden rounded-2xl border border-border/60 bg-card">
      <div className="relative min-h-70 sm:min-h-85">
        {heroPhoto ? (
          <Image
            src={heroPhoto.src}
            alt={heroPhoto.title ?? `${car.brand} ${car.model}`}
            fill
            unoptimized
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 1200px"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-muted" />
        )}

        <div className="absolute inset-0 bg-linear-to-r from-black/75 via-black/40 to-transparent" />

        <div className="relative z-10 flex h-full min-h-70 flex-col justify-end p-6 sm:min-h-85 sm:p-8">
          <p className="mb-1.5 text-xs font-medium uppercase tracking-[0.18em] text-white/70">
            My Lamando
          </p>

          <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-5xl">
            {car.brand} {car.model}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-white/80">
            <span>{car.year}</span>
            <span className="text-white/30">•</span>
            <span>{car.engine.type}</span>
            <span className="text-white/30">•</span>
            <span>{car.engine.power} HP</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardHero;
