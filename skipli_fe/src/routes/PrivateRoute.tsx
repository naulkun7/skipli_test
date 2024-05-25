import React, { useContext } from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

type PrivateRouteProps = {
  element: React.ReactElement;
} & RouteProps;

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element }) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext must be used within an AuthProvider");
  }

  const { isAuthenticated } = authContext;

  return isAuthenticated ? element : <Navigate to="/log-in" />;
};

export default PrivateRoute;
