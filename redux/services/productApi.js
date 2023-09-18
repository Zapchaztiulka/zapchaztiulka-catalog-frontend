import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const url = "https://spares-backend-i2mq.onrender.com/api/"

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://spares-backend-i2mq.onrender.com/api/",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "products",
    }),
    getProductById: builder.query({
      query: (id) => `products/${id}`,
    }),
  })
});

export const { useGetProductsQuery, useGetProductByIdQuery} = productApi;