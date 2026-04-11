import * as z from "zod";

export const loginSchema = z.object({
    email: z.email("Invalid email address").trim().toLowerCase(),
    password: z.string().min(1, "Password is required").max(30, "Password must be at most 30 characters"),
});

export const changePasswordSchema = z.object({
    oldPassword: z.string().min(1, "Old password is required"),
    newPassword: z.string().min(8, "New password must be at least 8 characters").max(30, "New password must be at most 30 characters"),
});

export const updateProfileSchema = z.object({
    firstName: z.string().min(1, "First name is required").max(255, "First name must be at most 255 characters").trim(),
    lastName: z.string().min(1, "Last name is required").max(255, "Last name must be at most 255 characters").trim(),
});
