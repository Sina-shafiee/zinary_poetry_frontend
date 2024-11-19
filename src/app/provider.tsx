import * as React from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { DirectionProvider } from '@radix-ui/react-direction';

import { queryConfig } from '@/lib/react-query';

import { AuthLoader } from '@/features/auth/components/auth-loader';
import { Toaster } from '@/components/ui/sonner';

interface Props {
  children: React.ReactNode;
}

export const AppProvider = ({ children }: Props) => {
  const [queryClient] = React.useState(
    () => new QueryClient({ defaultOptions: queryConfig }),
  );

  return (
    <React.Suspense fallback={<p>loading...</p>}>
      <QueryClientProvider client={queryClient}>
        <DirectionProvider dir="rtl">
          <AuthLoader>
            <Toaster />
            {import.meta.env.DEV && <ReactQueryDevtools />}
            {children}
          </AuthLoader>
        </DirectionProvider>
      </QueryClientProvider>
    </React.Suspense>
  );
};
