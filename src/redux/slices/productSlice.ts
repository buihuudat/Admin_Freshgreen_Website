import { createSlice } from "@reduxjs/toolkit";
import { InitialProduct, ProductType } from "../../types/productType";
import { productActions } from "../../actions/productActions";
import { FulfilledAction, PendingAction, RejectedAction } from "./silceType";

interface InitialStateProps {
  products: Array<ProductType>;
  product: ProductType;
  loading: boolean;
  modal: {
    data?: ProductType;
    open: boolean;
  };
}

const initialState: InitialStateProps = {
  products: [],
  product: InitialProduct,
  loading: false,
  modal: {
    data: undefined,
    open: false,
  },
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductModal: (state, action) => {
      state.modal = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(productActions.gets.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(productActions.get.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(productActions.create.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(productActions.update.fulfilled, (state, action) => {
        state.products.find((product, index) => {
          if (product._id === action.payload._id) {
            state.products[index] = action.payload;
            return true;
          }
          return false;
        });
      })
      .addCase(productActions.delete.fulfilled, (state, action) => {
        const index = state.products.findIndex(
          (product) => product._id === action.meta.arg._id
        );
        state.products.splice(index, 1);
      })
      .addMatcher<PendingAction>(
        (action) => action.type.endsWith("/pending"),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher<FulfilledAction | RejectedAction>(
        (action) =>
          action.type.endsWith("/fulfilled") ||
          action.type.endsWith("/rejected"),
        (state) => {
          state.loading = false;
        }
      );
  },
});

export const { setProductModal } = productSlice.actions;
export default productSlice.reducer;
