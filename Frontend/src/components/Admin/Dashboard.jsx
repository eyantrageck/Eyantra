import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { fadeIn } from "../../shared/varients";
import { FaCalendarAlt, FaUsers, FaCheckCircle, FaDatabase, FaClock, FaServer } from "react-icons/fa";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEvents: 0,
    publishedEvents: 0,
    upcomingEvents: 0,
  });
  const [status, setStatus] = useState("Checking...");
  const [healthData, setHealthData] = useState(null);
  const [user, setUser] = useState("");
  const [recentEvents, setRecentEvents] = useState([]);
  const [metrics, setMetrics] = useState({
    latency: "-",
    dbStatus: "Checking...",
    uptime: "-",
  });

  // 🩺 Fetch server health
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("User")) || {};
    setUser(user.admin.name);
    

    const fetchHealth = async () => {
      const start = performance.now();
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE}/health`);
        const data = await res.json();
        const end = performance.now();
        const latency = (end - start).toFixed(0) + " ms";

        if (data.status === "ok") {
          setStatus("✅ Server Healthy");
          setMetrics({
            latency,
            dbStatus: "🟢 Connected",
            uptime: `${Math.round(data.uptime)}s`,
          });
          setHealthData(data);
        } else {
          setStatus("⚠️ Issues Detected");
          setMetrics((prev) => ({ ...prev, dbStatus: "🟠 Slow" }));
        }
      } catch (error) {
        setStatus("❌ Server Down");
        setMetrics({
          latency: "N/A",
          dbStatus: "🔴 Offline",
          uptime: "-",
        });
      }
    };

    fetchHealth();
    const interval = setInterval(fetchHealth, 60000);
    return () => clearInterval(interval);
  }, []);

  // 🎟 Fetch events for stats + recent list
  useEffect(() => {
    const fetchAdminEvents = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE}/events/admin`, {
          withCredentials: true,
        });
        const data = res.data?.data || [];

        const published = data.filter((e) => e.isPublished).length;
        const upcoming = data.filter((e) => new Date(e.date) > new Date()).length;

        setStats({
          totalEvents: data.length,
          publishedEvents: published,
          upcomingEvents: upcoming,
        });

        // Sort by date descending & show top 3
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setRecentEvents(sorted.slice(0, 3));
      } catch (err) {
        console.error("Error fetching admin events:", err);
      }
    };

    fetchAdminEvents();
  }, []);

  return (
    <motion.div
      variants={fadeIn("up", 40, 0)}
      initial="hidden"
      animate="show"
      className="min-h-[80vh] bg-gray-50 rounded-2xl p-2 md:p-6 shadow-sm font-sans"
    >
      <h1 className="text-lg md:text-3xl font-semibold text-gray-800 mb-6">
        Welcome, {user} 👋
      </h1>

      {/* --- Event Stats --- */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all">
          <FaCalendarAlt className="text-4xl text-blue-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800">Total Events</h2>
          <p className="text-3xl font-bold text-blue-600 mt-2">{stats.totalEvents}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all">
          <FaCheckCircle className="text-4xl text-green-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800">Published Events</h2>
          <p className="text-3xl font-bold text-green-600 mt-2">{stats.publishedEvents}</p>
        </div>

        <div className="bg-white border border-gray-200 shadow-md rounded-2xl p-6 flex flex-col items-center text-center hover:shadow-lg transition-all">
          <FaUsers className="text-4xl text-purple-600 mb-3" />
          <h2 className="text-xl font-semibold text-gray-800">Upcoming Events</h2>
          <p className="text-3xl font-bold text-purple-600 mt-2">{stats.upcomingEvents}</p>
        </div>
      </div>

      {/* --- Server Health --- */}
      <div className="mt-10 p-5 bg-white rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold mb-2 flex items-center gap-2">
          <FaServer className="text-blue-600" /> Server Health
        </h2>
        <p className="text-gray-700 mb-2">{status}</p>

        {healthData && (
          <div className="mt-4 bg-gray-50 border border-gray-200 rounded-xl p-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
              🩺 System Metrics
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-6 text-sm">
              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">⏱️ Uptime:</span>
                <span className="text-blue-600">{healthData.uptime}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">🗄️ DB:</span>
                <span
                  className={
                    healthData.db.includes("🟢")
                      ? "text-green-600 font-medium"
                      : "text-red-600 font-medium"
                  }
                >
                  {healthData.db}
                </span>
              </p>

              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">⚡ Latency:</span>
                <span className="text-yellow-600">{healthData.latency}</span>
              </p>

              <p className="flex items-center gap-2">
                <span className="font-medium text-gray-700">🧠 Memory Used:</span>
                <span className="text-purple-600">
                  {healthData.memory.heapUsed}
                </span>
              </p>

              <p className="flex items-center gap-2 sm:col-span-2">
                <span className="font-medium text-gray-700">🕒 Checked At:</span>
                <span className="text-gray-600">
                  {new Date(healthData.timestamp).toLocaleTimeString()}
                </span>
              </p>
            </div>
          </div>
        )}


      </div>

      {/* --- Recent Events --- */}
      <div className="mt-10 bg-white p-6 rounded-xl shadow-md border">
        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-blue-500" /> Recent Events
        </h2>

        {recentEvents.length > 0 ? (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b text-gray-700">
                <th className="py-2">Event</th>
                <th className="py-2">Date</th>
                <th className="py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEvents.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-50">
                  <td className="py-2">{event.title}</td>
                  <td className="py-2">
                    {new Date(event.date).toLocaleDateString()}
                  </td>
                  <td className="py-2">
                    {event.isPublished ? (
                      <span className="text-green-600 font-semibold">Published</span>
                    ) : (
                      <span className="text-yellow-600 font-semibold">Draft</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600 text-center">No events found yet.</p>
        )}
      </div>

      <div className="mt-10 text-gray-600 text-center">
        Manage and monitor your E-Yantra events efficiently from this dashboard.
      </div>
    </motion.div>
  );
};

export default Dashboard;
