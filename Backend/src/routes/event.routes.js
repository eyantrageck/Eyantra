import express from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createEvent,
  getAllEvents,
  getEventByID,
  getAdminEvents,
  updateEvent,
  deleteEvent,
} from "../controllers/event.controllers.js";

const router = express.Router();

// 🌍 Public route (no login)
router.get("/", getAllEvents);
router.get("/view/:id", getEventByID);

// 🛡 Protected routes (admin only)
router.use(verifyAdminJWT);
router.get("/admin", getAdminEvents);
router.post("/create", upload.single("image"), createEvent);
router.put("/update/:id", upload.single("image"), updateEvent);
router.delete("/delete/:id", deleteEvent);

export default router;
