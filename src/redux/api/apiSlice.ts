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

    // get leatest 10 books api [GET]
    getBooks: builder.query({
      query: () => "/books?limit=10",
      providesTags: ["reviews", "wishlist"],
    }),

    //get single book api by book id [GET]
    getSingleBook: builder.query({
      query: (id) => `/books/${id}`,
      providesTags: ["reviews"],
    }),

    // sign up user api [POST]
    signUpUser: builder.mutation({
      query: (userData) => ({
        url: "/users/signup",
        method: "POST",
        body: userData,
      }),
    }),

    // sign in user api [POST]
    signInUser: builder.mutation({
      query: (userData) => ({
        url: "/auth/signin",
        method: "POST",
        body: userData,
      }),
    }),

    //add book api [POST]
    addBook: builder.mutation({
      query: (bookData) => ({
        url: "/books/create-book",
        method: "POST",
        body: bookData,
      }),
    }),

    //update book api [PATCH]
    updateBook: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
    }),

    //add review api [PATCH]
    review: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/books/review/${id}`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["reviews"],
    }),

    //delete book api [DELETE]
    deleteBook: builder.mutation({
      query: (id) => ({
        url: `/books/${id}`,
        method: "DELETE",
      }),
    }),

    //add to wishlist api[POST]
    addToWishList: builder.mutation({
      query: (wishListData) => ({
        url: "/wishlist/add-to-wishlist",
        method: "POST",
        body: wishListData,
      }),
      invalidatesTags: ["wishlist"],
    }),

    //add to reading list api[POST]
    addToReadingList: builder.mutation({
      query: (readingListData) => ({
        url: "/wishlist/add-to-reading-list",
        method: "POST",
        body: readingListData,
      }),
      invalidatesTags: ["wishlist"],
    }),
    //unused api
    getAllWishListBooks: builder.query({
      query: () => "/wishlist",
      providesTags: ["wishlist"],
    }),

    //get my wishlist books api [by user]
    getMyWishListBooks: builder.query({
      query: () => "/wishlist/my-wishlist",
      providesTags: ["wishlist"],
    }),

    //get my reading list books api [by user]
    getMyReadingListBooks: builder.query({
      query: () => "/wishlist/my-reading-list",
      providesTags: ["wishlist"],
    }),

    //get my completed list books api [by user]
    getMyCompletedListBooks: builder.query({
      query: () => "/wishlist/my-completed-list",
      providesTags: ["wishlist"],
    }),

    markASRead: builder.mutation({
      query: (updatedData) => ({
        url: `/wishlist/my-reading-list/mark-as-read`,
        method: "PATCH",
        body: updatedData,
      }),
      invalidatesTags: ["wishlist"],
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
  useMarkASReadMutation,
  useGetMyCompletedListBooksQuery,
} = api;
