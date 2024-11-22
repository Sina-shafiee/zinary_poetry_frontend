import { useMutation, useQueryClient } from '@tanstack/react-query';

import { graphql } from '@/lib/gql';
import { gqlExecute } from '@/lib/api/gql-api';
import { MutationConfig } from '@/lib/react-query';

import { usePoetTableSearchParams } from '../hooks/use-poet-table-search-params';

import { getPoetsQueryOptions } from './get-poets';

export const deletePoetMutation = graphql(`
  mutation deletePoet($id: ID!) {
    deletePoet(id: $id) {
      success
    }
  }
`);

const deletePoet = async (id: string) => {
  return gqlExecute(deletePoetMutation, { id });
};

type UseDeletePoetOptions = {
  mutationConfig?: MutationConfig<typeof deletePoet>;
};

export const useDeletePoet = (options: UseDeletePoetOptions) => {
  const queryClient = useQueryClient();
  const params = usePoetTableSearchParams();

  const { onSuccess, ...config } = options.mutationConfig || {};
  return useMutation({
    mutationFn: deletePoet,
    onSuccess(data, variables, context) {
      onSuccess?.(data, variables, context);
      queryClient.invalidateQueries({
        queryKey: getPoetsQueryOptions({
          ...params,
        }).queryKey,
      });
    },
    ...config,
  });
};
