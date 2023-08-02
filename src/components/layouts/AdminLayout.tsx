import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/veryfyToken";
import { Box, LinearProgress } from "@mui/material";
import Sidebar from "../common/Sidebar";
import { useAppDispatch } from "../../redux/hooks";
import { setUserReducer } from "../../redux/slices/userSlice";
import { NotificationToast } from "../../utils/handlers/NotificationToast";

const AdminLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyToken();

      dispatch(setUserReducer(isAuth));

      if (isAuth && isAuth.role === "admin") {
        setIsLoading(false);
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

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Outlet />
        </Box>
      </Box>
    </Suspense>
  );
};

export default AdminLayout;
