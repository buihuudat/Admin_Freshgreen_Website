import { LinearProgress } from "@mui/material";
import { Suspense, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { verifyToken } from "../../utils/verifyToken";

const AuthLayout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await verifyToken();
      if (isAuth && isAuth.role === "admin") {
        navigate("/");
      } else {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);
  return isLoading ? (
    <LinearProgress />
  ) : (
    <Suspense fallback={<LinearProgress />}>
      <Outlet />
    </Suspense>
  );
};

export default AuthLayout;
