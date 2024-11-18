import { DefaultOptions } from '@tanstack/react-query';

export const queryConfig = {
  queries: {
    retry: false,
    staleTime: 1000 * 60,
    refetchOnWindowFocus: false,
  },
} satisfies DefaultOptions;
