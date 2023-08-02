import { TagActionsType } from "../../actions/tagActions";
import axiosClient from "./axiosClient";

export const tagApi = {
  gets: () => axiosClient.get("/tag"),
  get: (payload: TagActionsType) => axiosClient.get(`/tag/${payload.name}`),
  create: (payload: TagActionsType) => axiosClient.post("/tag", payload),
  delete: (payload: TagActionsType) => axiosClient.patch(`/tag/${payload._id}`),
};
