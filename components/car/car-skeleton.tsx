import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const InfoItemSkeleton = () => (
  <div className="rounded-xl border bg-muted/30 p-4">
    {/* icon + label в одной строке — как в реальном InfoItem */}
    <div className="flex items-center gap-2">
      <SkeletonBlock className="size-4 shrink-0" />
      <SkeletonBlock className="h-4 w-16" />
    </div>

    {/* value */}
    <SkeletonBlock className="mt-2 h-5 w-24" />
  </div>
);

const CarSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div className="relative flex flex-col gap-6 p-6 sm:p-8">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <SkeletonBlock className="size-5 rounded-full" />
                    <SkeletonBlock className="h-4 w-24" />
                  </div>

                  <SkeletonBlock className="h-9 w-64 sm:h-10 sm:w-80" />

                  <div className="flex flex-wrap gap-2">
                    <SkeletonBlock className="h-6 w-14 rounded-full" />
                    <SkeletonBlock className="h-6 w-20 rounded-full" />
                    <SkeletonBlock className="h-6 w-24 rounded-full" />
                  </div>
                </div>

                <div className="space-y-2 sm:text-right">
                  <SkeletonBlock className="h-4 w-28 ml-auto" />
                  <SkeletonBlock className="h-9 w-36 ml-auto" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <InfoItemSkeleton />
                <InfoItemSkeleton />
                <InfoItemSkeleton />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* General information */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="size-5 rounded-full" />
            <SkeletonBlock className="h-6 w-48" />
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

      {/* Technical information */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <SkeletonBlock className="size-5 rounded-full" />
            <SkeletonBlock className="h-6 w-52" />
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <InfoItemSkeleton key={i} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CarSkeleton;
