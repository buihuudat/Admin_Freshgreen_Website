import { ShopType } from "../../types/shopType";
import axiosClient from "./axiosClient";

export const shopAPI = {
  gets: () => axiosClient.get("/shop"),
  get: (id: string) => axiosClient.get(`/shop/${id}`),
  create: (newShop: ShopType) => axiosClient.post("/shop/create", newShop),
  update: (newShop: ShopType) => axiosClient.put(`/shop/${newShop._id}`),
  delete: (id: string) => axiosClient.patch(`/shop/${id}`),
};
