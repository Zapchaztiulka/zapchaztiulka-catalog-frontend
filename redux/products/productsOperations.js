import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://spares-backend-i2mq.onrender.com/api";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ search = "", page = 1 }) => {
    const { data } = await axios.get(`/products?page=${page}&query=${search}`);
    return data;
  }
);

export const fetchProductByID = createAsyncThunk(
  "products/fetchProductByID",
  async (id) => {
    const { data } = await axios.get(`/products/${id}`);
    return data;
  }
);

export const fetchProductsByQuery = createAsyncThunk(
  "products/fetchProductsByQuery",
  async (limit ) => {
    const { data } = await axios.get(`/products?limit=${limit}`);
    return data;
  }
);
