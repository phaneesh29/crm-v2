import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { users } from "../../db/schema.js";
import config from "../../config/index.js";

const SALT_ROUNDS = 10;

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const [user] = await db.select().from(users).where(eq(users.email, email)).limit(1);

        if (!user) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

        if (!isPasswordValid) {
            return res.status(401).json({
                status: "error",
                message: "Invalid credentials",
            });
        }

        if (!user.isActive) {
            return res.status(403).json({
                status: "error",
                message: "Account is deactivated",
            });
        }

        const payload = { id: user.id, email: user.email, role: user.role };
        const token = jwt.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });

        res.cookie("token", token, config.cookieOptions);

        res.status(200).json({
            status: "success",
            message: "Login successful",
            token,
            user: {
                id: user.id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                role: user.role,
            },
        });
    } catch (error) {
        next(error);
    }
};

const profile = async (req, res, next) => {
    try {
        const [user] = await db.select({
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
            isActive: users.isActive,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        }).from(users).where(eq(users.id, req.admin.id)).limit(1);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            user,
        });
    } catch (error) {
        next(error);
    }
};

const changePassword = async (req, res, next) => {
    try {
        const { oldPassword, newPassword } = req.body;

        const [user] = await db.select().from(users).where(eq(users.id, req.admin.id)).limit(1);

        if (!user) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        const isOldPasswordValid = await bcrypt.compare(oldPassword, user.passwordHash);

        if (!isOldPasswordValid) {
            return res.status(400).json({
                status: "error",
                message: "Old password is incorrect",
            });
        }

        const newPasswordHash = await bcrypt.hash(newPassword, SALT_ROUNDS);

        await db.update(users).set({ passwordHash: newPasswordHash }).where(eq(users.id, req.admin.id));

        res.status(200).json({
            status: "success",
            message: "Password changed successfully",
        });
    } catch (error) {
        next(error);
    }
};

const updateProfile = async (req, res, next) => {
    try {
        const { firstName, lastName } = req.body;

        const [updatedUser] = await db.update(users).set({ firstName, lastName }).where(eq(users.id, req.admin.id)).returning({
            id: users.id,
            email: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            role: users.role,
            isActive: users.isActive,
            createdAt: users.createdAt,
            updatedAt: users.updatedAt,
        });

        if (!updatedUser) {
            return res.status(404).json({
                status: "error",
                message: "User not found",
            });
        }

        res.status(200).json({
            status: "success",
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        next(error);
    }
};

export default { login, profile, changePassword, updateProfile };
