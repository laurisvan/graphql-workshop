import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: Date;
};

/**
 * This is a sample GraphQL multi-line comment. GraphQL supports simple API
 * documentation as part of the schema definition. This is actually enough for
 * all needs I have encountered this far.
 * 
 * You can browse this in schema browsers
 * 
 * TODO Add definitions for starts and ends when we add custom data types
 */
export type IAssignment = {
  __typename?: 'Assignment';
  /** Multi-line comments are supported here, as well */
  description?: Maybe<Scalars['String']>;
  ends: Scalars['DateTime'];
  id: Scalars['ID'];
  name: Scalars['String'];
  recipient?: Maybe<ICustomer>;
  recipientId?: Maybe<Scalars['ID']>;
  starts: Scalars['DateTime'];
};

/** In GraphQL, inputs are special types to encapsulate complex inputs */
export type IAssignmentInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  starts: Scalars['DateTime'];
  ends: Scalars['DateTime'];
};

export type IQuery = {
  __typename?: 'Query';
  assignments: Array<IAssignment>;
  customers: Array<ICustomer>;
  persons: Array<IPerson>;
};

export type IMutation = {
  __typename?: 'Mutation';
  createAssignment: IAssignment;
  createCustomer: ICustomer;
  createPerson: IPerson;
};


export type IMutationCreateAssignmentArgs = {
  input?: Maybe<IAssignmentInput>;
};


export type IMutationCreateCustomerArgs = {
  input?: Maybe<ICustomerInput>;
};


export type IMutationCreatePersonArgs = {
  input?: Maybe<IPersonInput>;
};


export type ICustomer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ICustomerInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
};

export type IPerson = {
  __typename?: 'Person';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type IPersonInput = {
  name: Scalars['String'];
};

export type IAssignmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type IAssignmentsQuery = (
  { __typename?: 'Query' }
  & { assignments: Array<(
    { __typename?: 'Assignment' }
    & Pick<IAssignment, 'name' | 'description' | 'starts' | 'ends'>
  )> }
);


export const AssignmentsDocument = gql`
    query assignments {
  assignments {
    name
    description
    starts
    ends
  }
}
    `;

/**
 * __useAssignmentsQuery__
 *
 * To run a query within a React component, call `useAssignmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAssignmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAssignmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAssignmentsQuery(baseOptions?: Apollo.QueryHookOptions<IAssignmentsQuery, IAssignmentsQueryVariables>) {
        return Apollo.useQuery<IAssignmentsQuery, IAssignmentsQueryVariables>(AssignmentsDocument, baseOptions);
      }
export function useAssignmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IAssignmentsQuery, IAssignmentsQueryVariables>) {
          return Apollo.useLazyQuery<IAssignmentsQuery, IAssignmentsQueryVariables>(AssignmentsDocument, baseOptions);
        }
export type AssignmentsQueryHookResult = ReturnType<typeof useAssignmentsQuery>;
export type AssignmentsLazyQueryHookResult = ReturnType<typeof useAssignmentsLazyQuery>;
export type AssignmentsQueryResult = Apollo.QueryResult<IAssignmentsQuery, IAssignmentsQueryVariables>;