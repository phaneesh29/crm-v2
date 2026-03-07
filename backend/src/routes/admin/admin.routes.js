import { Router } from "express";
import adminController from "../../controllers/admin/admin.controller.js";
import adminAuth from "../../middlewares/auth/admin.auth.middleware.js";

const router = Router();

router.get("/", adminAuth, adminController.getAllAdmins);
router.patch("/:adminId/toggle-status", adminAuth, adminController.toggleAdminStatus);

export default router;
