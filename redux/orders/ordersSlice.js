import { createSlice } from '@reduxjs/toolkit';
import { fetchAbsentOrders, fetchOrders } from './ordersOperations';

export const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    products: [],
    phone: null,
    email: null,
    username: null,
    userSurname: null,
    userComment: null,
    userType: null,
    productId:null
  },
  extraReducers: builder => {
    builder
      .addCase(fetchOrders.fulfilled, (state, action) => {
        const {
          products,
          phone,
          email,
          username,
          userSurname,
          userComment,
          userType,
        } = action.payload;
        state.products = products;
        state.phone = phone;
        state.email = email;
        state.username = username;
        state.userSurname = userSurname;
        state.userComment = userComment;
        state.userType = userType;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        console.error('Error fetching orders:', action.error);
      })
      .addCase(fetchAbsentOrders.fulfilled, (state, action) => {
        const { email, productId } = action.payload;
        state.email = email;
        state.productId = productId;
      })
      .addCase(fetchAbsentOrders.rejected, (state, action) => {
        console.error('Error fetching orders:', action.error);
      });
  },
});


export const ordersReducer = ordersSlice.reducer;
