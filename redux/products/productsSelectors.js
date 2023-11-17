import { createSelector } from "@reduxjs/toolkit";
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.productById;
export const selectAllProducts = state => state.products.allProducts;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectFilter = (state) => state.filter
export const selectFilterSubCategory = (state) => state.filter.subcategoryName;
export const selectFilterByCountry = (state) => state.filter.countryArr;
export const selectFilterByTrademarks = state => state.filter.trademarksArr;
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

