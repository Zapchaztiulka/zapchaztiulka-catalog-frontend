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
          Limit: '150',
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
  async ({ CityRef, FindByString }) => {
    try {
      const { data } = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getWarehouses',
       methodProperties: {
          CityRef: CityRef,         
          Page: 1,
          FindByString: FindByString,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchStreets = createAsyncThunk(
  'departments/getStreets',
  async ({ SettlementRef, StreetName }) => {
    try {
      const { data } = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'searchSettlementStreets',
        methodProperties: {
          SettlementRef: SettlementRef,         
          StreetName: StreetName,
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const fetchRegions = createAsyncThunk(
  'departments/getRegions',
  async () => {
    try {
      const { data } = await axios.post(apiUrl, {
        apiKey: apiKey,
        modelName: 'Address',
        calledMethod: 'getSettlementAreas',
        methodProperties: {
          Ref : ""
        },
      });
      return data;
    } catch (error) {
      throw error;
    }
  }
);

