const SkeletonBlock = ({ className }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-muted ${className}`} />
);

const PhotoCardSkeleton = () => (
  <div className="overflow-hidden rounded-xl border bg-card">
    <SkeletonBlock className="aspect-4/3 w-full rounded-none" />

    <div className="relative px-4 py-3.5">
      <div className="absolute right-3 top-3 flex items-center gap-1">
        <SkeletonBlock className="size-8 rounded-md" />
        <SkeletonBlock className="size-8 rounded-md" />
      </div>

      <div className="min-w-0 pr-20 space-y-2">
        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-4 w-32" />
          <SkeletonBlock className="h-5 w-16 rounded-md" />
        </div>

        <div className="flex items-center gap-2">
          <SkeletonBlock className="h-3 w-20" />
          <SkeletonBlock className="h-3 w-16" />
        </div>

        <SkeletonBlock className="h-3 w-full" />
        <SkeletonBlock className="h-3 w-3/4" />
      </div>
    </div>
  </div>
);

const GallerySkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="flex gap-2 overflow-hidden pb-1">
        {Array.from({ length: 8 }).map((_, i) => (
          <SkeletonBlock key={i} className="h-9 w-20 shrink-0 rounded-full" />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <PhotoCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
};

export default GallerySkeleton;
