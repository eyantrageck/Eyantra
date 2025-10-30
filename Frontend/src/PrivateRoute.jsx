import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {
  const user = localStorage.getItem("User");
  const isLoggedIn = !!user; // converts to boolean

  console.log(`${user} from PrivateRoute`);
  console.log("isLoggedIn:", isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
