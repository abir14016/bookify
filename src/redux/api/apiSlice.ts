import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api/v1/" }),
  endpoints: (builder) => ({
    getBooks: builder.query({
      query: () => "/books?limit=10",
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
    }),
  }),
});

export const { useGetBooksQuery, useGetSingleBookQuery } = api;
