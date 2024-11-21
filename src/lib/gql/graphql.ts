/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /**
   * The `Date` scalar type represents a Date
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  Date: { input: string; output: string };
  /**
   * The `DateTime` scalar type represents a DateTime
   * value as specified by
   * [iso8601](https://en.wikipedia.org/wiki/ISO_8601).
   */
  DateTime: { input: any; output: any };
};

export type CollectionType = {
  __typename?: 'CollectionType';
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  poemSet: Array<PoemType>;
  title: Scalars['String']['output'];
  type: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type CreateCollection = {
  __typename?: 'CreateCollection';
  collection: Maybe<CollectionType>;
};

export type CreatePoem = {
  __typename?: 'CreatePoem';
  poem: Maybe<PoemType>;
};

export type CreatePoet = {
  __typename?: 'CreatePoet';
  poet: Maybe<PoetType>;
};

export type CreateVerse = {
  __typename?: 'CreateVerse';
  verse: Maybe<VerseType>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createCollection: Maybe<CreateCollection>;
  createPoem: Maybe<CreatePoem>;
  createPoet: Maybe<CreatePoet>;
  createVerse: Maybe<CreateVerse>;
  updateCollection: Maybe<UpdateCollection>;
  updatePoem: Maybe<UpdatePoem>;
  updatePoet: Maybe<UpdatePoet>;
  updateVerse: Maybe<UpdateVerse>;
};

export type MutationCreateCollectionArgs = {
  description: InputMaybe<Scalars['String']['input']>;
  title: Scalars['String']['input'];
  type: Scalars['String']['input'];
};

export type MutationCreatePoemArgs = {
  collectionId: Scalars['Int']['input'];
  poetId: Scalars['Int']['input'];
  title: Scalars['String']['input'];
  yearWritten: InputMaybe<Scalars['Date']['input']>;
};

export type MutationCreatePoetArgs = {
  biography: Scalars['String']['input'];
  birthYear: InputMaybe<Scalars['Date']['input']>;
  deathYear: InputMaybe<Scalars['Date']['input']>;
  fullName: Scalars['String']['input'];
};

export type MutationCreateVerseArgs = {
  firstHemistich: Scalars['String']['input'];
  order: Scalars['Int']['input'];
  poemId: Scalars['Int']['input'];
  secondHemistich: Scalars['String']['input'];
};

export type MutationUpdateCollectionArgs = {
  description: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  title: InputMaybe<Scalars['String']['input']>;
  type: InputMaybe<Scalars['String']['input']>;
};

export type MutationUpdatePoemArgs = {
  collectionId: InputMaybe<Scalars['Int']['input']>;
  id: Scalars['Int']['input'];
  poetId: InputMaybe<Scalars['Int']['input']>;
  title: InputMaybe<Scalars['String']['input']>;
  yearWritten: InputMaybe<Scalars['Date']['input']>;
};

export type MutationUpdatePoetArgs = {
  biography: InputMaybe<Scalars['String']['input']>;
  birthYear: InputMaybe<Scalars['Date']['input']>;
  deathYear: InputMaybe<Scalars['Date']['input']>;
  fullName: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
};

export type MutationUpdateVerseArgs = {
  firstHemistich: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Int']['input'];
  order: InputMaybe<Scalars['Int']['input']>;
  secondHemistich: InputMaybe<Scalars['String']['input']>;
};

export type PaginatedPoetType = {
  __typename?: 'PaginatedPoetType';
  currentPage: Scalars['Int']['output'];
  poets: Maybe<Array<Maybe<PoetType>>>;
  totalPages: Scalars['Int']['output'];
};

export type PoemType = {
  __typename?: 'PoemType';
  collection: CollectionType;
  id: Scalars['ID']['output'];
  poet: PoetType;
  title: Scalars['String']['output'];
  verseSet: Array<VerseType>;
  yearWritten: Maybe<Scalars['Date']['output']>;
};

export type PoetType = {
  __typename?: 'PoetType';
  biography: Scalars['String']['output'];
  birthYear: Maybe<Scalars['Date']['output']>;
  deathYear: Maybe<Scalars['Date']['output']>;
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  poemSet: Array<PoemType>;
};

export type Query = {
  __typename?: 'Query';
  collection: Maybe<CollectionType>;
  collections: Maybe<Array<Maybe<CollectionType>>>;
  poem: Maybe<PoemType>;
  poems: Maybe<Array<Maybe<PoemType>>>;
  poet: Maybe<PoetType>;
  poets: Maybe<PaginatedPoetType>;
  verse: Maybe<VerseType>;
  verses: Maybe<Array<Maybe<VerseType>>>;
};

export type QueryCollectionArgs = {
  id: Scalars['Int']['input'];
};

export type QueryPoemArgs = {
  id: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPoetArgs = {
  id: InputMaybe<Scalars['Int']['input']>;
};

export type QueryPoetsArgs = {
  page: InputMaybe<Scalars['Int']['input']>;
  perPage: InputMaybe<Scalars['Int']['input']>;
  q: InputMaybe<Scalars['String']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
};

export type QueryVerseArgs = {
  id: Scalars['Int']['input'];
};

export type UpdateCollection = {
  __typename?: 'UpdateCollection';
  collection: Maybe<CollectionType>;
};

export type UpdatePoem = {
  __typename?: 'UpdatePoem';
  poem: Maybe<PoemType>;
};

export type UpdatePoet = {
  __typename?: 'UpdatePoet';
  poet: Maybe<PoetType>;
};

export type UpdateVerse = {
  __typename?: 'UpdateVerse';
  verse: Maybe<VerseType>;
};

export type VerseType = {
  __typename?: 'VerseType';
  firstHemistich: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  order: Scalars['Int']['output'];
  poem: PoemType;
  secondHemistich: Scalars['String']['output'];
};

export type PoetsQueryVariables = Exact<{
  page: InputMaybe<Scalars['Int']['input']>;
  perPage: InputMaybe<Scalars['Int']['input']>;
  q: InputMaybe<Scalars['String']['input']>;
  sort: InputMaybe<Scalars['String']['input']>;
}>;

export type PoetsQuery = {
  __typename?: 'Query';
  poets: {
    __typename?: 'PaginatedPoetType';
    totalPages: number;
    currentPage: number;
    poets: Array<{
      __typename?: 'PoetType';
      id: string;
      fullName: string;
      birthYear: string | null;
      deathYear: string | null;
    } | null> | null;
  } | null;
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any> | undefined,
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const PoetsDocument = new TypedDocumentString(`
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
    `) as unknown as TypedDocumentString<PoetsQuery, PoetsQueryVariables>;
