import { CategoryType } from "../../types/categoryType";
import axiosClient from "./axiosClient";

export const categoryApi = {
  create: (payload: CategoryType) => axiosClient.post("/category", payload),

  update: (payload: CategoryType) =>
    axiosClient.put(`/category${payload._id}`, payload),
  gets: () => axiosClient.get("/category"),
  get: (payload: CategoryType) => axiosClient.get(`/category/${payload.name}`),

  delete: (payload: CategoryType) =>
    axiosClient.patch(`/category/${payload._id}`),
};
