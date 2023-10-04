import { createSlice } from "@reduxjs/toolkit";
import { fetchCategories } from "./categoriesOperation";


const handlePending = state => {
  state.isLoading = true;
};
const handleRejected = (state, { payload }) => {
  state.isLoading = false;
  state.error =  payload;
};

const categoriesSlice = createSlice({
   name: "categories",
   initialState: {
      categories: [],
      isLoading: false,
    error: null,
   },
   extraReducers: (builder) => {
      builder
        .addCase(fetchCategories.pending, handlePending)
        .addCase(fetchCategories.fulfilled, (state, action) => {
       return {
         ...state,
         loading: false,
         error: null,
         categories: action.payload,
       };
     })
     .addCase(fetchCategories.rejected, handleRejected)
   }
})

export const categoriesReducer = categoriesSlice.reducer;