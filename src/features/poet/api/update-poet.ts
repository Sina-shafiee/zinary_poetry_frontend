import { z } from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { graphql } from '@/lib/gql';
import { gqlExecute } from '@/lib/api/gql-api';
import { MutationConfig } from '@/lib/react-query';

import { usePoetTableSearchParams } from '../hooks/use-poet-table-search-params';

import { getPoetsQueryOptions } from './get-poets';
import { getPoetQueryOptions } from './get-poet';
import { useParams } from 'react-router-dom';

export const updatePoetMutation = graphql(`
  mutation updatePoet(
    $id: ID!
    $fullName: String
    $birthYear: Date
    $deathYear: Date
    $biography: String
  ) {
    updatePoet(
      id: $id
      fullName: $fullName
      birthYear: $birthYear
      deathYear: $deathYear
      biography: $biography
    ) {
      poet {
        id
      }
    }
  }
`);

export const updatePoetScheam = z.object({
  id: z.string().min(1, 'ایدی شاعر برای ویرایش ضروری است'),
  fullName: z.string().nullable().optional(),
  birthYear: z.string().nullable().optional(),
  deathYear: z.string().nullable().optional(),
  biography: z.string().nullable().optional(),
});

export type UpdatePoetInput = z.infer<typeof updatePoetScheam>;

const updatePoet = async ({
  id,
  fullName = null,
  biography = null,
  birthYear = null,
  deathYear = null,
}: UpdatePoetInput) => {
  return gqlExecute(updatePoetMutation, {
    id,
    fullName,
    biography,
    birthYear,
    deathYear,
  });
};

type UseUpdatePoetOptions = {
  mutationConfig?: MutationConfig<typeof updatePoet>;
};

export const useUpdatePoet = (options: UseUpdatePoetOptions) => {
  const queryClient = useQueryClient();
  const params = usePoetTableSearchParams();
  const { poetId } = useParams();

  const { onSuccess, ...config } = options.mutationConfig || {};
  return useMutation({
    mutationFn: updatePoet,
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: getPoetsQueryOptions({
          ...params,
        }).queryKey,
      });
      queryClient.invalidateQueries({
        queryKey: getPoetQueryOptions({
          id: poetId!,
        }).queryKey,
      });
    },
    ...config,
  });
};
