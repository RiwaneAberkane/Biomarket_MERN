import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "./context/UserContext";

export const PrivateRoutes = () => {
  const { user } = useUserContext();
  return user ? <Outlet /> : <Navigate to="/login" />;
};
