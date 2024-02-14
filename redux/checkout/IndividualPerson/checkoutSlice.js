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
    deliverySelf: '',
    deliveryCity: '',
    deliveryAddress: '',
    deliveryAddressNP: '',
    deliveryRate: '',
    userComment: '',
    selectedCity: '',
    cityRef: '',
    deliveryStreet: '',
    deliverHouse: '',
    deliveryStreetNP: '',
    deliverHouseNP: '',
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
        deliverySelf: '',
        deliveryCity: '',
        deliveryAddress: '',
        deliveryAddressNP: '',
        deliveryRate: '',
        userComment: '',
        selectedCity: '',
        cityRef: '',
        deliveryStreet: '',
        deliverHouse: '',
        deliveryStreetNP: '',
        deliverHouseNP: '',
      };
    },
  },
});

export const { addToCheckout, clearCheckout } = checkoutSlice.actions;

export const checkoutReducer = checkoutSlice.reducer;
