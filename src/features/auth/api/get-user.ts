import { queryOptions, useQuery } from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { baseApi } from '@/lib/api/rest-api';

import { AuthResponse } from '@/types/api';

const getUser = async (): Promise<AuthResponse> => {
  const result = await baseApi.get('/auth/me/');
  return result.data;
};

const getUserQueryOptions = () => {
  return queryOptions({
    queryKey: ['authentication-user'],
    queryFn: getUser,
  });
};

type UseUserOptions = {
  queryConfig?: QueryConfig<typeof getUserQueryOptions>;
};

export const useUser = (options: UseUserOptions) => {
  return useQuery({
    ...getUserQueryOptions(),
    ...options.queryConfig,
  });
};
