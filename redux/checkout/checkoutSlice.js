import { createSlice } from '@reduxjs/toolkit';

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState: {
    email: '',
    phone: '',
    username: '',
    userSurname: '',
    userMiddleName: '',
    userType: '',
    legalEntityData: {
      companyName: '',
      companyCode: '',
      companyRegion: '',
      companyCity: '',
      companyAddress: '',
    },
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
  },
  reducers: {
    addToCheckout(state, action) {
      const { field, value } = action.payload;
      if (field.startsWith('legalEntityData')) {
        const nestedField = field.split('.').slice(1); // Видаляємо "legalEntityData"
        return {
          ...state,
          legalEntityData: {
            ...state.legalEntityData,
            [nestedField]: value,
          },
        };
      } else {
        return {
          ...state,
          [field]: value,
        };
      }
    },
    clearCheckout(state) {
      return {
        email: '',
        phone: '',
        username: '',
        userSurname: '',
        userMiddleName: '',
        userType: '',
        legalEntityData: {
          companyName: '',
          companyCode: '',
          companyRegion: '',
          companyCity: '',
          companyAddress: '',
        },
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
      };
    },
  },
});

export const {
    addToCheckout,
  clearCheckout,
} = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
