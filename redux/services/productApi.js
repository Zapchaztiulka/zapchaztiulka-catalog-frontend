import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "https://spares-backend-i2mq.onrender.com/api/"

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spares-backend-i2mq.onrender.com/api/",
  }),
refetchOnFocus: false,
  endpoints: (builder) => ({
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
         query: (arg) => {
           const { query, page } = arg;
        return {
          url: `products?`,
          params: { query, page },
        };

      }
    }),
  })
});

export const {  useGetProductByIdQuery, useGetCategoryQuery, useGetCategoryByIdQuery, useGetProductsBySearchQuery} = productApi;