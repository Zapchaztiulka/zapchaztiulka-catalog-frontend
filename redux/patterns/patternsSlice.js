import { createSlice } from "@reduxjs/toolkit";
import { fetchPatterns } from "./patternsAction";

const patternsSlice = createSlice({
  name: 'patterns',
  initialState: {
    patterns: [],
  },
   extraReducers: builder => {
     builder.addCase(fetchPatterns.fulfilled, (state, action) => {
        return {
          ...state,
          products: action.payload,
        };
      })
  },
});

export const patternsReducer = patternsSlice.reducer;