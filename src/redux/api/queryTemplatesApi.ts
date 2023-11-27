/* eslint-disable @typescript-eslint/no-unused-vars */
import { baseApi } from './api';

export interface IQueryTemplate {
  id: number;
  model: string;
  language: string;
  name: string;
  text: string;
  index: string;
  code?: string;
  equation?: string;
  url?: string;
  mode: string;
  database: string;
}

export const defaultQueryTemplate: IQueryTemplate = {
  id: 0,
  model: '',
  language: '',
  name: '',
  text: '',
  index: '',
  code: '',
  equation: '',
  mode: '',
  url: '',
  database: '',
};

export interface IPagination {
  after: string;
  count: number;
  limit: number;
  offset: number;
  total: number;
}

// TODO: consider using omit in other places
type ICreateQueryTemplateRequest = Omit<IQueryTemplate, 'id'>;

type ICreateQueryTemplateResponse = IQueryTemplate;

type IDeleteQueryTemplateResponse = IQueryTemplate;

type IFetchQueryTemplatesResponse = {
  data: IQueryTemplate[];
  pagination: IPagination;
};

export const queryTemplatesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createQueryTemplate: builder.mutation<
      ICreateQueryTemplateResponse,
      ICreateQueryTemplateRequest
    >({
      query: (data: ICreateQueryTemplateRequest) => ({
        url: '/query-templates',
        method: 'POST',
        body: data,
      }),
    }),
    fetchQueryTemplates: builder.query<
      IFetchQueryTemplatesResponse,
      { userId: number; pagination: Partial<IPagination> }
    >({
      query: ({ userId, pagination }) => ({
        url: `/users/${userId}/query-templates?offset=${pagination.offset}`,
        method: 'GET',
      }),
    }),
    deleteQueryTemplate: builder.mutation<IDeleteQueryTemplateResponse, number>(
      {
        query: (id: number) => ({
          url: `/query-templates/${id}`,
          method: 'DELETE',
        }),
      },
    ),
  }),
});

export const {
  useFetchQueryTemplatesQuery,
  useCreateQueryTemplateMutation,
  useDeleteQueryTemplateMutation,
} = queryTemplatesApi;
