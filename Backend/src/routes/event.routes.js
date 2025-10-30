import { Router } from "express";
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

const router = Router();

// 🌍 Public route (no login)
router.route("/").get(getAllEvents);
router.route("/view/:id").get(getEventByID);

// 🛡 Protected routes (admin only)
router.route("/admin").get(
  verifyAdminJWT,
  getAdminEvents
);
router.route("/create").post(
  verifyAdminJWT,
  upload.fields([
    {
      name: "eventImage",
      maxCount: 1,
    },
  ]),
  createEvent
);
router.route("/update/:id").put(
  verifyAdminJWT,
  upload.fields([
    {
      name: "eventImage",
      maxCount: 1,
    },
  ]),
  updateEvent
);
router.route("/delete/:id").delete(
  verifyAdminJWT,
  deleteEvent
);


export default router;
