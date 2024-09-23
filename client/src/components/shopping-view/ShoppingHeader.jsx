import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, CircleUserRound } from "lucide-react";

const navData = [
  {
    id: "home",
    name: "Home",
    path: "/shop/home",
  },
  {
    id: "men",
    name: "Men",
    path: "/shop/listings",
  },
  {
    id: "women",
    name: "Women",
    path: "/shop/listings",
  },
  {
    id: "kids",
    name: "Kids",
    path: "/shop/listings",
  },
  {
    id: "footwear",
    name: "Footwear",
    path: "/shop/listings",
  },
  {
    id: "accessories",
    name: "Accessories",
    path: "/shop/listings",
  },
];

const ShoppingHeader = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <header className="flex items-center justify-between p-6 px-8 bg-black text-white relative">
      <div className="hidden lg:block text-lg font-bold">Shoexpress</div>

      <nav className="flex space-x-4">
        {navData.map((item) => (
          <Link
            key={item.id}
            to={item.path}
            className="hover:opacity-80 transition-colors duration-200"
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-6">
        <div className="relative cursor-pointer">
          <ShoppingCart className="text-xl" />
          <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs px-1">
            3
          </span>
        </div>

        <div className="relative cursor-pointer">
          <CircleUserRound className="text-xl" onClick={toggleDropdown} />
          {/* Dropdown */}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white text-black shadow-lg rounded-md py-2 z-50">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                My Account
              </Link>
              <Link
                to="/orders"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                My Orders
              </Link>
              <Link
                to="/logout"
                className="block px-4 py-2 hover:bg-gray-200"
              >
                Logout
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default ShoppingHeader;
