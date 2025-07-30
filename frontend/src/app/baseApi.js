import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_URL,
    credentials: 'include',
    prepareHeaders: (headers, { endpoint }) => {
      const noAuthEndpoints = ['login', 'register']
      if (!noAuthEndpoints.includes(endpoint)) {
        const token = localStorage.getItem('userAcssesToken')
        if (token) {
          headers.set('Authorization', `Bearer ${token}`)
        }
      }
      return headers
    },
  }),
  endpoints: () => ({}),
})

export default baseApi
