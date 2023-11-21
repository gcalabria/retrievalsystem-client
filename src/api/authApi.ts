import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store/store';

const BASE_API_URL = 'http://localhost:5000/api/v1';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface User {
  id: number;
  email: string;
}

export interface IFetchTokensRequest {
  email: string;
  password: string;
}

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { getState, endpoint }) => {
    const tokens = (getState() as RootState).auth.tokens;

    if (tokens?.access_token && endpoint !== 'fetchTokens') {
      headers.set('Authorization', `Bearer ${tokens.access_token}`);
    }
    return headers;
  },
});

export const api = createApi({
  baseQuery,
  endpoints: (builder) => ({
    fetchTokens: builder.mutation<Tokens, IFetchTokensRequest>({
      query: ({ email, password }) => ({
        url: '/tokens',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      }),
    }),
    fetchUser: builder.mutation<User, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
    fetchConfigs: builder.mutation<unknown, void>({
      query: () => ({
        url: '/configs',
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useFetchTokensMutation,
  useFetchUserMutation,
  useFetchConfigsMutation,
} = api;
