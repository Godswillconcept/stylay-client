// src/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./features/cart/slice.js";

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
});

export default store;
