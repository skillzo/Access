import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUser } from "../store/context";

export default function ProtectedRoutes(): any {
  const location = useLocation();
  const { currentUser } = useUser();

  return currentUser?.id ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}
