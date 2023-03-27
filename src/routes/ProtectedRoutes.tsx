import React from "react";
import { Navigate, Outlet, redirect, Route } from "react-router-dom";
import { useUser } from "../store/context";

export default function ProtectedRoutes(): any {
  const { isAuth } = useUser();
  return isAuth === true ? <Outlet /> : <Navigate to="/login" replace />;
}
