import { setToken, setUser } from '../slices/authSlice';
import { baseApi } from './api';

export interface IFetchTokensResponse {
  access_token: string;
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
    signIn: builder.mutation<IFetchTokensResponse, IFetchTokensRequest>({
      query: ({ email, password }) => ({
        url: '/tokens',
        method: 'POST',
        credentials: 'include',
        headers: {
          Authorization: `Basic ${btoa(`${email}:${password}`)}`,
        },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { access_token },
          } = await queryFulfilled;
          dispatch(setToken(access_token));
          localStorage.setItem('accessToken', access_token);
        } catch (err) {
          console.error(err);
        }
      },
    }),
    signOut: builder.mutation<IDeleteTokensResponse, void>({
      query: () => ({
        url: '/tokens',
        method: 'DELETE',
        credentials: 'include',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(setUser(null));
          dispatch(setToken(''));
          localStorage.removeItem('accessToken');
        } catch (err) {
          console.error(err);
        }
      },
    }),

    refreshTokens: builder.mutation<IFetchTokensResponse, string>({
      // TODO:  this should get a new access token
      query: (token: string) => ({
        url: '/tokens',
        method: 'PUT',
        credentials: 'include',
        body: { access_token: token },
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const {
            data: { access_token },
          } = await queryFulfilled;
          dispatch(setToken(access_token));
          localStorage.setItem('accessToken', access_token);
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const {
  useSignInMutation,
  useSignOutMutation,
  useRefreshTokensMutation,
} = authApi;
