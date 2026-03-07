import bcrypt from "bcrypt";
import { eq, ne } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";

const SALT_ROUNDS = 10;

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

const createAdmin = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const [existingUser] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (existingUser) {
            return res.status(409).json({
                status: "error",
                message: "User with this email already exists",
            });
        }

        const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);

        const [newAdmin] = await db
            .insert(users)
            .values({
                firstName,
                lastName,
                email,
                passwordHash,
                role: "admin",
            })
            .returning({
                id: users.id,
                firstName: users.firstName,
                lastName: users.lastName,
                email: users.email,
                role: users.role,
                isActive: users.isActive,
                createdAt: users.createdAt,
            });

        res.status(201).json({
            status: "success",
            message: "Admin created successfully",
            admin: newAdmin,
        });
    } catch (error) {
        next(error);
    }
};

export default { getAllAdmins, toggleAdminStatus, createAdmin };
