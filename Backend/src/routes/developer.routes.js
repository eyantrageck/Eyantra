import { Router } from "express";
import { verifyAdminJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

import {
  createDeveloper,
  getAllDevelopers,
  getDeveloperById,
  updateDeveloper,
  deleteDeveloper,
} from "../controllers/developer.controllers.js";

const router = Router();

// 🌍 Public routes (no login required)
router.route("/").get(getAllDevelopers);
router.route("/view/:id").get(getDeveloperById);

// 🛡 Protected routes (admin only)
router
  .route("/create")
  .post(
    verifyAdminJWT,
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
    ]),
    createDeveloper
  );

router
  .route("/update/:id")
  .put(
    verifyAdminJWT,
    upload.fields([
      {
        name: "avatar",
        maxCount: 1,
      },
    ]),
    updateDeveloper
  );

router.route("/delete/:id").delete(verifyAdminJWT, deleteDeveloper);

export default router;
