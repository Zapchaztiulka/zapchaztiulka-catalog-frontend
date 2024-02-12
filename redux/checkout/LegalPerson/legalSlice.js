import { createSlice } from '@reduxjs/toolkit';

const checkoutSliceLegal = createSlice({
  name: 'checkoutLegal',
  initialState: {
    emailLegal: '',
    phoneLegal: '',
    usernameLegal: '',
    userSurnameLegal: '',
    userMiddleNameLegal: '',
    userTypeLegal: '',
    legalEntityData: {
      companyName: '',
      companyCode: '',
      entrepreneurCode: '',
      companyCity: '',
      companyAddress: '',
    },
    deliveryMethodIdLegal: '',
    deliveryRegionLegal: '',
    deliveryDistrictLegal: '',
    deliveryOfficeLegal: '',
    deliveryCityLegal: '',
    deliveryAddressLegal: '',
    deliveryRateLegal: '',
    userCommentLegal: '',
    selectedCityLegal: '',
    cityRefLegal: '',
    deliveryStreetLegal: '',
    deliverHouseLegal: '',
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
        emailLegal: '',
        phoneLegal: '',
        usernameLegal: '',
        userSurnameLegal: '',
        userMiddleNameLegal: '',
        userTypeLegal: '',
        legalEntityData: {
          companyName: '',
          companyCode: '',
          entrepreneurCode: '',
          companyRegion: '',
          companyCity: '',
          companyAddress: '',
        },
        deliveryMethodIdLegal: '',
        deliveryRegionLegal: '',
        deliveryDistrictLegal: '',
        deliveryOfficeLegal: '',
        deliveryCityLegal: '',
        deliveryAddressLegal: '',
        deliveryRateLegal: '',
        userCommentLegal: '',
        selectedCityLegal: '',
        cityRefLegal: '',
        deliveryStreetLegal: '',
        deliverHouseLegal: '',
      };
    },
  },
});

export const { addToCheckoutLegal, clearCheckoutLegal } = checkoutSliceLegal.actions;

export const checkoutReducerLegal = checkoutSliceLegal.reducer;
