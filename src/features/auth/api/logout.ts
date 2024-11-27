import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { baseApi } from '@/lib/api/rest-api';

const logout = async (): Promise<void> => {
  const result = await baseApi.post('/auth/logout/');
  return result.data ?? null;
};

type UseLogoutOptions = {
  mutationConfig?: MutationConfig<typeof logout>;
};

export const useLogout = (options: UseLogoutOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...config } = options.mutationConfig || {};
  return useMutation({
    mutationKey: ['authentication-user'],
    mutationFn: logout,
    onSuccess(...args) {
      onSuccess?.(...args);
      queryClient.setQueryData(['authentication-user'], null);
      queryClient.invalidateQueries({ queryKey: ['authentication-user'] });
    },
    ...config,
  });
};
