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
      switch (action.payload.type) {
        case 'username':
          state.username = action.payload.value;
          break;
        case 'userSurname':
          state.userSurname = action.payload.value;
          break;
        case 'userMiddleName':
          state.userMiddleName = action.payload.value;
          break;
      }
    },

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

export const { changeValueCheckout, clearThecheckout } = checkoutSlise.actions;

export const checkoutReducer = checkoutSlise.reducer;
