import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
} from "../controllers/contact.controller.js";

const router = Router();

// 🌍 Public route (anyone can submit contact)
router
  .route("/create")
  .post(
    upload.none(), // No image upload for this form
    createContact
  );

// 🛡 Protected routes (Admin only)
router.route("/").get(verifyAdminJWT, getAllContacts);
router.route("/view/:id").get(verifyAdminJWT, getContactById);
router.route("/delete/:id").delete(verifyAdminJWT, deleteContact);

export default router;
