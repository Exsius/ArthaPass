import React from "react";
import { Route, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../Context/UserContext";
import Login from '../Pages/Login.js';

export default function PrivateRoute({ component: Component, ...rest }) {
    const { user } = useAuth()
  
    return user && Object.keys(user).length !== 0 ? <Outlet /> : <Login />
  }