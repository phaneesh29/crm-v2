import { Router } from "express";
import adminAuthController from "../../controllers/auth/admin.auth.controller.js";
import adminAuth from "../../middlewares/auth/admin.auth.middleware.js";
import { validate, loginSchema, changePasswordSchema, updateProfileSchema } from "../../validators/auth.validation.js";

const router = Router();

router.post("/login", validate(loginSchema), adminAuthController.login);
router.get("/profile", adminAuth, adminAuthController.profile);
router.put("/change-password", adminAuth, validate(changePasswordSchema), adminAuthController.changePassword);
router.patch("/update-profile", adminAuth, validate(updateProfileSchema), adminAuthController.updateProfile);

export default router;
