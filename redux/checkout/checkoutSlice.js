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
    legalEntityData: {
      companyName: '',
      companyCode: '',
      companyRegion: 'Оберіть значення...',
      companyCity: 'Оберіть значення...',
      companyAddress: '',
    },
    deliveryMethodId: '',
    deliveryRegion: '',
    deliveryDistrict: '',
    deliveryOffice: 'Оберіть значення...',
    deliveryCity: 'Оберіть значення...',
    deliveryAddress: '',
    deliveryRate: '',
    userComment: '',
  },
  reducers: {
    addToCheckout(state, action) {
      const { field, value } = action.payload;
      return {
        ...state,
        [field]: value,
      }
    },
    //     getCheckout(state) {
    //     },
    clearCheckout(state) {
      return {
        email: '',
        phone: '',
        username: '',
        userSurname: '',
        userMiddleName: '',
        userType: 'individual',
        legalEntityData: {
          companyName: '',
          companyCode: '',
          companyRegion: 'Оберіть значення...',
          companyCity: 'Оберіть значення...',
          companyAddress: '',
        },
        deliveryMethodId: '',
        deliveryRegion: '',
        deliveryDistrict: '',
        deliveryOffice: 'Оберіть значення...',
        deliveryCity: 'Оберіть значення...',
        deliveryAddress: '',
        deliveryRate: '',
        userComment: '',
      };
    },
  },
});

export const {
    addToCheckout,
  clearCheckout,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
