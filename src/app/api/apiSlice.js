import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3500'}),
tgTypes: ['Note', 'User','Payment'],
endpoints: builder =>({})

})