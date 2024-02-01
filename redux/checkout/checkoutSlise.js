import { createSlice } from '@reduxjs/toolkit';

const checkoutSlise = createSlice({
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
    deliveryMethodId: 'np',
    deliveryRegion: '',
    deliveryDistrict: '',
    deliveryOffice: 'Оберіть значення...',
    deliveryCity: 'Оберіть значення...',
    deliveryAddress: '',
    deliveryRate: '',
    userComment: '',
  },
  reducers: {
    changeValueCheckout(state, action) {
      if (action.payload.type === 'username') {
        console.log('action.payload.value =', action.payload.value);
        state.username = action.payload.value;
      }
    },

    //     getCheckout(state) {
    //     },

    clearThecheckout(state) {
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
        deliveryMethodId: 'np',
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
  changeValueCheckout,
  //   getCheckout,
  clearThecheckout,
} = checkoutSlise.actions;

export const checkoutReducer = checkoutSlise.reducer;
