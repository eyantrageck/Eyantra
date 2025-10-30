import React, { useState } from "react";
import { motion } from "framer-motion";
import { Bot, Lock, Mail, Home } from "lucide-react";
import axios from 'axios';
import { useNavigate, Navigate } from 'react-router-dom';


export default function AdminLogin() {

  const user = localStorage.getItem("User");
  const isLoggedIn = !!user;


  if (isLoggedIn) {
    return <Navigate to="/admin" replace />;
  }
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE}/admin/login`,
        formData,
        { withCredentials: true } // ✅ important for cookies
      );

      // ✅ Destructure response data
      const { accessToken, refreshToken, admin } = response.data.data;


      // Save tokens/user info
      const user = { accessToken, refreshToken, admin };
      localStorage.setItem("User", JSON.stringify(user));


      // Redirect after login
      navigate("/admin");
      window.location.reload();
    } catch (error) {
      setError(error.response?.data?.message || "Login failed!");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-linear-to-br from-[#0a0f1c] via-[#101a30] to-[#0a0f1c] overflow-hidden">
      {/* Left Side */}
      <motion.div
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center justify-center md:w-1/2 text-white text-center px-6 py-10 space-y-6"
      >
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 5 }}
          className="bg-linear-to-tr from-cyan-400 to-blue-500 p-5 rounded-full shadow-2xl"
        >
          <Bot size={70} />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent ">
          AetherSwarm Login
        </h1>

        <p className="text-gray-300 text-lg max-w-md leading-relaxed font-[--font-orbitron]">
          Connect. Code. Create.
          Join the <span className="text-cyan-400 font-[--font-orbitron]">Tech Revolution</span> — one robot at a time.
        </p>

        <div className="flex space-x-3 mt-4">
          <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></span>
          <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-150"></span>
          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse delay-300"></span>
        </div>
      </motion.div>

      {/* Right Side */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="md:w-1/2 w-full flex justify-center items-center"
      >
        <form
          onSubmit={handleLogin}
          className="bg-[#111827]/70 backdrop-blur-lg rounded-2xl p-8 md:p-10 w-11/12 max-w-md shadow-2xl border border-cyan-800/40"
        >
          <h2 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
            Admin Login
          </h2>

          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 text-cyan-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-3 text-cyan-400" size={20} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                required
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg p-3 mt-4 hover:shadow-lg transition-all cursor-pointer"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>

            <p className="text-gray-400 text-sm mt-4 text-center">
              New Admin?{" "}
              <a href="/admin-register" className="text-cyan-400 hover:underline">
                Register Here
              </a>
            </p>
          </div>
        </form>
      </motion.div>

      {/* Background Decorative Elements */}
      <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(0,255,255,0.08)_0%,transparent_70%)]"></div>
      <div className="absolute -z-10 bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(0,128,255,0.08)_0%,transparent_70%)]"></div>

      {/* Home Icon */}
      <motion.a
        href="/"
        title="Go to Home"
        className="home fixed bottom-10 right-10 p-3 sm:p-3 md:p-5 bg-neutral-600 text-gray-200 rounded-full border border-gray-200 shadow-lg transition-all duration-300 
             sm:bottom-6 sm:right-6 md:bottom-10 md:right-10"
        whileHover={{
          scale: 1.15,
          rotate: 8,
          boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
        }}
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "mirror",
        }}
      >
        <Home className="w-6 h-6 sm:w-6 sm:h-6 md:w-7 md:h-7" />
      </motion.a>


    </div>
  );
}
