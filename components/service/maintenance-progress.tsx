"use client";

type MaintenanceProgressProps = {
  progress: number;
  remainingKm?: number;
  intervalKm?: number;
  isOverdue: boolean;
};

const formatNumber = (value: number) =>
  new Intl.NumberFormat("ru-RU").format(value);

const getBarColor = (progress: number, isOverdue: boolean) => {
  if (isOverdue || progress >= 100) return "bg-destructive";
  if (progress >= 85) return "bg-orange-500";
  if (progress >= 60) return "bg-amber-500";
  return "bg-emerald-500";
};

const MaintenanceProgress = ({
  progress,
  remainingKm,
  intervalKm,
  isOverdue,
}: MaintenanceProgressProps) => {
  const barColor = getBarColor(progress, isOverdue);

  return (
    <div className="min-w-0 w-full">
      <div
        className="relative h-7 w-full overflow-hidden rounded-full bg-muted/80 dark:bg-white/10"
        role="progressbar"
        aria-valuenow={Math.round(progress)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Maintenance progress"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

        <div
          className={`absolute inset-y-0 left-0 flex items-center justify-center overflow-hidden rounded-full transition-[width] duration-700 ease-out ${barColor}`}
          style={{
            width: `${Math.max(progress, progress > 0 ? 14 : 0)}%`,
          }}
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              backgroundImage:
                "repeating-linear-gradient(-45deg, transparent 0px, transparent 5px, rgba(255,255,255,0.16) 5px, rgba(255,255,255,0.16) 9px)",
            }}
          />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-white/10" />

          {progress >= 22 && (
            <span className="relative z-10 px-2 text-[11px] font-semibold text-white drop-shadow-sm">
              {isOverdue || progress >= 100
                ? "Done"
                : `${Math.round(progress)}%`}
            </span>
          )}
        </div>

        {progress > 0 && progress < 22 && (
          <span className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold text-foreground/70">
            {Math.round(progress)}%
          </span>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between gap-4">
        <span className="truncate text-[11px] text-muted-foreground">
          {remainingKm !== undefined
            ? remainingKm >= 0
              ? `${formatNumber(remainingKm)} km remaining`
              : `${formatNumber(Math.abs(remainingKm))} km overdue`
            : "Mileage not available"}
        </span>

        <span className="shrink-0 text-[11px] text-muted-foreground">
          {intervalKm ? `Every ${formatNumber(intervalKm)} km` : ""}
        </span>
      </div>
    </div>
  );
};

export default MaintenanceProgress;
