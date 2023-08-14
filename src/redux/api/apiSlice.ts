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
  tagTypes: ["reviews", "wishlist"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => `/books`,
      providesTags: ["reviews", "wishlist"],
    }),
    getBooks: builder.query({
      query: () => "/books?limit=10",
      providesTags: ["reviews", "wishlist"],
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
        url: "/wishlist/add-to-wishlist",
        method: "POST",
        body: wishListData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    addToReadingList: builder.mutation({
      query: (wishListData) => ({
        url: "/wishlist/add-to-reading-list",
        method: "PATCH",
        body: wishListData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    getAllWishListBooks: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),
    getMyWishListBooks: builder.query({
      query: () => "/wishlist/my-wishlist",
      providesTags: ["wishlist"],
    }),
    getMyReadingListBooks: builder.query({
      query: () => "/wishlist/my-reading-list",
      providesTags: ["wishlist"],
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
  useGetMyWishListBooksQuery,
  useAddToReadingListMutation,
  useGetMyReadingListBooksQuery,
} = api;
