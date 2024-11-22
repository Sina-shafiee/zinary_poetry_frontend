import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from '@tanstack/react-query';

import { QueryConfig } from '@/lib/react-query';
import { gqlExecute } from '@/lib/api/gql-api';

import { graphql } from '@/lib/gql';
import { PoetsQuery } from '@/lib/gql/graphql';

export const query = graphql(`
  query Poets($page: Int, $perPage: Int, $q: String, $sort: String) {
    poets(page: $page, perPage: $perPage, q: $q, sort: $sort) {
      totalPages
      currentPage
      poets {
        id
        fullName
        birthYear
        deathYear
      }
    }
  }
`);

export type NonNullablePoetType = NonNullable<
  NonNullable<PoetsQuery['poets']>['poets']
>[number];

export const getPoets = (variables: UsePoetsOptions['variables']) => {
  return gqlExecute(query, {
    q: variables.searchQuery ?? null,
    sort: variables.sort ?? null,
    page: variables.page ? variables.page : 1,
    perPage: variables.perPage ? variables.perPage : 10,
  });
};

export const getPoetsQueryOptions = ({
  page,
  perPage,
  sort,
  searchQuery,
}: UsePoetsOptions['variables']) => {
  return queryOptions({
    queryKey: ['poets', { page, perPage, sort, searchQuery }],
    queryFn: () => getPoets({ page, perPage, sort, searchQuery }),
    placeholderData: keepPreviousData,
  });
};

type UsePoetsOptions = {
  variables: {
    page?: number;
    perPage?: number;
    sort?: string;
    searchQuery?: string;
  };
  queryConfig?: QueryConfig<typeof getPoetsQueryOptions>;
};

export const usePoets = ({
  queryConfig,
  variables: { sort, page, perPage, searchQuery },
}: UsePoetsOptions) => {
  return useQuery({
    ...getPoetsQueryOptions({ page, perPage, sort, searchQuery }),
    ...queryConfig,
  });
};
