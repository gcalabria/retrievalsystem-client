import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = 'http://localhost:5000/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && endpoint !== 'fetchTokens') {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
  },
});

// TODO: use this in production. retry is imported from @reduxjs/toolkit/query/react
// const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQuery,
  tagTypes: ['User', 'Auth'],

  endpoints: () => ({}),
});
