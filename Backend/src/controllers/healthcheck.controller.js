import mongoose from "mongoose";
import { performance } from "perf_hooks";

export const healthcheck = async (req, res) => {
  try {
    const start = performance.now();

    // 🧠 Check MongoDB connection
    let dbStatus = "🔴 Disconnected";
    if (mongoose.connection.readyState === 1) dbStatus = "🟢 Connected";
    else if (mongoose.connection.readyState === 2) dbStatus = "🟡 Connecting";
    else if (mongoose.connection.readyState === 3) dbStatus = "🟠 Disconnecting";

    const uptime = process.uptime();
    const memoryUsage = process.memoryUsage();
    const timestamp = new Date().toISOString();

    // Simulate latency (time taken for this request)
    const latency = (performance.now() - start).toFixed(2);

    res.status(200).json({
      status: "ok",
      message: "Server is healthy 🚀",
      uptime: `${Math.floor(uptime)}s`,
      latency: `${latency} ms`,
      db: dbStatus,
      memory: {
        rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
        heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
      },
      timestamp,
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Health check failed ❌",
      error: error.message,
    });
  }
};
