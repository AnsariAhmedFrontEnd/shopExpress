import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

const AuthCheck = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  // If user is not authenticated and is on path other than login and signup
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/signup")
    )
  ) {
    return <Navigate to="/auth/login" replace />;
  }

  // If user is authenticated and is on path login and signup
  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/signup"))
  ) {
    // if User is admin, redirect to admin page
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      // else redirect to shopping page
      return <Navigate to="/shop/home" replace />;
    }
  }

  //   if user is normal user and tried to access admin page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  //   if user is admin user and tried to access shop page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/unauth-page" replace />;
  }

  return <div>{children}</div>;
};

export default AuthCheck;
