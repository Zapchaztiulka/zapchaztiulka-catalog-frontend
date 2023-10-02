import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://spares-backend-i2mq.onrender.com/api";


export const fetchProducts = createAsyncThunk(
  "products/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios("/products");
      console.log(response)
       return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);




