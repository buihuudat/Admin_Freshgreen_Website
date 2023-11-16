import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";
import { Box, LinearProgress } from "@mui/material";
import Sidebar from "../common/Sidebar";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
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
import { RootState } from "../../redux/store";
import { messageActions } from "../../actions/messageAction";
import { selectUser, setPopup } from "../../redux/slices/messageSlice";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.user);
  const popup = useAppSelector((state: RootState) => state.messages.popup);
  user && onListentingMessage(dispatch, user._id!);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyToken();
      if (isAuth && isAuth.role === "admin") {
        setIsLoading(false);

        dispatch(setUserReducer(isAuth));
        dispatch(settingsActions.getSetting(isAuth._id!));
        dispatch(orderActions.gets(isAuth._id!));
        dispatch(messageActions.gets(isAuth._id!));
        requestPermissionNotification(isAuth._id!);

        socket.emit("admin-connect", {
          username: isAuth.username,
          id: isAuth._id,
        });
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

  socket.on("message-recieve", (data) => {
    dispatch(setPopup(!popup));
    dispatch(selectUser(data));
  });

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
