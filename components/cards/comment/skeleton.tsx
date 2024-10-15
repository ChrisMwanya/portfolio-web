import { Skeleton } from '@/components/ui/skeleton';

export const GuestbookSkeleton = () => {
  return (
    <article className="grid grid-cols-[1fr_10fr] gap-x-2 gap-y-4 rounded-lg px-3 py-6 hover:bg-primary-foreground">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-10 rounded-full" />
      </div>

      <div>
        <div className="flex items-center">
          <Skeleton className="h-6 w-[150px]" />
          <Skeleton className="ml-2 h-6 w-6 rounded-full" />
          <Skeleton className="ml-4 h-4 w-[100px]" />
        </div>
        <Skeleton className="mt-2 h-4 w-[200px]" />
        <div className="my-5 h-full w-full">
          <Skeleton className="h-24 w-full rounded-md" />
        </div>

        <div className="mt-5 flex justify-end">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>
      </div>
    </article>
  );
};
