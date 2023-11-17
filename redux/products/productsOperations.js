import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = `https://spares-backend-i2mq.onrender.com/api`;

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (dataValue) => {
      const { page = 1, query = '', limit = 10, countries } = dataValue;
      const { data } = await axios.post(
        `/products?page=${page}&limit=${limit}&query=${query}`,
        { countries }
      );
      return data;
    } 
);

export const fetchProductByID = createAsyncThunk(
  'products/fetchProductByID',
  async id => {
    const { data } = await axios.get(`/products/${id}`);
    return data;
  }
);

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async () => {
    const { data } = await axios.post(`/products?`);
    return data;
  }
);

export const fetchCountryPriceTrademark = createAsyncThunk(
  'products/fetchCountryPriceTrademark',
  async () => {
    const { data } = await axios.get(`/products/filters/by-product-name`);
    return data;
  }
);
