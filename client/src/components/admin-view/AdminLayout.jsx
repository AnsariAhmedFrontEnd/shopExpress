import React, {useState} from "react";
import { Outlet } from "react-router-dom";
import Header from "./AdminHeader";
import Sidebar from './AdminSidebar'
const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleMenuClick = () => {
    setIsSidebarOpen(true);
  };

  const handleSidebarClose = () => {
    setIsSidebarOpen(false);
  };
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar isSidebarOpen={isSidebarOpen} onClose={handleSidebarClose} />
      <div className="flex flex-1 flex-col">
        <Header  onMenuClick={handleMenuClick} />
        <main className="flex flex-1 bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
