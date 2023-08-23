import { ProductType } from "../../types/productType";
import axiosClient from "./axiosClient";

export const productApi = {
  gets: () => axiosClient.get("/products"),
  get: (product: ProductType) => axiosClient.get(`/products/${product._id}`),
  create: (newProduct: ProductType) =>
    axiosClient.post("/products/create", newProduct),
  update: (newProduct: ProductType) =>
    axiosClient.put(`/products/${newProduct._id}`, newProduct),
  delete: (id: string) => axiosClient.patch(`/products/${id}`),
};
