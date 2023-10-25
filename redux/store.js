import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './products/productsSlice';
import { categoriesReducer } from './categories/categoriesSlice';
import { filterReducer } from './filterSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filter: filterReducer,
    categories: categoriesReducer,
    
  },
});

