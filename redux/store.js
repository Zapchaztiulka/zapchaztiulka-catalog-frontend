import { configureStore, combineReducers } from "@reduxjs/toolkit";
import storage from "./customStorage";
import logger from "redux-logger";
import { persistReducer } from "redux-persist";
import { productsReducer } from "./products/productsSlice";
import { categoriesReducer } from "./categories/categoriesSlice";
import { filterReducer } from "./filterSlice";

const rootReducer = combineReducers({
  products: productsReducer,
  filter: filterReducer,
  categories: categoriesReducer,
});

const persistConfig = {
  key: "root",
  storage,
  
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
