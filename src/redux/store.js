import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import { productsApi } from "./ProductsSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [productsApi.reducerPath]: productsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});
