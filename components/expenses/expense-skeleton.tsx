import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const StatCardSkeleton = () => (
  <Card>
    <CardHeader className="pb-2">
      <SkeletonBlock className="h-4 w-28" />
    </CardHeader>
    <CardContent>
      <SkeletonBlock className="h-8 w-24" />
    </CardContent>
  </Card>
);

const ExpenseSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCardSkeleton />
        <StatCardSkeleton />
        <StatCardSkeleton />
      </div>

      <div className="overflow-hidden rounded-lg border">
        <div className="flex items-center justify-between border-b p-4">
          <SkeletonBlock className="h-4 w-40" />
        </div>

        <div className="w-full">
          <div className="grid grid-cols-7 gap-4 border-b px-4 py-3">
            <SkeletonBlock className="h-4 w-14" />
            <SkeletonBlock className="h-4 w-20" />
            <SkeletonBlock className="h-4 w-24" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-16" />
            <SkeletonBlock className="h-4 w-12" />
            <SkeletonBlock className="h-4 w-16 ml-auto" />
          </div>

          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="grid grid-cols-7 gap-4 border-b px-4 py-4 last:border-b-0"
            >
              <SkeletonBlock className="h-4 w-20" />
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="h-4 w-28" />
              <SkeletonBlock className="h-4 w-16" />
              <SkeletonBlock className="h-4 w-20" />
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

export default ExpenseSkeleton;
