import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type AllPostsType = {
  __typename?: 'AllPostsType';
  items: Array<Posts>;
  total: Scalars['Float'];
};

export type Comments = {
  __typename?: 'Comments';
  createdAt: Scalars['DateTime'];
  id: Scalars['Float'];
  parentId?: Maybe<Scalars['Float']>;
  postsId?: Maybe<Scalars['Float']>;
  replyCount?: Maybe<Scalars['Float']>;
  text: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: Users;
  userId?: Maybe<Scalars['String']>;
};

export type CreateCommentDto = {
  parentId?: InputMaybe<Scalars['Float']>;
  postId: Scalars['Float'];
  text: Scalars['String'];
};

export type CreatePostDto = {
  text: Scalars['String'];
  title: Scalars['String'];
};

export type CreatePostsResponsePayload = {
  __typename?: 'CreatePostsResponsePayload';
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  role?: InputMaybe<Role>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createComment: Comments;
  createPosts: PostPayload;
  deletePost: PostPayload;
  signIn: UserPayload;
  signUp: Users;
  updatePost: PostPayload;
};


export type MutationCreateCommentArgs = {
  createCommentDto: CreateCommentDto;
};


export type MutationCreatePostsArgs = {
  createPostDto: CreatePostDto;
};


export type MutationDeletePostArgs = {
  id: Scalars['Float'];
};


export type MutationSignInArgs = {
  user: SignInUserInput;
};


export type MutationSignUpArgs = {
  createUserInput: CreateUserInput;
};


export type MutationUpdatePostArgs = {
  id: Scalars['Float'];
  updatePostDto: UpdatePostDto;
};

export type PaginateInput = {
  skip: Scalars['Int'];
  take: Scalars['Int'];
};

export type PostPayload = {
  __typename?: 'PostPayload';
  post?: Maybe<Posts>;
  response?: Maybe<ResponseObject>;
};

export type Posts = {
  __typename?: 'Posts';
  comments: Array<Comments>;
  createdAt: Scalars['String'];
  id: Scalars['Float'];
  text: Scalars['String'];
  title: Scalars['String'];
  updatedAt: Scalars['String'];
  user: Users;
  userId?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  findAllPosts: AllPostsType;
  findPostById: PostPayload;
  getPosts: Array<Posts>;
  hello: Scalars['String'];
  replies: Array<Comments>;
};


export type QueryFindAllPostsArgs = {
  paginationInput: PaginateInput;
};


export type QueryFindPostByIdArgs = {
  id: Scalars['Float'];
};


export type QueryGetPostsArgs = {
  search: Scalars['String'];
};


export type QueryRepliesArgs = {
  commentId: Scalars['Float'];
};

export type ResponseObject = {
  __typename?: 'ResponseObject';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['Int']>;
};

/** user's role */
export enum Role {
  Admin = 'Admin',
  User = 'User'
}

export type SignInUserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UpdatePostDto = {
  text: Scalars['String'];
};

export type UserPayload = {
  __typename?: 'UserPayload';
  accesstoken: Scalars['String'];
  response: SignInResponsePayload;
};

export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
  roles?: Maybe<Role>;
  updatedAt: Scalars['String'];
};

export type SignInResponsePayload = {
  __typename?: 'signInResponsePayload';
  message: Scalars['String'];
  status: Scalars['Float'];
};

