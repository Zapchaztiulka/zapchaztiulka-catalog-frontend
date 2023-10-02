import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { productApi } from "./services/productApi";
import { productsReducer } from "./products/productsSlice";

export function makeStore() {
  return configureStore({
    reducer: {
      [productApi.reducerPath]: productApi.reducer,
      products: productsReducer,
     
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({serializableCheck: false}).concat([productApi.middleware]),
  });
}

const store = makeStore();
setupListeners(store.dispatch);

export default store;