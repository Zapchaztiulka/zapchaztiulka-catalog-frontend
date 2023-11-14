import { createSelector } from "@reduxjs/toolkit";
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.productById;
export const selectProductsByQuery = (state) => state.products.productsByQuery;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectFilter = (state) => state.filter
export const selectFilterMinPrice = (state) => state.filter.minPrice;
export const selectFilterMaxPrice = (state) => state.filter.maxPrice;
export const selectFilterSubCategory = (state) => state.filter.subcategoryName;
export const selectFilterByCountry = (state) => state.filter.countryArr;
export const selectCountryPriceTrademark = (state) => state.products.productInfo;

export const selectFiltredByPrice = createSelector(
  [selectFilter, selectProducts],
  ({ minPrice, maxPrice }, products) => {
    if (minPrice > 0 || maxPrice > 0) {
      const arr = products?.products?.filter(
        (item) => item.price.value >= minPrice && item.price.value <= maxPrice
      );
      const obj = {
        arrtest: arr,
        count: arr.length
      }
      return obj;
    }
    return products.products;
  }
);

export const selectFiltred = createSelector(
  [selectFilterByCountry, selectProductsByQuery, selectProducts],
  (countryArr, { products }, cards) => {
    if (countryArr !== undefined) {
      const filtredResult = products?.filter((product) =>
        countryArr?.some((item) => item === product.manufacturer.country)
      );
      return filtredResult;
    }  
    return cards.products
  }
);