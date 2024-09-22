import { Skeleton } from './ui/skeleton';

export const coverSkeleton = (
  <>
    <Skeleton className="h-2 w-1/3" />
    <Skeleton className="h-2 w-full" />
    <Skeleton className="aspect-square w-1/6 rounded-full" />
    <Skeleton className="h-2 w-1/2" />
    <Skeleton className="h-2 w-1/3" />
    <Skeleton className="h-2 w-full" />
    <div className="my-4 grid w-full grid-cols-2 gap-4">
      <div className="space-y-4">
        <Skeleton className="h-2" />
        <Skeleton className="h-2" />
        <Skeleton className="h-2 w-1/2" />
      </div>
      <div className="space-y-4">
        <Skeleton className="h-2" />
        <Skeleton className="h-2" />
        <Skeleton className="h-2 w-1/2" />
      </div>
    </div>
    <Skeleton className="mt-auto mr-auto h-2 w-1/3" />
  </>
);
