import { eq, ne } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

const getAllAdmins = async (req, res, next) => {
    try {
        const admins = await db
            .select({
                id: users.id,
                firstName: users.firstName,
                lastName: users.lastName,
                email: users.email,
                role: users.role,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            })
            .from(users);

        res.status(200).json({
            status: "success",
            results: admins.length,
            admins,
        });
    } catch (error) {
        next(error);
    }
};

const toggleAdminStatus = async (req, res, next) => {
    try {
        const { adminId } = req.params;

        if (adminId === req.admin.id) {
            return res.status(400).json({
                status: "error",
                message: "You cannot change your own account status",
            });
        }

        const [target] = await db.select({ isActive: users.isActive }).from(users).where(eq(users.id, adminId)).limit(1);

        if (!target) {
            return res.status(404).json({
                status: "error",
                message: "Admin not found",
            });
        }

        const [updatedAdmin] = await db
            .update(users)
            .set({ isActive: !target.isActive })
            .where(eq(users.id, adminId))
            .returning({
                id: users.id,
                firstName: users.firstName,
                lastName: users.lastName,
                email: users.email,
                role: users.role,
                isActive: users.isActive,
                createdAt: users.createdAt,
                updatedAt: users.updatedAt,
            });

        res.status(200).json({
            status: "success",
            message: `Admin ${updatedAdmin.isActive ? "activated" : "deactivated"} successfully`,
            admin: updatedAdmin,
        });
    } catch (error) {
        next(error);
    }
};

export default { getAllAdmins, toggleAdminStatus };
