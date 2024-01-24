import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_PROD_URL;

export const fetchPatterns = createAsyncThunk(
  'options/patterns',
  async () => {
    const { data } = await axios.get(`api/options/patterns`);
    return data;
  }
);