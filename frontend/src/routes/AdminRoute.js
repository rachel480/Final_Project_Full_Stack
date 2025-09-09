import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { selectIsAdmin } from "../features/auth/authSlice";

const AdminRoute = () => {
  const isAdmin = useSelector(selectIsAdmin)
  return isAdmin ? <Outlet /> : <Navigate to="/user/home-page" />
}

export default AdminRoute
