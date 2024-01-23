import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      const cartItem = state.data.find(item => item.id === action.payload.id);
      if (cartItem) {
        const cartItem = state.data.map(item => {
          if (item.id === action.payload.id) {
            const newQuantity = item.quantity + action.payload.quantity;
            const newTotalPrice = newQuantity * item.price.value;
            return {
              ...item,
              quantity: newQuantity,
              totalPrice: newTotalPrice,
            };
          } else {
            return item;
          }
        });
        state.data = cartItem;
      } else {
        state.data.push(action.payload);
      }
    },
    removeFromCart(state, action) {
      const cartItem = state.data.filter(item => item.id !== action.payload.id);
      state.data = cartItem;
    },
    changeQuantity(state, action) {
      const cartItem = state.data.map(item => {
        if (item.id === action.payload.id) {
          let newQuantity = item.quantity;
          let newTotalPrice = item.totalPrice;
          if (action.payload.type === 'INC') {
            newQuantity = newQuantity + 1;
            newTotalPrice = newQuantity * item.price.value;
          }
          if (action.payload.type === 'DEC') {
            newQuantity = newQuantity - 1;
            if (newQuantity < 1) {
              newQuantity = 1;
            }
            newTotalPrice = newQuantity * item.price.value;
          }
          return { ...item, quantity: newQuantity, totalPrice: newTotalPrice };
        } else {
          return item;
        }
      });
      state.data = cartItem;
    },
    getCartTotal(state) {
      state.totalAmount = state.data
        .map(item => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      state.totalItems = state.data
        .map(item => item.quantity)
        .reduce((prev, curr) => prev + curr, 0);
    },

    clearTheCart(state) {
      return {
        data: [],
        totalItems: 0,
        totalAmount: 0,
      };
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  changeQuantity,
  getCartTotal,
  clearTheCart,
} = cartSlice.actions;

export const cartReducer = cartSlice.reducer;
