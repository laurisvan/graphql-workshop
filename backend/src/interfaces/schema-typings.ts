import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
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


export type ICustomer = {
  __typename?: 'Customer';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type ICustomerInput = {
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
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

export type IPerson = {
  __typename?: 'Person';
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type IPersonInput = {
  name: Scalars['String'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
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

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

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
  Assignment: ResolverTypeWrapper<IAssignment>;
  String: ResolverTypeWrapper<Scalars['String']>;
  AssignmentInput: IAssignmentInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Customer: ResolverTypeWrapper<ICustomer>;
  CustomerInput: ICustomerInput;
  Query: ResolverTypeWrapper<{}>;
  Mutation: ResolverTypeWrapper<{}>;
  Person: ResolverTypeWrapper<IPerson>;
  PersonInput: IPersonInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = {
  Assignment: IAssignment;
  String: Scalars['String'];
  AssignmentInput: IAssignmentInput;
  DateTime: Scalars['DateTime'];
  ID: Scalars['ID'];
  Customer: ICustomer;
  CustomerInput: ICustomerInput;
  Query: {};
  Mutation: {};
  Person: IPerson;
  PersonInput: IPersonInput;
  Boolean: Scalars['Boolean'];
};

export type IAssignmentResolvers<ContextType = any, ParentType extends IResolversParentTypes['Assignment'] = IResolversParentTypes['Assignment']> = {
  description?: Resolver<Maybe<IResolversTypes['String']>, ParentType, ContextType>;
  ends?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  recipient?: Resolver<Maybe<IResolversTypes['Customer']>, ParentType, ContextType>;
  recipientId?: Resolver<Maybe<IResolversTypes['ID']>, ParentType, ContextType>;
  starts?: Resolver<IResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface IDateTimeScalarConfig extends GraphQLScalarTypeConfig<IResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type ICustomerResolvers<ContextType = any, ParentType extends IResolversParentTypes['Customer'] = IResolversParentTypes['Customer']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = {
  assignments?: Resolver<Array<IResolversTypes['Assignment']>, ParentType, ContextType>;
  customers?: Resolver<Array<IResolversTypes['Customer']>, ParentType, ContextType>;
  persons?: Resolver<Array<IResolversTypes['Person']>, ParentType, ContextType>;
};

export type IMutationResolvers<ContextType = any, ParentType extends IResolversParentTypes['Mutation'] = IResolversParentTypes['Mutation']> = {
  createAssignment?: Resolver<IResolversTypes['Assignment'], ParentType, ContextType, RequireFields<IMutationCreateAssignmentArgs, never>>;
  createCustomer?: Resolver<IResolversTypes['Customer'], ParentType, ContextType, RequireFields<IMutationCreateCustomerArgs, never>>;
  createPerson?: Resolver<IResolversTypes['Person'], ParentType, ContextType, RequireFields<IMutationCreatePersonArgs, never>>;
};

export type IPersonResolvers<ContextType = any, ParentType extends IResolversParentTypes['Person'] = IResolversParentTypes['Person']> = {
  id?: Resolver<IResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<IResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type IResolvers<ContextType = any> = {
  Assignment?: IAssignmentResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Customer?: ICustomerResolvers<ContextType>;
  Query?: IQueryResolvers<ContextType>;
  Mutation?: IMutationResolvers<ContextType>;
  Person?: IPersonResolvers<ContextType>;
};


