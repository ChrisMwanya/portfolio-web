import { Skeleton } from '@/components/ui/skeleton';

export const ProjectSkeleton = () => {
  return (
    <div className="max-full mt-10 animate-pulse rounded-lg bg-primary-foreground p-6 shadow-md">
      <Skeleton className="mb-2 h-6 w-[150px]" />

      <div className="mb-4 space-y-2">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/4" />
      </div>

      <div className="mb-4 flex space-x-2">
        <Skeleton className="h-6 w-[60px] rounded-md" />
        <Skeleton className="h-6 w-[60px] rounded-md" />
        <Skeleton className="h-6 w-[60px] rounded-md" />
      </div>

      <Skeleton className="h-4 w-[10px]" />
    </div>
  );
};
