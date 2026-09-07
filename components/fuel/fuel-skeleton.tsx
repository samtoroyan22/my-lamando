import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="pb-2">
      <SkeletonBlock className="h-4 w-24" />
    </CardHeader>
    <CardContent>
      <SkeletonBlock className="h-8 w-28" />
    </CardContent>
  </Card>
);

const MetricCardSkeleton = () => (
  <div className="rounded-lg border bg-muted/30 p-4">
    <div className="flex items-center gap-2">
      <SkeletonBlock className="size-4 shrink-0" />
      <SkeletonBlock className="h-4 w-32" />
    </div>
    <SkeletonBlock className="mt-3 h-8 w-24" />
  </div>
);

const FuelSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <SkeletonBlock className="size-5 rounded-full" />
                <SkeletonBlock className="h-6 w-44" />
              </div>
              <SkeletonBlock className="h-4 w-72" />
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>

          <div className="mt-4 rounded-lg bg-muted/40 px-4 py-3">
            <SkeletonBlock className="h-3 w-full max-w-xl" />
            <SkeletonBlock className="mt-2 h-3 w-4/5 max-w-lg" />
          </div>
        </CardContent>
      </Card>

      <div className="overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b p-4">
          <SkeletonBlock className="h-4 w-36" />
        </div>

        <div className="w-full">
          <div className="grid grid-cols-8 gap-4 border-b px-4 py-3">
            <SkeletonBlock className="h-4 w-14" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-16 ml-auto" />
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-8 gap-4 border-b px-4 py-4 last:border-b-0"
            >
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-4 w-14" />
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-4 w-14" />
              <SkeletonBlock className="h-4 w-12" />
              <div className="flex justify-end gap-1">
                <SkeletonBlock className="size-8 rounded-md" />
                <SkeletonBlock className="size-8 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FuelSkeleton;
