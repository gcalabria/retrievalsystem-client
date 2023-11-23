import { setUser } from '../slices/authSlice';
import { baseApi } from './api';

export interface User {
  id: number;
  email: string;
  roles: string[];
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<User, void>({
      query: () => ({
        url: '/me',
        method: 'GET',
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          dispatch(setUser(user));
        } catch (err) {
          console.error(err);
        }
      },
    }),
  }),
});

export const { useFetchUserQuery, useLazyFetchUserQuery } = userApi;
