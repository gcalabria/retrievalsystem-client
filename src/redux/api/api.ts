import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

const BASE_API_URL = 'http://localhost:5000/api/v1';

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_API_URL,
  prepareHeaders: (headers, { endpoint }) => {
    const accessToken = localStorage.getItem('accessToken');

    if (accessToken && endpoint !== 'fetchTokens') {
      console.log('using accessToken');
      headers.set('Authorization', `Bearer ${accessToken}`);
    } else {
      console.log('using basic auth');
    }
    return headers;
  },
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: baseQueryWithRetry,
  tagTypes: ['User', 'Auth'],

  endpoints: () => ({}),
});

// export const enhancedApi = api.enhanceEndpoints({
//   endpoints: () => ({
//     getPost: () => 'test',
//   }),
// })
