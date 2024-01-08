import { createSlice } from '@reduxjs/toolkit';

// const getFromLocalStorage = () => {
//    if (typeof window !== 'undefined') {
//       const cart = localStorage.getItem('cart');
//   if (cart) {
//     return JSON.parse(localStorage.getItem('cart'));
//   } else {
//     return [];
//   }
//    }
// };

// const setToLocalStorage = data => {
//   localStorage.setItem('cart', JSON.stringify(data));
// };

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
    // data: getFromLocalStorage(),
    totalItems: 0,
    totalAmount: 0,
  },
  reducers: {
    addToCart(state, action) {
      console.log('state', state);
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
        // setToLocalStorage(state.data);
      } else {
        state.data.push(action.payload);
        // setToLocalStorage(state.data);
      }
    },
    removeFromCart(state, action) {
      const cartItem = state.data.filter(item => item.id !== action.payload);
      state.data = cartItem;
      // setToLocalStorage(state.data);
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
      // setToLocalStorage(state.data);
    },
    getCartTotal(state) {
      state.totalAmount = state.data
        .map(item => item.totalPrice)
        .reduce((prev, curr) => prev + curr, 0);
      state.totalItems = state.data.length;
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, getCartTotal } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;
