import gql from 'graphql-tag';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type IAssignment = {
   __typename?: 'Assignment';
  id?: Maybe<Scalars['ID']>;
  assigneeId?: Maybe<Scalars['ID']>;
  brokerId?: Maybe<Scalars['ID']>;
  recipientId?: Maybe<Scalars['ID']>;
  starts?: Maybe<Scalars['Date']>;
  ends?: Maybe<Scalars['Date']>;
};


/** All Queries (e.g. not nested resolvers) */
export type IQuery = {
   __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  assignments: Array<IAssignment>;
};


