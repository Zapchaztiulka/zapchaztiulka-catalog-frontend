import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductByID,
  fetchAllProducts,
  fetchCountryPriceTrademark
} from "./productsOperations";

const handlePending = (state) => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error = payload;
};

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    productsByQuery: [],
    productById: null,
    productInfo: null,
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          products: action.payload,
        };
      })
      .addCase(fetchProducts.rejected, handleRejected)
      .addCase(fetchProductByID.pending, handlePending)
      .addCase(fetchProductByID.fulfilled, (state, action) => {
        // state.productById = action.payload;
        // state.isLoading = false;
        // state.error = null;
         return {
          ...state,
          isLoading: false,
          error: null,
          productById: action.payload,
        };
      })

      .addCase(fetchProductByID.rejected, handleRejected)
      .addCase(fetchAllProducts.pending, handlePending)
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          productsByQuery: action.payload,
        };
      })
      .addCase(fetchCountryPriceTrademark.pending, handlePending)
      .addCase(fetchCountryPriceTrademark.fulfilled, (state, action) => {
        return {
          ...state,
          isLoading: false,
          error: null,
          productInfo: action.payload,
        };
      })
      .addCase(fetchCountryPriceTrademark.rejected, handleRejected);
  },
});

export const productsReducer = productsSlice.reducer;
