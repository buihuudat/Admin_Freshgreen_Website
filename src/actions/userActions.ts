import { createAsyncThunk } from "@reduxjs/toolkit";
import { userApi } from "../utils/api/userApi";
import { NotificationToast } from "../utils/handlers/NotificationToast";

export interface changeAvatarProps {
  _id: string | undefined;
  image: string;
}

export interface UserActionsProps {
  _id?: string | null;
  username?: FormDataEntryValue | null | string;
  phone?: FormDataEntryValue | null | string;
  email?: FormDataEntryValue | null | string;
  fullname?: {
    firstname?: FormDataEntryValue | null | string;
    lastname?: FormDataEntryValue | null | string;
  };
  password?: FormDataEntryValue | null | string;
  address?: {
    city?: FormDataEntryValue | null | string;
    district?: FormDataEntryValue | null | string;
    ward?: FormDataEntryValue | null | string;
    street?: FormDataEntryValue | null | string;
    more?: FormDataEntryValue | null | string;
  };
  role?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}

export const userActions = {
  changeAvatar: async (data: changeAvatarProps) => {
    try {
      const res = await userApi.changeAvatar(data);
      NotificationToast({ message: res.data.message, type: "success" });
      return true;
    } catch (error) {
      NotificationToast({ message: "Avatar update failure", type: "error" });
      return false;
    }
  },
  userUpdate: createAsyncThunk(
    "user/update",
    async (data: UserActionsProps, thunkAPI) => {
      try {
        const res = await userApi.updateUser(data);
        NotificationToast({ message: "Cập nhật thành công", type: "success" });
        return res.data;
      } catch (error: any) {
        NotificationToast({ message: "Cập nhật thất bại", type: "error" });
        if (error.data) return thunkAPI.rejectWithValue(error.data);
        throw error;
      }
    }
  ),

  delete: async (data: UserActionsProps) => {
    try {
      await userApi.deleteUser(data);
      NotificationToast({
        message: "Đã xóa người dùng thành công",
        type: "success",
      });
      return true;
    } catch (error) {
      NotificationToast({
        message: "Không thể xóa người dùng này",
        type: "error",
      });
      return false;
    }
  },

  getUsers: createAsyncThunk("user/gets", async () => {
    try {
      const res = await userApi.getUsers();
      return res.data;
    } catch (error) {
      return error;
    }
  }),

  getUser: createAsyncThunk("user/get", async (_id: string, thunkAPI) => {
    try {
      const res = await userApi.getUser(_id);
      return res.data;
    } catch (error: any) {
      if (error.data) {
        NotificationToast({ message: error.data, type: "error" });
        return thunkAPI.rejectWithValue(error.data);
      }
      throw error;
    }
  }),
};
