import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./slices/userSlice";
import modalSlice from "./slices/modalSlice";
import authSlice from "./slices/authSlice";
import categorySlice from "./slices/categorySlice";
import tagSlice from "./slices/tagSlice";
import newsSlice from "./slices/newSlice";
import voucherSlice from "./slices/voucherSlice";
import productSlice from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    user: userSlice,
    modal: modalSlice,
    category: categorySlice,
    tag: tagSlice,
    news: newsSlice,
    voucher: voucherSlice,
    product: productSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
