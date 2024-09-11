import { Skeleton } from '@/components/ui/skeleton';

export const FeedSkeleton = () => {
  return (
    <article className="mt-4 grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg bg-primary-foreground px-3 py-6">
      {/* Skeleton pour l'icône épinglée (si nécessaire) */}
      <div className="flex justify-end">
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <Skeleton className="h-4 w-[100px] text-xs" />

      <div className="flex justify-end">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <div>
        <div className="flex items-center">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="ml-2 h-6 w-6 rounded-full" />
          <Skeleton className="ml-4 h-4 w-[100px]" />
        </div>

        <div className="my-1">
          <Skeleton className="h-8 w-[120px] rounded-full" />
        </div>

        <Skeleton className="mt-8 h-8 w-[300px]" />

        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-1 h-4 w-full" />

        <div className="my-10 h-full w-full">
          <Skeleton className="h-[352px] w-full rounded-xl" />
        </div>

        <div className="mt-5 flex justify-start text-muted-foreground">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </article>
  );
};
