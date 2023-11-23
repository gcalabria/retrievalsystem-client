import { setUser } from '../slices/authSlice';
import { baseApi } from './api';
import { userApi } from './userApi';

export interface Tokens {
  access_token: string;
  refresh_token: string;
}

export interface IFetchTokensRequest {
  email: string;
  password: string;
}

export interface IDeleteTokensResponse {
  message: string;
  status: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<Tokens, IFetchTokensRequest>({
      query: ({ email, password }) => ({
        url: '/tokens',
        method: 'POST',
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApi.endpoints.fetchUser.initiate());
        } catch (error) {
          console.log(error);
        }
      },
    }),
    signOut: builder.mutation<IDeleteTokensResponse, void>({
      query: () => ({
        url: '/tokens',
        method: 'DELETE',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
          dispatch(setTokens(defaultTokens));
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        } catch (err) {
          console.error(err);
        }
      },
      }),

    refresh: builder.mutation<IFetchRefreshTokenResponse, void>({
      query: () => ({
        url: '/tokens',
        method: 'PUT',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { refresh_token } = data;
          dispatch(setRefreshToken(refresh_token));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
