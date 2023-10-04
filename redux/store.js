import { configureStore } from '@reduxjs/toolkit';
import { productsReducer } from './products/productsSlice';
import { categoriesReducer } from './categories/categoriesSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    categories: categoriesReducer,
  },
});

