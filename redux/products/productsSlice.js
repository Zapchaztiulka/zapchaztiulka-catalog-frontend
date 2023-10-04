import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProductByID, fetchProductsByQuery } from './productsOperations';

const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error =  payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsByQuery:[],
    productById: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          products: action.payload,
        };
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductByID.pending, handlePending)
      .addCase(fetchProductByID.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          productById: action.payload,
        };
      })
      .addCase(fetchProductByID.rejected, handleRejected)
      .addCase(fetchProductsByQuery.pending, handlePending)
      .addCase(fetchProductsByQuery.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          error: null,
          productsByQuery: action.payload,
        };
      });
  },
});

export const productsReducer = productsSlice.reducer;