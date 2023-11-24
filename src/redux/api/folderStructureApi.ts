import { baseApi } from './api';

// TODO: make naming consistent (IUser vs. User)

export interface IFolderStructure {
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

// TODO: make naming consistent (data-structre vs. folder-structure)

export const folderStructureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchFolderStructure: builder.query<IFolderStructure, void>({
      query: () => ({
        url: '/data-structure',
        method: 'GET',
      }),
    }),
  }),
});

export const { useFetchFolderStructureQuery } = folderStructureApi;
