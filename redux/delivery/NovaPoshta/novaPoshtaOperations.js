import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const apiUrl = process.env.NEXT_PUBLIC_NOVAPOSHTA_URL;
const apiKey = process.env.NEXT_PUBLIC_NOVAPOSHTA_API_KEY;

export const fetchSettlements = createAsyncThunk(
  'departments/getSettlements',
  async (cityName) => {
    try {
      const { data } = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'searchSettlements',
        methodProperties: {
          CityName: cityName,
          Limit: '50',
          Page: '1',
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchWarehouses = createAsyncThunk(
  'departments/getWarehouses',
  async сityRef => {
    try {
      const { data } = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
        methodProperties: {
          CityRef: сityRef,
          Limit: '50',
          Page: '1',
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);