import { ShopType } from "../../types/shopType";
import axiosClient from "./axiosClient";

export const shopAPI = {
  gets: () => axiosClient.get("/shop"),
  get: (id: string) => axiosClient.get(`/shop/${id}`),
  create: (payload: ShopType) => axiosClient.post("/shop/create"),
  update: (payload: ShopType) => axiosClient.put(`/shop/${payload._id}`),
  delete: (id: string) => axiosClient.patch(`/shop/${id}`),
};
