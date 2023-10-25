import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterProducts(state, action) {
      return (state = action.payload);
    },
  },
});

export const { filterProducts } = filterSlice.actions;
export const filterReducer =  filterSlice.reducer;
