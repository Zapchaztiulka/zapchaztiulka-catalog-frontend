import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { productsReducer } from "./products/productsSlice";
import { categoriesReducer } from "./categories/categoriesSlice";
import { filterReducer } from "./filterSlice";
import { cartReducer } from "./cart/cartSlice";
import { storage } from './index';
import selectedReducer from "./sortProduct/selectOptionReducer";

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  selected: selectedReducer,
});

const persistConfig = {
  key: "root",
  storage, 
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
