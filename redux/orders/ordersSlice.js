// ordersSlice.js
import { createSlice } from '@reduxjs/toolkit';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    products: [],
    phone: null,
    email: null,
    username: null,
    userSurname: null,
    userComment: null,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setUserSurname: (state, action) => {
      state.userSurname = action.payload;
    },
    setUserComment: (state, action) => {
      state.userComment = action.payload;
    },
  },
});

export const {
  setProducts,
  setPhone,
  setEmail,
  setUsername,
  setUserSurname,
  setUserComment,
} = ordersSlice.actions;

export const ordersReducer = ordersSlice.reducer;
