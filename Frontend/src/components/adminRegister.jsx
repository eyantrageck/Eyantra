import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Bot, Lock, Mail, User, Home } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function AdminRegister() {

  const navigate = useNavigate();

  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [canRegister, setCanRegister] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("User");
    if (!user) return;

    try {
      const parsedUser = JSON.parse(user);
      console.log("User from adminRegister:", parsedUser);

      const adminEmail = parsedUser?.admin?.email;
      console.log("Admin email:", adminEmail);

      if (adminEmail === "akshay@gmail.com") {
        setCanRegister(true);
      } else {
        setCanRegister(false);
      }
    } catch (err) {
      console.error("Invalid user data in localStorage:", err);
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!form.password) newErrors.password = "Password is required";
    else if (form.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    setMessage("");
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE}/admin/register`, form);
      setMessage("✅ Registration successful! Redirecting...");
      setTimeout(() => navigate("/"), 1500);
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ Registration failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {canRegister ? (

        <div className="min-h-screen flex flex-col-reverse md:flex-row items-center justify-center bg-linear-to-r from-[#0a0f1c] via-[#101a30] to-[#0a0f1c] overflow-hidden relative">
          {/* Left Section - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="md:w-1/2 w-full flex justify-center items-center"
          >
            <form
              onSubmit={handleRegister}
              className="bg-[#111827]/70 backdrop-blur-lg rounded-2xl p-8 md:p-10 w-11/12 max-w-md shadow-2xl border border-cyan-800/40"
            >
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6 text-center">
                Admin Register
              </h2>

              <div className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3 text-cyan-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-cyan-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-cyan-400" size={20} />
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.password && (
                    <p className="text-red-400 text-sm mt-1">{errors.password}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3 text-cyan-400" size={20} />
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full bg-[#0a0f1c] text-white rounded-lg pl-10 p-3 border border-cyan-700 focus:outline-none focus:ring-2 focus:ring-cyan-400"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-linear-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg p-3 mt-4 hover:shadow-lg transition-all cursor-pointer ${loading ? "opacity-60 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? "Registering..." : "Register"}
                </motion.button>

                {message && (
                  <p className="text-center text-sm mt-3 text-cyan-300">
                    {message}
                  </p>
                )}

                <p className="text-gray-400 text-sm mt-4 text-center">
                  Already have an account?{" "}
                  <a href="/admin-login" className="text-cyan-400 hover:underline">
                    Login Here
                  </a>
                </p>
              </div>
            </form>
          </motion.div>

          {/* Right Section */}
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

            <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-cyan-400 to-blue-600 bg-clip-text text-transparent">
              AetherSwarm Register
            </h1>

            <p className="text-gray-300 text-lg max-w-md leading-relaxed font-[--font-orbitron]">
              Create your admin account and{" "}
              <span className="text-cyan-400 font-[--font-orbitron]">
                join the swarm
              </span>.
            </p>

            <div className="flex space-x-3 mt-4">
              <span className="h-2 w-2 bg-cyan-400 rounded-full animate-pulse"></span>
              <span className="h-2 w-2 bg-blue-500 rounded-full animate-pulse delay-150"></span>
              <span className="h-2 w-2 bg-indigo-500 rounded-full animate-pulse delay-300"></span>
            </div>
          </motion.div>

          {/* Decorative Background */}
          <div className="absolute -z-10 top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_25%_25%,rgba(0,255,255,0.08)_0%,transparent_70%)]"></div>
          <div className="absolute -z-10 bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_75%_75%,rgba(0,128,255,0.08)_0%,transparent_70%)]"></div>

          {/* Responsive Home Button */}
          <motion.a
            href="/"
            title="Go to Home"
            className="home fixed bottom-6 right-6 sm:bottom-8 sm:right-8 md:bottom-10 md:right-10 p-3 sm:p-4 md:p-5 bg-neutral-600 text-gray-200 rounded-full border border-gray-200 shadow-lg transition-all duration-300"
            whileHover={{
              scale: 1.15,
              rotate: 8,
              boxShadow: "0 0 20px rgba(34, 211, 238, 0.6)",
            }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
          >
            <Home className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
          </motion.a>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          <div className="bg-red-50 border border-red-200 rounded-xl p-8 shadow-sm w-[90%] max-w-md">
            <h2 className="text-red-600 text-xl font-semibold mb-2">
              🚫 Not Authorized to Register
            </h2>
            <p className="text-gray-600">
              You don’t have permission to access this page.
            </p>
            <p className="mt-3 text-sm text-gray-500">
              Please contact <span className="font-medium text-primary">akshay@gmail.com</span> for admin registration access.
            </p>

            <div className="mt-6">
              <p className="text-sm text-gray-600 mb-2">Already an admin?</p>
              <Link
                to="/admin-login"
                className="inline-block bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/80 transition"
              >
                Login here
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}