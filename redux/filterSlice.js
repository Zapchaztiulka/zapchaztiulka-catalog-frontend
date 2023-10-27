import { createSlice } from '@reduxjs/toolkit';

const initialPrice = {
  minPrice: null,
  maxPrice: null
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
    }
  },
});

export const { filterProductsMin, filterProductsMax } = filterSlice.actions;
export const filterReducer =  filterSlice.reducer;
