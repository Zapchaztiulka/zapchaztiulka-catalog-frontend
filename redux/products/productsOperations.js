import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (dataValue) => {
      const {
        page = 1,
        query = '',
        limit = 10,
        countries,
        trademarks,
        minPrice,
        maxPrice,
        categories,
        subcategories,
        sortBy='',
        sortType='',
      } = dataValue;
      const { data } = await axios.post(
        `/api/products?page=${page}&limit=${limit}&query=${query}&sortBy=${sortBy}&sortType=${sortType}`,
        { countries, trademarks, minPrice, maxPrice, subcategories, categories }
      );
      return data;
    } 
);

export const fetchProductByID = createAsyncThunk(
  'products/fetchProductByID',
  async id => {
    const { data } = await axios.get(`api/products/${id}`);
    return data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const { data } = await axios.post(`/api/products?`);
    return data;
  }
);

export const fetchCountryPriceTrademark = createAsyncThunk(
  'products/fetchCountryPriceTrademark',
  async (query) => {
    const { data } = await axios.get(
      `/api/products/filters/by-product-name?query=${query}`
    );
    return data;
  }
);

export const fetchTotalCount = createAsyncThunk(
  'products/fetchTotalCount',
  async dataValue => {
    const {
      page = 1,
      query = '',
      limit = 10,
      countries,
      trademarks,
      minPrice,
      maxPrice,
      categories,
      subcategories,
    } = dataValue;
    const { data } = await axios.post(
      `/api/products?page=${page}&limit=${limit}&query=${query}`,
      { countries, trademarks, minPrice, maxPrice, categories, subcategories }
    );
    return data;
  }
);