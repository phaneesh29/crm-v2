import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import config from "../config/index.js";
import * as schema from "./schema.js";

const { Pool } = pg;

const pool = new Pool({
    connectionString: config.databaseUrl,
    // Production pool settings
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

const db = drizzle(pool, { schema });

export { db, pool };
