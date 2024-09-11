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

const App = () => {
  const isAuthenticated = true;
  const user = {
    name: "Ahmed",
    role: "admin",
  };
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
