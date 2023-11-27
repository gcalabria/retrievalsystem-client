import { baseApi } from './api';

// TODO: make naming consistent (IUser vs. User)

/**
 * The data in the server is usually organized as follows:
 *
 * retrievalsystem
 * └── data
 *     ├── database_1
 *     │   ├── model_1
 *     │   |   └── index_1
 *     │   ├── model_2
 *     │   │   ├── index_1
 *     │   │   └── index_2
 *     │   │
 *     │   └── model_3
 *     │       └── ...
 *     └── database_2
 *         └── model_1
 *             └── index_1
 *
 * IFolderStructure is a representation of the above structure.
 * For more information, access:
 * https://gitlab.hrz.tu-chemnitz.de/ddsg/pol/retrievalsystem/-/wikis/How-to-add-new-data
 */

export interface IFolderStructure {
  [key: string]: {
    [key: string]: string[];
  };
}

export const folderStructureApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchFolderStructure: builder.query<IFolderStructure, void>({
      query: () => ({
        url: '/data-structure',
        method: 'GET',
      }),
      providesTags: ['FolderStructure'],
    }),
  }),
});

export const { useFetchFolderStructureQuery } = folderStructureApi;
