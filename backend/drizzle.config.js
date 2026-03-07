import { defineConfig } from "drizzle-kit";
import config from "./src/config/index.js";

export default defineConfig({
    out: "./drizzle",
    schema: "./src/db/schema.js",
    dialect: "postgresql",
    dbCredentials: {
        url: config.databaseUrl,
    },
});
