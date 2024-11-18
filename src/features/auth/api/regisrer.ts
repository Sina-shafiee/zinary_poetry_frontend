import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { baseApi } from '@/lib/api/rest-api';

import { AuthResponse } from '@/types/api';

export const registerSchema = z.object({
  email: z.string().email('Enter valid email'),
  password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;

const register = async (input: RegisterInput): Promise<AuthResponse> => {
  const result = await baseApi.post('/auth/register/', input);
  return result.data;
};

type UseRegisterOptions = {
  mutationConfig?: MutationConfig<typeof register>;
};

export const useRegister = (options: UseRegisterOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...config } = options.mutationConfig || {};
  return useMutation({
    mutationKey: ['authentication-user'],
    mutationFn: register,
    onSuccess(data, variables, context) {
      queryClient.setQueryData(['authentication-user'], data);
      onSuccess?.(data, variables, context);
    },
    ...config,
  });
};
