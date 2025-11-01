

import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import { FaListUl } from "react-icons/fa";
import { MdDashboardCustomize, MdManageAccounts, MdEmail  } from "react-icons/md";
import { fadeIn } from "../../shared/varients";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState, useMemo } from "react";

const AdminLayout = () => {
  const navigate = useNavigate();

  const [canRegister, setCanRegister] = useState(false);

  const user = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem("User"));
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    if (user?.admin?.email === "akshay@gmail.com") {
      setCanRegister(true);
    }
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("User");
    console.log("User logged out");
    navigate("/admin-login");
  }




  return (
    <>
      {/* Top Navbar */}
      <div className="bg-white shadow-sm border-b border-gray-200 text-gray-800 p-4 sticky top-0 z-50 font-sans">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <motion.div
            variants={fadeIn("down", 40, 0)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="flex flex-row items-center gap-4"
          >
            <Link to="/">
              <img src="/image/geck.gif" alt="Logo" className="h-12 lg:h-16 w-20 object-contain" />
            </Link>
            <Link to="https://www.geckishanganj.org/" target="_blank" rel="noopener noreferrer">
              <img src="/image/e_yantra.svg" alt="E-Yantra Logo" className="h-10 object-contain" />
            </Link>
          </motion.div>

          <div className="flex items-center gap-4">
            {canRegister && (
              <Link to="/admin-register">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all shadow-sm">
                  Register Admin
                </button>
              </Link>
            )}
            <button
              onClick={handleLogout}
              aria-label="Logout"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-all shadow-sm cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar + Content */}
      <div className="flex h-[calc(100vh-100px)]">
        <div className="flex flex-col border-r border-gray-200 min-h-full pt-6">
          <div className="hidden md:inline-block px-6 pb-6 border-b border-gray-100">
            <h2 className="text-2xl font-semibold text-primary flex items-center gap-2">
              🛠️ Admin Panel
            </h2>
            <p className="text-sm text-gray-500 mt-1">Manage your E-Yantra portal</p>
          </div>

          <NavLink end to="/admin" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <MdDashboardCustomize />
            <p className="hidden md:inline-block">Dashboard</p>
          </NavLink>

          <NavLink to="/admin/events" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <FaListUl />
            <p className="hidden md:inline-block">Event List</p>
          </NavLink>

          <NavLink to="/admin/manageDevelopers" className={({ isActive }) => `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"}`}>
            <MdManageAccounts />
            <p className="hidden md:inline-block">Manage Developers</p>
          </NavLink>

          {/* 📬 Contact Responses */}
          <NavLink
            to="/admin/contactResponses"
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-64 cursor-pointer ${isActive && "bg-primary/10 border-r-4 border-primary"
              }`
            }
          >
            <MdEmail />
            <p className="hidden md:inline-block">Contact Responses</p>
          </NavLink>

        </div>

        <div className="w-full max-h-screen overflow-y-auto p-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default AdminLayout;