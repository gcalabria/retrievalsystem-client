import { createApi, fetchBaseQuery, retry } from '@reduxjs/toolkit/query/react';

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

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

// TODO: consider implementing this
// const baseQueryWithReauth = async (args, api, extraOptions) => {
//   // console.log(args) // request url, method, body
//   // console.log(api) // signal, dispatch, getState()
//   // console.log(extraOptions) //custom like {shout: true}

//   let result = await baseQuery(args, api, extraOptions)

//   // If you want, handle other status codes, too
//   if (result?.error?.status === 403) {
//       console.log('sending refresh token')

//       // send refresh token to get new access token
//       const refreshResult = await baseQuery('/auth/refresh', api, extraOptions)

//       if (refreshResult?.data) {

//           // store the new token
//           api.dispatch(setCredentials({ ...refreshResult.data }))

//           // retry original query with new access token
//           result = await baseQuery(args, api, extraOptions)
//       } else {

//           if (refreshResult?.error?.status === 403) {
//               refreshResult.error.data.message = "Your login has expired."
//           }
//           return refreshResult
//       }
//   }

//   return result
// }

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
