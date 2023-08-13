import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["reviews"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
    }),
    getBooks: builder.query({
      query: () => "/books?limit=10",
    }),
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["reviews"],
    }),
    signUpUser: builder.mutation({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),
    signInUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signin",
        method: "POST",
        body: userData,
      }),
    }),
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books/create-book",
        method: "POST",
        body: bookData,
      }),
    }),
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),
    review: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["reviews"],
    }),
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),
    addToWishList: builder.mutation({
      query: (wishListData) => ({
        url: "/wishlist/add",
        method: "POST",
        body: wishListData,
      }),
    }),
    getAllWishListBooks: builder.query({
      query: () => "/wishlist",
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetSingleBookQuery,
  useGetAllBooksQuery,
  useSignUpUserMutation,
  useSignInUserMutation,
  useAddBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useReviewMutation,
  useAddToWishListMutation,
  useGetAllWishListBooksQuery,
} = api;
