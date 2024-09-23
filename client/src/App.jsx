import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./components/auth/AuthLayout";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import AdminLayout from "./components/admin-view/AdminLayout";
import Dashboard from "./pages/admin-view/Dashboard";
import Products from "./pages/admin-view/Products";
import Orders from "./pages/admin-view/Orders";
import Features from "./pages/admin-view/Features";
import ShoppingLayout from "./components/shopping-view/ShoppingLayout";
import PageNotFound from "./pages/not-Found/PageNotFound";
import Account from "./pages/shopping-view/Account";
import Home from "./pages/shopping-view/Home";
import Checkout from "./pages/shopping-view/Checkout";
import Listings from "./pages/shopping-view/Listings";
import AuthCheck from "./components/common/AuthCheck";
import UnauthPage from "./pages/unauth-page/UnauthPage";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { logout, setUser } from "./store/auth-slice";
import { toast } from "react-toastify";

const App = () => {
  const { isAuthenticated, user, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  const checkAuth = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-store , no-cache, must-revalidate, proxy-revalidate",
          },
        }
      );
      if (response?.data?.success) {
        const { email, role, id } = response.data.user;
        dispatch(setUser({ email, role, id }));
      } else {
        dispatch(logout());
      }
    } catch (error) {
      toast.error(error)
      dispatch(logout());
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

//Loading spinner

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-black border-solid"></div>
      </div>
    );
  }
  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/auth"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </AuthCheck>
          }
        >
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </AuthCheck>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="products" element={<Products />} />
          <Route path="orders" element={<Orders />} />
          <Route path="features" element={<Features />} />
        </Route>
        {/* Shopping Route */}
        <Route
          path="/shop"
          element={
            <AuthCheck isAuthenticated={isAuthenticated} user={user}>
              <ShoppingLayout />
            </AuthCheck>
          }
        >
          <Route path="home" element={<Home />} />
          <Route path="listings" element={<Listings />} />
          <Route path="account" element={<Account />} />
          <Route path="checkout" element={<Checkout />} />
        </Route>
        {/* Unauth Page */}

        <Route path="/unauth-page" element={<UnauthPage />} />
        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default App;
