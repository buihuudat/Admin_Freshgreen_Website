import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { NewsType } from "../../types/newsType";
import { UserType } from "../../types/userType";
import { ProductType } from "../../types/productType";

interface NewsInitialProps {
  open: boolean;
  data?: NewsType;
}

interface ProductInitialProps {
  open: boolean;
  data?: ProductType;
}

const initialState: { news: NewsInitialProps; product: ProductInitialProps } = {
  news: {
    open: false,
    data: undefined,
  },

  product: {
    open: false,
    data: undefined,
  },
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setNewsModal: (state, action: PayloadAction<NewsInitialProps>) => {
      state.news = action.payload;
    },
    setProductModal: (state, action: PayloadAction<ProductInitialProps>) => {
      state.product = action.payload;
    },
  },
});

export const { setNewsModal, setProductModal } = modalSlice.actions;
export default modalSlice.reducer;
