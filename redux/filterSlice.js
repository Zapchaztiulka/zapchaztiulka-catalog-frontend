import { createSlice } from "@reduxjs/toolkit";

const initialFilter = {
  minPrice: null,
  maxPrice: null,
  subcategoryName: "",
  countryArr: [],
  trademarksArr: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialFilter,
  reducers: {
    filterProductsMin(state, action) {
      return {
        ...state,
        minPrice: Number(action.payload),
      };
    },
    filterProductsMax(state, action) {
      return {
        ...state,
        maxPrice: Number(action.payload),
      };
    },
  },
});

export const {
  filterProductsMin,
  filterProductsMax,
} = filterSlice.actions;
export const filterReducer = filterSlice.reducer;
