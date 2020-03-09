import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
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



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type isTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type IResolversTypes = {
  Query: ResolverTypeWrapper<{}>,
  String: ResolverTypeWrapper<Scalars['String']>,
  Assignment: ResolverTypeWrapper<IAssignment>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Date: ResolverTypeWrapper<Scalars['Date']>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Query: {},
  String: Scalars['String'],
  Assignment: IAssignment,
  ID: Scalars['ID'],
  Date: Scalars['Date'],
  Boolean: Scalars['Boolean'],
};

export type IAssignmentResolvers<ContextType = any, ParentType extends IResolversParentTypes['Assignment'] = IResolversParentTypes['Assignment']> = {
  id?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  assigneeId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  brokerId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  recipientId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>,
  starts?: Resolver<Maybe<IResolversTypes['Date']>, ParentType, ContextType>,
  ends?: Resolver<Maybe<IResolversTypes['Date']>, ParentType, ContextType>,
  __isTypeOf?: isTypeOfResolverFn<ParentType>,
};

export interface IDateScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['Date'], any> {
  name: 'Date'
}

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>,
  assignments?: Resolver<Array<IResolversTypes['Assignment']>, ParentType, ContextType>,
};

export type IResolvers<ContextType = any> = {
  Assignment?: IAssignmentResolvers<ContextType>,
  Date?: GraphQLScalarType,
  Query?: IQueryResolvers<ContextType>,
};


