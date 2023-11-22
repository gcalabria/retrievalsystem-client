import { baseApi } from './api';

export interface User {
  id: number;
  email: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<User, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchUserQuery } = userApi;
