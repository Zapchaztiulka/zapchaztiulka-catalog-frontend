import { createSelector } from "@reduxjs/toolkit";
export const selectProducts = (state) => state.products.products;
export const selectProduct = (state) => state.products.productById;
export const selectProductsByQuery = (state) => state.products.productsByQuery;
export const selectIsLoading = (state) => state.products.isLoading;
export const selectError = (state) => state.products.error;
export const selectFilter = (state) => state.filter;

export const selectVisibleProducts = createSelector(
  [selectFilter, selectProductsByQuery],
  (filter, productsByQuery) => {
    const normalizeFilter = filter?.trim().toLowerCase();

    return productsByQuery?.products?.filter((item) =>
      item.name.trim().toLowerCase().includes(normalizeFilter)
    );
  }
);