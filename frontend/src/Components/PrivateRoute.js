import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/UserContext";

const PrivateRoute = () => {
  const { user } = useAuth()
  return user ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute