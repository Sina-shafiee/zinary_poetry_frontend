import { PageTitle } from '@/components/ui/page-title';
import { Skeleton } from '@/components/ui/skeleton';

export const UpdatePoetFormSkeleton = () => {
  return (
    <div className="mt-4 flex flex-col gap-4">
      <PageTitle headingClassName="h-8 w-44 animate-pulse rounded-md bg-primary/5" />
      <section className="grid grid-cols-2 gap-4 p-4 bg-card shadow rounded-md">
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-9 w-full" />
        </div>
        <div className="col-span-2 flex flex-col gap-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-7 w-full" />
          <Skeleton className="h-56 w-full" />
        </div>
        <div className="col-span-2 flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </section>
    </div>
  );
};
