import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const StatCardSkeleton = () => (
  <Card>
    <CardContent className="pt-6">
      <div className="flex items-center justify-between">
        <SkeletonBlock className="h-4 w-28" />
        <SkeletonBlock className="size-4 rounded" />
      </div>
      <div className="mt-4 space-y-2">
        <SkeletonBlock className="h-8 w-24" />
        <SkeletonBlock className="h-4 w-16" />
      </div>
    </CardContent>
  </Card>
);

const ChartSkeleton = () => (
  <Card className="overflow-hidden">
    <CardHeader className="flex flex-row items-start justify-between space-y-0">
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="size-4 rounded" />
          <SkeletonBlock className="h-5 w-40" />
        </div>
        <SkeletonBlock className="h-4 w-56" />
      </div>
      <div className="space-y-1 text-right">
        <SkeletonBlock className="h-3 w-14 ml-auto" />
        <SkeletonBlock className="h-6 w-20 ml-auto" />
      </div>
    </CardHeader>
    <CardContent>
      <SkeletonBlock className="h-80 w-full rounded-lg" />
    </CardContent>
  </Card>
);

const ActivityItemSkeleton = () => (
  <div className="flex items-center gap-3 py-4">
    <SkeletonBlock className="size-9 rounded-lg" />
    <div className="min-w-0 flex-1 space-y-2">
      <SkeletonBlock className="h-4 w-40" />
      <SkeletonBlock className="h-3 w-28" />
    </div>
    <SkeletonBlock className="h-4 w-16" />
  </div>
);

const DashboardSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-2xl border bg-card">
        <div className="relative min-h-70 sm:min-h-85">
          {/* Background */}
          <div className="absolute inset-0 bg-muted" />

          {/* Overlay gradient simulation */}
          <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-transparent" />

          {/* Content */}
          <div className="relative z-10 flex min-h-70 flex-col justify-end p-6 sm:min-h-85 sm:p-8">
            <SkeletonBlock className="mb-3 h-4 w-28" />
            <SkeletonBlock className="h-10 w-64 sm:h-12 sm:w-80" />

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <SkeletonBlock className="h-4 w-12" />
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-4 w-16" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      {/* Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <ChartSkeleton />
        <ChartSkeleton />
      </div>

      {/* Recent Activity + Next Service */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <SkeletonBlock className="h-6 w-36" />
            <SkeletonBlock className="h-8 w-20 rounded-md" />
          </CardHeader>
          <CardContent>
            <div className="divide-y">
              {Array.from({ length: 5 }).map((_, i) => (
                <ActivityItemSkeleton key={i} />
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Service */}
        <Card className="h-full">
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="space-y-2">
              <SkeletonBlock className="h-6 w-32" />
              <SkeletonBlock className="h-4 w-40" />
            </div>
            <SkeletonBlock className="size-5 rounded" />
          </CardHeader>
          <CardContent>
            <div className="space-y-5 rounded-xl border p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  <SkeletonBlock className="size-10 rounded-lg" />
                  <div className="space-y-2">
                    <SkeletonBlock className="h-3 w-24" />
                    <SkeletonBlock className="h-6 w-40" />
                  </div>
                </div>
                <SkeletonBlock className="h-6 w-16 rounded-full" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <SkeletonBlock className="h-3 w-16" />
                  <SkeletonBlock className="h-6 w-24" />
                </div>
                <div className="space-y-2">
                  <SkeletonBlock className="h-3 w-20" />
                  <SkeletonBlock className="h-6 w-20" />
                </div>
              </div>

              <div className="flex justify-end">
                <SkeletonBlock className="h-8 w-28 rounded-md" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
