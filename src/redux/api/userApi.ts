import { setUser } from '../slices/authSlice';
import { baseApi } from './api';

export interface IUser {
  id: number;
  email: string;
  roles: string[];
}

export interface IRegisterUserRequest {
  email: string;
  password: string;
}

export const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUser: builder.query<IUser, void>({
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
    registerUser: builder.mutation<IUser, IRegisterUserRequest>({
      query: (data) => ({
        url: '/users',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useFetchUserQuery,
  useLazyFetchUserQuery,
  useRegisterUserMutation,
} = userApi;
