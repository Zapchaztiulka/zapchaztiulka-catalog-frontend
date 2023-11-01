import { createSlice } from '@reduxjs/toolkit';

const initialPrice = {
  minPrice: null,
  maxPrice: null,
  subcategoryName: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState: initialPrice,
  reducers: {
    filterProductsMin(state, action) {
      return {
        ...state,
        minPrice: Number(action.payload)
      }
    },
    filterProductsMax(state, action) {
       return {
        ...state,
        maxPrice: Number(action.payload)
      }
    },
    filterProductsSubCategory(state, action) {
       return {
        ...state,
        subcategoryName: action.payload
      }
    },

  },
});

export const { filterProductsMin, filterProductsMax, filterProductsSubCategory } =
  filterSlice.actions;
export const filterReducer =  filterSlice.reducer;
