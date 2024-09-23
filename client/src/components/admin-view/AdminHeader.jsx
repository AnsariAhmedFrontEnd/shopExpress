import React from "react";
import { Menu, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { logout } from "../../store/auth-slice/index";
import axios from "axios";
import { toast } from "react-toastify";

const AdminHeader = ({ onMenuClick }) => {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      if (response?.data?.success) {
        dispatch(logout());
        toast.success(response?.data?.message);
      } else {
        toast.error(response?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <header className="flex items-center justify-between bg-black h-16 px-8 shadow-md">
      {/* Menu button for responsive */}
      <div className="lg:hidden sm:block">
        <button
          onClick={onMenuClick}
          className="text-white p-2 rounded-md hover:bg-gray-700 transition-colors duration-200"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
      {/* empty div for spacing */}
      <div className="flex-1"></div>
      {/* Logout button */}
      <div className=" flex items-center">
        <button
          onClick={logoutHandler}
          className="text-white border border-gray-400 px-4 py-2 rounded-md hover:border-white transition duration-200"
        >
          <span className="flex items-center">
            Logout
            <LogOut className="ml-2 w-5 h-5" />
          </span>
        </button>
      </div>
    </header>
  );
};

export default AdminHeader;
