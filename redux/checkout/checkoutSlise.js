import { createSlice } from '@reduxjs/toolkit';

const checkoutSlise = createSlice({
  name: 'checkout',
  initialState: {
    email: '',
    phone: '',
    username: '',
    userSurname: '',
    userMiddleName: '',
    userType: 'company',
    typeDelivery: '',
    commentDelivery: '',
    legalEntityData: {
      companyName: '',
      companyCode: '',
      companyRegion: '',
      companyCity: '',
      companyAddress: '',
    },
    deliveryMethodId: 'np_courier',
    deliveryRegion: '',
    deliveryDistrict: '',
    deliveryOffice: '',
    deliveryCity: '',
    deliveryAddress: '',
    deliveryRate: '',
    userComment: '',
  },
  reducers: {
    //     addToCheckout(state) {
    //     },

    //     getCheckout(state) {
    //     },

    clearThecheckout(state) {
      return {
        email: '',
        phone: '',
        username: '',
        userSurname: '',
        userMiddleName: '',
        userType: 'company',
        typeDelivery: '',
        commentDelivery: '',
        legalEntityData: {
          companyName: '',
          companyCode: '',
          companyRegion: '',
          companyCity: '',
          companyAddress: '',
        },
        deliveryMethodId: 'np_courier',
        deliveryRegion: '',
        deliveryDistrict: '',
        deliveryOffice: '',
        deliveryCity: '',
        deliveryAddress: '',
        deliveryRate: '',
        userComment: '',
      };
    },
  },
});

export const {
  //   addToCheckout,
  //   getCheckout,
  clearThecheckout,
} = checkoutSlise.actions;

export const checkoutReducer = checkoutSlise.reducer;
