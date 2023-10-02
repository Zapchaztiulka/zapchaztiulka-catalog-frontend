import { createSlice } from "@reduxjs/toolkit";
import { fetchProductById, fetchProducts } from './productsOperations';

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
    isLoading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, handlePending)
      .addCase(fetchProducts.fulfilled, (state, action) => {
         state.products = action.payload;
                 state.isLoading = false;
        state.error = null;
      })
       .addCase(fetchProducts.rejected, handleRejected)
  },
});

export const productsReducer = productsSlice.reducer;