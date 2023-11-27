import { baseApi } from './api';

export interface Configs {
  db_path: string;
  db_table_name: string;
  db_content_attribute_name: string;
  index_path: string;
  allowed_search_modes: {
    default: boolean;
    separated: boolean;
    url: boolean;
    file: boolean;
  };
}

export const configsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchConfigs: builder.query<Configs, void>({
      query: () => ({
        url: '/configs',
        method: 'GET',
      }),
      providesTags: ['Configs'],
    }),
  }),
});

export const { useFetchConfigsQuery, useLazyFetchConfigsQuery } = configsApi;
