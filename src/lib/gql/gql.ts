/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  mutation deletePoet($id: ID!) {\n    deletePoet(id: $id) {\n      success\n    }\n  }\n':
    types.DeletePoetDocument,
  '\n  query Poets($page: Int, $perPage: Int, $q: String, $sort: String) {\n    poets(page: $page, perPage: $perPage, q: $q, sort: $sort) {\n      totalPages\n      currentPage\n      poets {\n        id\n        fullName\n        birthYear\n        deathYear\n      }\n    }\n  }\n':
    types.PoetsDocument,
  '\n  mutation updatePoet(\n    $id: ID!\n    $fullName: String\n    $birthYear: Date\n    $deathYear: Date\n    $biography: String\n  ) {\n    updatePoet(\n      id: $id\n      fullName: $fullName\n      birthYear: $birthYear\n      deathYear: $deathYear\n      biography: $biography\n    ) {\n      poet {\n        id\n      }\n    }\n  }\n':
    types.UpdatePoetDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation deletePoet($id: ID!) {\n    deletePoet(id: $id) {\n      success\n    }\n  }\n',
): typeof import('./graphql').DeletePoetDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query Poets($page: Int, $perPage: Int, $q: String, $sort: String) {\n    poets(page: $page, perPage: $perPage, q: $q, sort: $sort) {\n      totalPages\n      currentPage\n      poets {\n        id\n        fullName\n        birthYear\n        deathYear\n      }\n    }\n  }\n',
): typeof import('./graphql').PoetsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation updatePoet(\n    $id: ID!\n    $fullName: String\n    $birthYear: Date\n    $deathYear: Date\n    $biography: String\n  ) {\n    updatePoet(\n      id: $id\n      fullName: $fullName\n      birthYear: $birthYear\n      deathYear: $deathYear\n      biography: $biography\n    ) {\n      poet {\n        id\n      }\n    }\n  }\n',
): typeof import('./graphql').UpdatePoetDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
