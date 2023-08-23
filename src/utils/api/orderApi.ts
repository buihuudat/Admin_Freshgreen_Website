import { SubmitProps } from "../../actions/orderActions";
import axiosClient from "./axiosClient";

export const orderApi = {
  gets: (adminId: string) => axiosClient.get(`/orders/admin/${adminId}`),
  statusOrder: ({ userId, orderId, status, message = "" }: SubmitProps) =>
    axiosClient.put(`/orders/${orderId}/user/${userId}`, {
      status,
      message,
    }),
};
