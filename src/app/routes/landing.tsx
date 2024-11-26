import { lazy, Suspense } from 'react';
import { Toaster } from 'sonner';

const PlateEditor = lazy(() => import('@/components/editor/plate-editor'));

export const Landing = () => {
  return (
    <div className="h-screen p-4 w-full" data-registry="plate">
      <Suspense fallback={<p>editor is loading...</p>}>
        <PlateEditor />
      </Suspense>
      <Toaster />
    </div>
  );
};
