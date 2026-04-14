import { pgTable, uuid, varchar, text, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["admin"]);
export const leadStatusEnum = pgEnum("lead_status", ["new", "contacted", "qualified", "won", "lost"]);
export const leadSourceEnum = pgEnum("lead_source", ["manual", "gmaps", "import", "api"]);

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey(),
    firstName: varchar("first_name", { length: 255 }).notNull(),
    lastName: varchar("last_name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).notNull().unique(),
    passwordHash: text("password_hash").notNull(),
    role: userRoleEnum("role").default("admin").notNull(),
    isActive: boolean("is_active").default(true).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
});

export const leads = pgTable("leads", {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique(),
    phone: varchar("phone", { length: 50 }).unique(),
    company: varchar("company", { length: 255 }),
    website: varchar("website", { length: 255 }),
    designation: varchar("designation", { length: 255 }),
    street: varchar("street", { length: 255 }),
    city: varchar("city", { length: 255 }),
    state: varchar("state", { length: 255 }),
    country: varchar("country", { length: 255 }),
    description: text("description"),
    status: leadStatusEnum("status").default("new").notNull(),
    source: leadSourceEnum("source").default("manual").notNull(),
    ownerId: uuid("owner_id").references(() => users.id, { onDelete: "set null" }),
    createdBy: uuid("created_by").references(() => users.id, { onDelete: "set null" }),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().$onUpdate(() => new Date()).notNull(),
    deletedAt: timestamp("deleted_at", { withTimezone: true }),
});
