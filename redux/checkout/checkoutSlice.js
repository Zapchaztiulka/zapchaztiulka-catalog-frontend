import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    email: '',
    phone: '',
    username: '',
    userSurname: '',
    userMiddleName: '',
    userType: 'individual',
    deliveryMethodId: '',
    deliveryRegion: '',
    deliveryDistrict: '',
    deliveryOffice: '',
    deliveryCity: '',
    deliveryAddress: '',
    deliveryRate: '',
    userComment: '',
    selectedCity: '',
    cityRef: '',
    deliveryStreet: '',
    deliverHouse:''
  },
  reducers: {
    addToCheckout(state, action) {
      const { field, value } = action.payload;

        return {
          ...state,
          [field]: value,
        };
      
    },
    clearCheckout(state) {
      return {
        email: '',
        phone: '',
        username: '',
        userSurname: '',
        userMiddleName: '',
        userType: '',
        deliveryMethodId: '',
        deliveryRegion: '',
        deliveryDistrict: '',
        deliveryOffice: '',
        deliveryCity: '',
        deliveryAddress: '',
        deliveryRate: '',
        userComment: '',
        selectedCity: '',
        cityRef: '',
        deliveryStreet: '',
        deliverHouse: '',
      };
    },
  },
});

export const { addToCheckout, clearCheckout } = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
