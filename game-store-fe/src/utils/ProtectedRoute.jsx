import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ canNavigate, redirectPath = "/login" }) => {
  if (!canNavigate) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
