import type { TypedDocumentString } from '@/lib/gql/graphql';
import { baseApi } from './rest-api';
import { env } from '@/config/env';

export async function gqlExecute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
) {
  const response = await baseApi.post(
    env.GQL_API_URL,
    {
      query,
      variables,
    },
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/graphql-response+json',
      },
    },
  );

  return response.data.data as TResult;
}
