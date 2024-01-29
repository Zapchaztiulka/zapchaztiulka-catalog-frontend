import { getData } from '@/services/PostsApi/novaPoshtaApi';
import { createAsyncThunk } from '@reduxjs/toolkit';


export const fetchDepartments = createAsyncThunk(
  'departments/getDepartments',
  async (body, thunkApi) => {
    try {
      const res = await getData(body);

      if (res.data?.length === '0') {
        throw new Error(`Failed, no results.`);
      }

      return res;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);