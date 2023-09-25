import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "https://spares-backend-i2mq.onrender.com/api/"

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spares-backend-i2mq.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    // getProducts: builder.query({
    //   query: () => "products",
    // }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
    getCategory: builder.query({
      query: () => "categories",
    }),
    getCategoryById: builder.query({
      query: (id) => `categories/${id}`,
    }),
    getProductsBySearch: builder.query({
      query: (searchTerm) =>
        `products?page=1&limit=20&query=${searchTerm}`,
    }),
  })
});

export const {  useGetProductByIdQuery, useGetCategoryQuery, useGetCategoryByIdQuery, useGetProductsBySearchQuery} = productApi;