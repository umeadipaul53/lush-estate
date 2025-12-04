import React, { useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ShoppingCart,
  Home,
  ClipboardList,
  MessageSquare,
  Newspaper,
  Building2,
  MapPin,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { logoutUser } from "../reducers/userReducer";

function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
    localStorage.removeItem("token");
    navigate("/secured-account/login");
  };

  const navLinks = [
    { label: "Dashboard", path: "/admin", icon: <LayoutDashboard size={18} /> },
    { label: "Manage Users", path: "/admin/users", icon: <Users size={18} /> },
    {
      label: "Manage Estate",
      path: "/admin/manage-estate",
      icon: <Building2 size={18} />, // 🛒 Orders icon
    },
    {
      label: "Tours Invite",
      path: "/admin/tours-invite",
      icon: <MapPin size={18} />, // 📍 Location/tour icon
    },
    {
      label: "Manage Questionaire",
      path: "/admin/manage-questionaire",
      icon: <MessageSquare size={18} />, // 💬 Chat/message icon
    },
    {
      label: "Settings",
      path: "/admin/settings",
      icon: <Settings size={18} />,
    },
  ];

  const isActive = (path) =>
    location.pathname === path ? "bg-gray-800 text-white" : "text-gray-200";

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* ✅ Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-black text-white flex-col">
        <div className="p-6 text-2xl font-bold border-b border-black">
          Admin Panel
        </div>
        <nav className="flex-1 p-4 space-y-2">
          {navLinks.map((link) => (
            <button
              key={link.path}
              onClick={() => navigate(link.path)}
              className={`flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                link.path
              )}`}
            >
              {link.icon}
              <span>{link.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* ✅ Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white flex flex-col shadow-lg md:hidden"
          >
            <div className="flex items-center justify-between p-4 border-b border-green-800">
              <h2 className="text-xl font-semibold">Admin Menu</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-white hover:text-gray-300"
              >
                <X size={22} />
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-3 overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.path}
                  onClick={() => {
                    navigate(link.path);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-gray-800 transition ${isActive(
                    link.path
                  )}`}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </button>
              ))}
            </nav>

            <div className="p-4 border-t border-gray-800">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 w-full text-left p-2 rounded-lg hover:bg-red-600 transition"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* ✅ Main Section */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Topbar */}
        <header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden text-gray-800 hover:text-gray-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-lg md:text-xl font-semibold text-green-950">
              Admin Dashboard
            </h1>
          </div>
          <span className="text-sm text-gray-600 hidden sm:block">
            Welcome, Admin 👋
          </span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
