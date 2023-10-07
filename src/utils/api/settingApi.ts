import { SettingActionsProp } from "../../actions/settingActions";
import axiosClient from "./axiosClient";

export const settingApi = {
  update: (data: SettingActionsProp) =>
    axiosClient.put(`/settings/${data._id}/update/${data.adminID}`, {
      images: data.images,
    }),

  get: (id: string) => axiosClient.get(`/settings/get/${id}`),
};
