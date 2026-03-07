import { db, pool } from "../src/db/index.js";
import { users } from "../src/db/schema.js";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import config from "../src/config/index.js";

async function seed() {
    console.log("Seeding database...");

    try {
        const existingAdmins = await db.select().from(users).where(eq(users.role, "admin"));

        if (existingAdmins.length > 0) {
            console.log("An admin user already exists. Skipping seeding.");
            return;
        }

        const adminEmail = config.adminEmail;
        const passwordHash = await bcrypt.hash(config.adminPassword, 10);

        await db.insert(users).values({
            firstName: "System",
            lastName: "Admin",
            email: adminEmail,
            passwordHash: passwordHash,
            role: "admin",
            isActive: true
        }).onConflictDoNothing({ target: users.email });

        console.log(`Admin user seeded successfully with email '${adminEmail}'.`);
    } catch (error) {
        console.error("Error seeding database:", error);
    } finally {
        await pool.end();
        process.exit(0);
    }
}

seed();
