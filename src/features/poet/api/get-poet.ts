import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { gqlExecute } from '@/lib/api/gql-api';

import { graphql } from '@/lib/gql';
import { PoetQuery } from '@/lib/gql/graphql';

export const query = graphql(`
  query Poet($id: ID!) {
    poet(id: $id) {
      id
      fullName
      birthYear
      deathYear
      biography
    }
  }
`);

export type NonNullablePoetType = NonNullable<PoetQuery['poet']>;

export const getPoets = (variables: UsePoetOptions['variables']) => {
  return gqlExecute(query, {
    id: variables.id,
  });
};

export const getPoetQueryOptions = ({ id }: UsePoetOptions['variables']) => {
  return queryOptions({
    queryKey: ['poet', { id }],
    queryFn: () => getPoets({ id }),
    placeholderData: keepPreviousData,
  });
};

type UsePoetOptions = {
  variables: {
    id: string;
  };
  queryConfig?: QueryConfig<typeof getPoetQueryOptions>;
};

export const usePoet = ({ queryConfig, variables: { id } }: UsePoetOptions) => {
  return useQuery({
    ...getPoetQueryOptions({ id }),
    ...queryConfig,
  });
};
