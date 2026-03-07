import { Router } from "express";
import adminController from "../../controllers/admin/admin.controller.js";
import adminAuth from "../../middlewares/auth/admin.auth.middleware.js";
import { validate } from "../../validators/auth.validation.js";
import { createAdminSchema } from "../../validators/admin.validation.js";

const router = Router();

router.get("/", adminAuth, adminController.getAllAdmins);
router.post("/", adminAuth, validate(createAdminSchema), adminController.createAdmin);
router.patch("/:adminId/toggle-status", adminAuth, adminController.toggleAdminStatus);

export default router;
