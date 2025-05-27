import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import type { JSX } from "react";

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { isLoggedIn  } = useAuth();

  return isLoggedIn()  ? children : <Navigate to="/" />;
};
