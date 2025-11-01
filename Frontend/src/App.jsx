import React, { useState, useEffect } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import "quill/dist/quill.snow.css";
import { motion } from "framer-motion";
import { Toaster } from "react-hot-toast";

import Navbar from "./shared/navbar.jsx";
import Footer from "./shared/footer.jsx";

import Landing from "./components/landing.jsx";
import Home from "./components/home.jsx";
import Coordinator from "./components/coordinator.jsx";
import Representatives from "./components/representatives.jsx";
import Devloper from "./components/developer.jsx";
import Contact from "./components/contact.jsx";
import Participants from "./components/participants.jsx";
import OnGoing from "./components/onGoing.jsx";
import Facilities from "./components/facilities.jsx";
import Collabration from "./components/collaboration.jsx";
import Exhibition from "./components/collaboration.jsx";
import Competition from "./components/competition.jsx";
import Events from "./components/events.jsx";
import AdminLogin from "./components/adminLogin.jsx";
import AdminRegister from "./components/adminRegister.jsx";
import AddEvent from "./components/Admin/addEvent.jsx";
import AdminLayout from "./components/Admin/AdminLayout.jsx";
import Dashboard from "./components/Admin/Dashboard.jsx";
import EventList from "./components/Admin/EventList.jsx";
import PrivateRoute from "./PrivateRoute.jsx";
import EventByID from "./components/models/viewEvent.modal.jsx";
import ManageDevelopers from "./components/Admin/AddDeveloper.jsx";

// ✅ Simple 404 Page
function ErrorPage() {
  return (
    <div className="mt-20 mb-20 flex flex-col justify-center items-center text-center p-6">
      <div className="text-9xl font-extrabold text-gray-800">404</div>
      <h1 className="text-4xl font-bold text-gray-800">Oops! Page Not Found</h1>
      <p className="text-lg md:text-xl text-gray-600 mt-2">
        The page you're looking for doesn't exist or is under development.
      </p>
      <a
        href="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
      >
        Go Back Home
      </a>
    </div>
  );
}

// ✅ Shared Layout
function Layout() {
  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-20 -left-40 w-[500px] h-[500px] bg-[#74cac2] blur-3xl rounded-full opacity-50"></div>
        <div className="absolute top-80 -right-20 w-[700px] h-[500px] bg-[#42a096] blur-3xl rounded-full opacity-30"></div>
        <div className="absolute top-1/3 -left-1/4 w-[800px] h-[600px] bg-[#74cac2] blur-3xl rounded-full opacity-30"></div>
        <div className="absolute top-[70%] right-0 w-[500px] h-[600px] bg-[#42a096] blur-3xl rounded-full opacity-20"></div>
        <div className="absolute top-[85%] -left-1/3 w-[1000px] h-[500px] bg-[#74cac2] blur-3xl rounded-full opacity-30"></div>
      </div>

      {/* ✅ Navbar and Page Content */}
      <Navbar />
      <main className="grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}




// ✅ Router Configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Landing /> },
      { path: "about", element: <Home /> },
      { path: "coordinator", element: <Coordinator /> },
      { path: "student-representatives", element: <Representatives /> },
      { path: "developer", element: <Devloper /> },
      { path: "contact", element: <Contact /> },
      { path: "participants", element: <Participants /> },
      { path: "onGoingProjects", element: <OnGoing /> },
      { path: "collaboration", element: <Collabration /> },
      { path: "facilities", element: <Facilities /> },
      { path: "exhibition", element: <Exhibition /> },
      { path: "documents", element: <Exhibition /> },
      { path: "video-lectures", element: <Exhibition /> },
      { path: "competition", element: <Competition /> },
      { path: "event", element: <Events /> },
      { path: "event/:id", element: <EventByID /> },
    ],
  },
  { path: "/admin-login", element: <AdminLogin /> },
  { path: "/admin-register", element: <AdminRegister /> },

  {
    element: <PrivateRoute />,
    children: [
      {
        path: "/",
        element: <AdminLayout />,
        children: [
          {
            path: "/admin",
            element: <Dashboard />,
          },
          {
            path: "/admin/events",
            element: <EventList />,
          },
          {
            path: "/admin/addEvent",
            element: <AddEvent />,
          },
          {
            path: "/admin/manageDevelopers",
            element: <ManageDevelopers />,
          }


        ],
      },
    ],
  },

  { path: "*", element: <ErrorPage /> },
]);

// ✅ Main App
export default function App() {

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "linear", duration: 2 }}
    >
      <RouterProvider router={router} />
      <Toaster position="top-right" reverseOrder={false} />
    </motion.div>
  );
}
