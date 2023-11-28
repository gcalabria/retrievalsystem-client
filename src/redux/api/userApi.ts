import { isFetchBaseQueryError } from '../../utils/errors';
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
          if (isFetchBaseQueryError(err)) {
            // you can access all properties of `FetchBaseQueryError` here
            if (err.status === 401) {
              localStorage.removeItem('accessToken');
            }
          }
        }
      },
      providesTags: ['User'],
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
