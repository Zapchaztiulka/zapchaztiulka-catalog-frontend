import { configureStore, combineReducers } from '@reduxjs/toolkit';
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
import { productsReducer } from './products/productsSlice';
import { categoriesReducer } from './categories/categoriesSlice';
import { filterReducer } from './filterSlice';
import { cartReducer } from './cart/cartSlice';
import { storage } from './index';
import selectedReducer from './sortProduct/selectOptionReducer';
import { patternsReducer } from './patterns/patternsSlice';
import { departmentsReducer } from './delivery/NovaPoshta/novaPoshtaSlice';
import { ordersReducer } from './orders/ordersSlice';
import { checkoutReducer } from './checkout/checkoutSlice';
import { checkoutReducerLegal } from './checkout/LegalPerson/legalSlice';

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  categories: categoriesReducer,
  cart: cartReducer,
  selected: selectedReducer,
  patterns: patternsReducer,
  departments: departmentsReducer,
  orders: ordersReducer,
  checkout: checkoutReducer,
  checkoutLegal: checkoutReducerLegal,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