export type SignUpMutationVariables = Exact<{
  createUserInput: CreateUserInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Users', name: string, email: string, password: string, createdAt: string, updatedAt: string } };

export type SignInMutationVariables = Exact<{
  user: SignInUserInput;
}>;


export type SignInMutation = { __typename?: 'Mutation', signIn: { __typename?: 'UserPayload', accesstoken: string, response: { __typename?: 'signInResponsePayload', status: number, message: string } } };

export type CreatePostsMutationVariables = Exact<{
  createPostDto: CreatePostDto;
}>;


export type CreatePostsMutation = { __typename?: 'Mutation', createPosts: { __typename?: 'PostPayload', post?: { __typename?: 'Posts', id: number, title: string, text: string, userId?: string | null } | null, response?: { __typename?: 'ResponseObject', message?: string | null, error?: string | null } | null } };

export type CreateCommentMutationVariables = Exact<{
  createCommentDto: CreateCommentDto;
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comments', id: number, text: string, userId?: string | null, postsId?: number | null } };

export type FindAllPostsQueryVariables = Exact<{
  paginationInput: PaginateInput;
}>;


export type FindAllPostsQuery = { __typename?: 'Query', findAllPosts: { __typename?: 'AllPostsType', total: number, items: Array<{ __typename?: 'Posts', createdAt: string, id: number, text: string, title: string, updatedAt: string, userId?: string | null, comments: Array<{ __typename?: 'Comments', id: number, createdAt: any, parentId?: number | null, postsId?: number | null, replyCount?: number | null, text: string, updatedAt: any, userId?: string | null, user: { __typename?: 'Users', createdAt: string, email: string, name: string, password: string } }>, user: { __typename?: 'Users', createdAt: string, email: string, name: string, password: string, roles?: Role | null, updatedAt: string } }> } };

export type FindPostByIdQueryVariables = Exact<{
  id: Scalars['Float'];
}>;


export type FindPostByIdQuery = { __typename?: 'Query', findPostById: { __typename?: 'PostPayload', response?: { __typename?: 'ResponseObject', message?: string | null, status?: number | null } | null, post?: { __typename?: 'Posts', id: number, title: string, text: string, createdAt: string, updatedAt: string, comments: Array<{ __typename?: 'Comments', id: number, text: string, userId?: string | null, parentId?: number | null, createdAt: any, updatedAt: any, replyCount?: number | null, user: { __typename?: 'Users', name: string } }>, user: { __typename?: 'Users', name: string, email: string } } | null } };

export type FindRepliesWithCommentIdQueryVariables = Exact<{
  commentId: Scalars['Float'];
}>;


export type FindRepliesWithCommentIdQuery = { __typename?: 'Query', replies: Array<{ __typename?: 'Comments', id: number, text: string, userId?: string | null, postsId?: number | null, createdAt: any, replyCount?: number | null, updatedAt: any, user: { __typename?: 'Users', name: string } }> };

export type GetPostsQueryVariables = Exact<{
  search: Scalars['String'];
}>;


export type GetPostsQuery = { __typename?: 'Query', getPosts: Array<{ __typename?: 'Posts', id: number, text: string, userId?: string | null, title: string, createdAt: string, user: { __typename?: 'Users', name: string } }> };


export const SignUpDocument = gql`
    mutation SignUp($createUserInput: CreateUserInput!) {
  signUp(createUserInput: $createUserInput) {
    name
    email
    password
    createdAt
    updatedAt
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      createUserInput: // value for 'createUserInput'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const SignInDocument = gql`
    mutation SignIn($user: SignInUserInput!) {
  signIn(user: $user) {
    accesstoken
    response {
      status
      message
    }
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      user: // value for 'user'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, options);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const CreatePostsDocument = gql`
    mutation CreatePosts($createPostDto: CreatePostDto!) {
  createPosts(createPostDto: $createPostDto) {
    post {
      id
      title
      text
      userId
    }
    response {
      message
      error
      error
    }
  }
}
    `;
export type CreatePostsMutationFn = Apollo.MutationFunction<CreatePostsMutation, CreatePostsMutationVariables>;

/**
 * __useCreatePostsMutation__
 *
 * To run a mutation, you first call `useCreatePostsMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostsMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostsMutation, { data, loading, error }] = useCreatePostsMutation({
 *   variables: {
 *      createPostDto: // value for 'createPostDto'
 *   },
 * });
 */
export function useCreatePostsMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostsMutation, CreatePostsMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreatePostsMutation, CreatePostsMutationVariables>(CreatePostsDocument, options);
      }
export type CreatePostsMutationHookResult = ReturnType<typeof useCreatePostsMutation>;
export type CreatePostsMutationResult = Apollo.MutationResult<CreatePostsMutation>;
export type CreatePostsMutationOptions = Apollo.BaseMutationOptions<CreatePostsMutation, CreatePostsMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($createCommentDto: CreateCommentDto!) {
  createComment(createCommentDto: $createCommentDto) {
    id
    text
    userId
    postsId
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      createCommentDto: // value for 'createCommentDto'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const FindAllPostsDocument = gql`
    query FindAllPosts($paginationInput: PaginateInput!) {
  findAllPosts(paginationInput: $paginationInput) {
    items {
      comments {
        id
        createdAt
        parentId
        postsId
        replyCount
        text
        updatedAt
        user {
          createdAt
          email
          name
          password
        }
        userId
      }
      createdAt
      id
      text
      title
      updatedAt
      user {
        createdAt
        email
        name
        password
        roles
        updatedAt
      }
      userId
    }
    total
  }
}
    `;

/**
 * __useFindAllPostsQuery__
 *
 * To run a query within a React component, call `useFindAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindAllPostsQuery({
 *   variables: {
 *      paginationInput: // value for 'paginationInput'
 *   },
 * });
 */
export function useFindAllPostsQuery(baseOptions: Apollo.QueryHookOptions<FindAllPostsQuery, FindAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindAllPostsQuery, FindAllPostsQueryVariables>(FindAllPostsDocument, options);
      }
export function useFindAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindAllPostsQuery, FindAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindAllPostsQuery, FindAllPostsQueryVariables>(FindAllPostsDocument, options);
        }
export type FindAllPostsQueryHookResult = ReturnType<typeof useFindAllPostsQuery>;
export type FindAllPostsLazyQueryHookResult = ReturnType<typeof useFindAllPostsLazyQuery>;
export type FindAllPostsQueryResult = Apollo.QueryResult<FindAllPostsQuery, FindAllPostsQueryVariables>;
export const FindPostByIdDocument = gql`
    query FindPostById($id: Float!) {
  findPostById(id: $id) {
    response {
      message
      status
    }
    post {
      id
      title
      text
      createdAt
      updatedAt
      comments {
        id
        text
        userId
        parentId
        createdAt
        updatedAt
        replyCount
        user {
          name
        }
      }
      user {
        name
        email
      }
    }
  }
}
    `;

/**
 * __useFindPostByIdQuery__
 *
 * To run a query within a React component, call `useFindPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindPostByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useFindPostByIdQuery(baseOptions: Apollo.QueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
      }
export function useFindPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindPostByIdQuery, FindPostByIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindPostByIdQuery, FindPostByIdQueryVariables>(FindPostByIdDocument, options);
        }
export type FindPostByIdQueryHookResult = ReturnType<typeof useFindPostByIdQuery>;
export type FindPostByIdLazyQueryHookResult = ReturnType<typeof useFindPostByIdLazyQuery>;
export type FindPostByIdQueryResult = Apollo.QueryResult<FindPostByIdQuery, FindPostByIdQueryVariables>;
export const FindRepliesWithCommentIdDocument = gql`
    query FindRepliesWithCommentId($commentId: Float!) {
  replies(commentId: $commentId) {
    id
    text
    userId
    postsId
    createdAt
    replyCount
    updatedAt
    replyCount
    user {
      name
    }
  }
}
    `;

/**
 * __useFindRepliesWithCommentIdQuery__
 *
 * To run a query within a React component, call `useFindRepliesWithCommentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useFindRepliesWithCommentIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFindRepliesWithCommentIdQuery({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useFindRepliesWithCommentIdQuery(baseOptions: Apollo.QueryHookOptions<FindRepliesWithCommentIdQuery, FindRepliesWithCommentIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FindRepliesWithCommentIdQuery, FindRepliesWithCommentIdQueryVariables>(FindRepliesWithCommentIdDocument, options);
      }
export function useFindRepliesWithCommentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FindRepliesWithCommentIdQuery, FindRepliesWithCommentIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FindRepliesWithCommentIdQuery, FindRepliesWithCommentIdQueryVariables>(FindRepliesWithCommentIdDocument, options);
        }
export type FindRepliesWithCommentIdQueryHookResult = ReturnType<typeof useFindRepliesWithCommentIdQuery>;
export type FindRepliesWithCommentIdLazyQueryHookResult = ReturnType<typeof useFindRepliesWithCommentIdLazyQuery>;
export type FindRepliesWithCommentIdQueryResult = Apollo.QueryResult<FindRepliesWithCommentIdQuery, FindRepliesWithCommentIdQueryVariables>;
export const GetPostsDocument = gql`
    query GetPosts($search: String!) {
  getPosts(search: $search) {
    id
    text
    userId
    title
    createdAt
    user {
      name
    }
  }
}
    `;

/**
 * __useGetPostsQuery__
 *
 * To run a query within a React component, call `useGetPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostsQuery({
 *   variables: {
 *      search: // value for 'search'
 *   },
 * });
 */
export function useGetPostsQuery(baseOptions: Apollo.QueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
      }
export function useGetPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostsQuery, GetPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPostsQuery, GetPostsQueryVariables>(GetPostsDocument, options);
        }
export type GetPostsQueryHookResult = ReturnType<typeof useGetPostsQuery>;
export type GetPostsLazyQueryHookResult = ReturnType<typeof useGetPostsLazyQuery>;
export type GetPostsQueryResult = Apollo.QueryResult<GetPostsQuery, GetPostsQueryVariables>;