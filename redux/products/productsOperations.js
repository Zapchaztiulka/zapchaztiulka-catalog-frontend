import { getProducts } from "@/services/productApi";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://spares-backend-i2mq.onrender.com/api";

// export const fetchProducts = createAsyncThunk(
//   "products/fetchAll",
//   async (payload, { rejectWithValue }) => {
//     try {
//       const response = await getProducts();
//       console.log(response);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue(error);
//     }
//   }
// );

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

export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
       const response = await axios(`/products / ${ id }`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);


