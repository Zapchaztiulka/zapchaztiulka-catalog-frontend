
export const selectProducts = (state) => state.products;
export const selectProduct = (state) => state.products.productById;
export const selectProductsByQuery = (state) => state.products;
export const selectIsLoading = state => state.products.isLoading;
export const selectError = state => state.products.error;

