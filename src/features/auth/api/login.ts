import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { MutationConfig } from '@/lib/react-query';
import { baseApi } from '@/lib/api/rest-api';

import { AuthResponse } from '@/types/api';

export const loginSchema = z.object({
  email: z
    .string()
    .email('ایمیل وارد شده نادرست میباشد')
    .min(1, 'فیلد ایمیل ضروری میباشد'),
  password: z.string().min(1, 'فیلد رمز عبور ضروری میباشد'),
});

export type LoginInput = z.infer<typeof loginSchema>;

const login = async (input: LoginInput): Promise<AuthResponse> => {
  const result = await baseApi.post('/auth/login/', input);
  return result.data;
};

type UseLoginOptions = {
  mutationConfig?: MutationConfig<typeof login>;
};

export const useLogin = (options: UseLoginOptions) => {
  const queryClient = useQueryClient();
  const { onSuccess, ...config } = options.mutationConfig || {};
  return useMutation({
    mutationKey: ['authentication-user'],
    mutationFn: login,
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context);
      queryClient.setQueryData(['authentication-user'], data);
      queryClient.invalidateQueries({ queryKey: ['authentication-user'] });
    },
    ...config,
  });
};
