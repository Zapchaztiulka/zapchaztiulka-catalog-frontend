import { createSlice } from '@reduxjs/toolkit';

const checkoutSliceLegal = createSlice({
  name: 'checkoutLegal',
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
    addToCheckoutLegal(state, action) {
      const { field, value } = action.payload;
      if (field.startsWith('legalEntityData')) {
        const nestedField = field.split('.').slice(1);
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
    clearCheckoutLegal(state) {
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

export const { addToCheckoutLegal, clearCheckoutLegal } = checkoutSliceLegal.actions;

export const checkoutReducerLegal = checkoutSliceLegal.reducer;
