import { createAsyncThunk } from "@reduxjs/toolkit";
import { settingApi } from "../utils/api/settingApi";

export interface SettingActionsProp {
  _id: string;
  images: Array<string>;
  adminID: string;
}

export const settingsActions = {
  getSetting: createAsyncThunk("/settings/get", async (adminId: string) => {
    try {
      const res = await settingApi.get(adminId);
      return res.data;
    } catch (error) {
      throw error;
    }
  }),

  updateSetting: createAsyncThunk(
    "/settings/update",
    async (data: SettingActionsProp) => {
      try {
        const res = await settingApi.update(data);
        return res.data;
      } catch (error) {
        throw error;
      }
    }
  ),
};
