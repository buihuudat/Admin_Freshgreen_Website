import { ProductType } from "../../types/productType";
import axiosClient from "./axiosClient";

export const productApi = {
  gets: () => axiosClient.get("/product"),
  get: (product: ProductType) => axiosClient.get(`/product/${product._id}`),
  create: (newProduct: ProductType) =>
    axiosClient.post("/product/create", newProduct),
  update: (newProduct: ProductType) =>
    axiosClient.put(`/product/${newProduct._id}`, newProduct),
  delete: (product: ProductType) =>
    axiosClient.patch(`/product/${product._id}`),
};
