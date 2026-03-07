import { Router } from "express";
import healthRoutes from "./health.routes.js";
import adminAuthRoutes from "./auth/admin.auth.routes.js";
import adminRoutes from "./admin/admin.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/auth/admin", adminAuthRoutes);
router.use("/admins", adminRoutes);

export default router;
