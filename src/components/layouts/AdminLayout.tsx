import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { Box, LinearProgress } from "@mui/material";
import Sidebar from "../common/Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { NotificationToast } from "../../utils/handlers/NotificationToast";
import { orderActions } from "../../actions/orderActions";
import { settingsActions } from "../../actions/settingActions";
import { socket } from "../../utils/socketConfirm";
import {
  onListentingMessage,
  requestPermissionNotification,
} from "../../utils/handlers/getFCMToken";
import PopupMessage from "../PopupMessage";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  onListentingMessage(dispatch);

  const notificationOrder = () => {
    socket.on("new-order", () => {
      NotificationToast({ message: "Bạn có 1 đơn hàng mới", type: "default" });
    });
    socket.on("access-order", () => {
      NotificationToast({
        message: "Có một đợn hàng đã được giao thành công",
        type: "default",
      });
    });
    socket.on("refuse-order", () => {
      NotificationToast({
        message: "Có một đợn hàng đã bị từ chối",
        type: "default",
      });
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyToken();

      if (isAuth && isAuth.role === "admin") {
        setIsLoading(false);

        dispatch(setUserReducer(isAuth));
        dispatch(settingsActions.getSetting(isAuth._id!));
        dispatch(orderActions.gets(isAuth._id!));
        socket.emit("admin-connect", { username: isAuth.username });
        requestPermissionNotification(isAuth._id!);
        notificationOrder();
      } else {
        NotificationToast({
          message: "You are not Administractor",
          type: "error",
        });
        navigate("/login");
      }
    };
    checkAuth();
  }, [navigate, dispatch]);

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Box display={"flex"}>
        <Box component="nav">
          <Sidebar />
        </Box>

        <Box component="main" sx={{ flexGrow: 1 }}>
          <Outlet />
        </Box>
        <PopupMessage />
      </Box>
    </Suspense>
  );
};

export default AdminLayout;
