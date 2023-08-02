import { changeAvatarProps, UserActionsProps } from "../../actions/userActions";
import axiosClient from "./axiosClient";

export const userApi = {
  changeAvatar: (payload: changeAvatarProps) =>
    axiosClient.post(`/user/${payload._id}/change-avatar`, payload),

  updateUser: (payload: UserActionsProps) =>
    axiosClient.put(`/user/${payload._id}/`, payload),

  deleteUser: (payload: UserActionsProps) =>
    axiosClient.patch(`/user/${payload._id}`),

  getUsers: () => axiosClient.get("/user/gets"),

  getUser: (id: string) => axiosClient.get(`/user/${id}`),
};
