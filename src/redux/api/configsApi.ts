import { baseApi } from './api';

export interface User {
  id: number;
  email: string;
}

export const configsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchConfigs: builder.query<User, void>({
      query: () => ({
        url: '/configs',
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchConfigsQuery, useLazyFetchConfigsQuery } = configsApi;
