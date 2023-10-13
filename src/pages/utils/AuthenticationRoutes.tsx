import { Outlet, Navigate } from "react-router-dom";
import { RootState } from "../../store";
import { useSelector } from "react-redux";

const AuthenticationRoutes = () => {
  const userUid = useSelector((state: RootState) => state.user.userUid);
  return userUid ? <Navigate to="/tasks" replace /> : <Outlet />;
};

export default AuthenticationRoutes;
