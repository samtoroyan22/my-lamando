import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const OverviewCardSkeleton = () => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <SkeletonBlock className="h-4 w-24" />
      <SkeletonBlock className="size-4 rounded" />
    </CardHeader>
    <CardContent className="space-y-2">
      <SkeletonBlock className="h-7 w-32" />
      <SkeletonBlock className="h-4 w-20" />
    </CardContent>
  </Card>
);

const MaintenanceItemSkeleton = () => (
  <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
    <div className="flex min-w-0 items-start gap-3">
      <SkeletonBlock className="size-9 rounded-md" />
      <div className="space-y-2">
        <SkeletonBlock className="h-5 w-40" />
        <SkeletonBlock className="h-4 w-28" />
      </div>
    </div>

    <div className="flex items-center gap-6">
      <div className="space-y-1.5">
        <SkeletonBlock className="h-3 w-16" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
      <div className="space-y-1.5">
        <SkeletonBlock className="h-3 w-10" />
        <SkeletonBlock className="h-4 w-20" />
      </div>
      <div className="space-y-1.5 min-w-24">
        <SkeletonBlock className="h-4 w-16 ml-auto" />
        <SkeletonBlock className="h-3 w-20 ml-auto" />
      </div>
    </div>
  </div>
);

const HistoryItemSkeleton = () => (
  <div className="rounded-xl border p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div className="space-y-3 min-w-0 flex-1">
        <SkeletonBlock className="h-5 w-48" />
        <div className="flex flex-wrap gap-4">
          <SkeletonBlock className="h-4 w-20" />
          <SkeletonBlock className="h-4 w-24" />
          <SkeletonBlock className="h-4 w-28" />
        </div>
        <div className="space-y-1.5">
          <SkeletonBlock className="h-4 w-56" />
          <SkeletonBlock className="h-4 w-40" />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 sm:flex-col sm:items-end">
        <SkeletonBlock className="h-7 w-24" />
        <div className="flex gap-1">
          <SkeletonBlock className="size-8 rounded-md" />
          <SkeletonBlock className="size-8 rounded-md" />
        </div>
      </div>
    </div>
  </div>
);

const ServiceSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* ServiceOverview */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
        <OverviewCardSkeleton />
      </div>

      {/* MaintenanceSchedule */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-6 w-52" />
          <SkeletonBlock className="mt-2 h-4 w-80" />
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <MaintenanceItemSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ServiceHistory */}
      <Card>
        <CardHeader>
          <SkeletonBlock className="h-6 w-40" />
          <SkeletonBlock className="mt-2 h-4 w-32" />
        </CardHeader>

        <CardContent className="space-y-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <HistoryItemSkeleton key={i} />
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceSkeleton;
