import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export const fetchOrders = createAsyncThunk(
  'orders/fetchOrders',
  async requestBody => {
    try {
      const { data } = await axios.post('/api/orders/any', requestBody);
      return data;
    } catch (error) {
      throw error;
    }
  }
);
