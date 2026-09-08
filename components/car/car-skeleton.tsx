import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const InfoItemSkeleton = () => (
  <div className="rounded-xl border border-border/60 bg-muted/30 p-4">
    <div className="flex items-center gap-2">
      <SkeletonBlock className="size-8 shrink-0 rounded-full" />
      <SkeletonBlock className="h-4 w-20" />
    </div>
    <SkeletonBlock className="mt-2 h-5 w-28" />
  </div>
);

const CarSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden border-border/60">
        <CardContent>
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <SkeletonBlock className="h-9 w-56 sm:h-10 sm:w-72" />

              <div className="flex flex-wrap gap-2">
                <SkeletonBlock className="h-6 w-14 rounded-full" />
                <SkeletonBlock className="h-6 w-20 rounded-full" />
                <SkeletonBlock className="h-6 w-24 rounded-full" />
              </div>
            </div>

            <div className="space-y-2 sm:text-right">
              <SkeletonBlock className="ml-auto h-4 w-28" />
              <SkeletonBlock className="ml-auto h-9 w-36 sm:h-10" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Technical specifications */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="size-4 rounded-full" />
            <SkeletonBlock className="h-5 w-48 sm:h-6 sm:w-52" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <InfoItemSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>

      {/* General information */}
      <Card className="border-border/60">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="size-4 rounded-full" />
            <SkeletonBlock className="h-5 w-44 sm:h-6 sm:w-48" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <InfoItemSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarSkeleton;
