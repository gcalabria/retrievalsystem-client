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
    logout: builder.mutation<IDeleteTokensResponse, void>({
      query: () => ({
        url: '/tokens',
        method: 'DELETE',
      }),
      async onQueryStarted() {
        setUser(null);
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
