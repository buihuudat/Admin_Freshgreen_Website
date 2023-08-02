import { VoucherActionsType } from "../../actions/voucherActions";
import axiosClient from "./axiosClient";

export const voucherApi = {
  gets: () => axiosClient.get("/voucher"),
  get: (payload: VoucherActionsType) =>
    axiosClient.get(`/voucher/${payload.voucher}`),
  create: (payload: VoucherActionsType) =>
    axiosClient.post("/voucher", payload),
  update: (payload: VoucherActionsType) =>
    axiosClient.put(`/voucher/${payload._id}`, payload),
  delete: (payload: VoucherActionsType) =>
    axiosClient.patch(`/voucher/${payload._id}`),
};
