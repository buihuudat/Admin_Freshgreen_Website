import { changeAvatarProps } from "../../actions/userActions";
import { UserType } from "../../types/userType";
import axiosClient from "./axiosClient";

export const userApi = {
  changeAvatar: (payload: changeAvatarProps) =>
    axiosClient.post(`/user/${payload._id}/change-avatar`, payload),

  updateUser: (payload: UserType) =>
    axiosClient.put(`/user/${payload._id}/`, payload),

  deleteUser: (id: string) => axiosClient.patch(`/user/${id}`),

  getUsers: () => axiosClient.get("/user/gets"),

  getUser: (id: string) => axiosClient.get(`/user/${id}`),
};
