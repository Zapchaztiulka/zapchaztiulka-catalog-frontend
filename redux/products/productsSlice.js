import { createSlice } from "@reduxjs/toolkit";
import {
  fetchProducts,
  fetchProductByID,
  fetchAllProducts,
} from "./productsOperations";

// const getFromLocalStorage = () => {
//   if (typeof window !== "undefined") {
//     const productItem = localStorage.getItem("productDetail");
//     if (productItem) {
//       return JSON.parse(localStorage.getItem("productDetail"));
//     } else {
//       return [];
//     }
//   }
// };

// const setToLocalStorage = (data) => {
//  localStorage.setItem("productDetail", JSON.stringify(data)); 
// };

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
      });
  },
});

export const productsReducer = productsSlice.reducer;
