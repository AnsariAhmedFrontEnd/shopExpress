import React from "react";
import { LayoutDashboard, ShieldCheck, ShoppingCart, Logs, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

const navdata = [
  {
    id: "dashboard",
    name: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    name: "Products",
    path: "/admin/products",
    icon: <ShoppingCart />,
  },
  {
    id: "orders",
    name: "Orders",
    path: "/admin/orders",
    icon: <Logs />,
  },
];

const AdminSidebar = ({ isSidebarOpen, onClose }) => {
  const navigate = useNavigate();
  console.log(isSidebarOpen)

  const navItems = navdata.map((data) => {
    return (
      <div
        key={data.id}
        onClick={() => {
          navigate(data.path);
          if (onClose) onClose();
        }}
        className="flex gap-4 my-2 opacity-85 py-3 hover:cursor-pointer hover:opacity-100 hover:bg-slate-700"
      >
        <span className="ml-4">{data.icon}</span>
        <span className="font-semibold">{data.name}</span>
      </div>
    );
  });

  return (
    
      <aside className={`lg:flex flex-col bg-black text-white w-52 fixed lg:static z-50 lg:z-auto transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0 h-screen" : "-translate-x-full"
      } lg:translate-x-0`}>
       <X className="float-end mr-2 mt-2 opacity-80 hover:cursor-pointer hover:opacity-100 lg:hidden" onClick={onClose} />
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex justify-center items-center mt-8"
        >
          <ShieldCheck />
          <h1 className="font-extrabold text-lg ml-2 hover:cursor-pointer">
            Admin Panel
          </h1>
          
        </div>
        <div className="mt-8">{navItems}</div>
      </aside>
    );
};

export default AdminSidebar;
