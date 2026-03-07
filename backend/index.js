import app from "./src/app.js";
import config from "./src/config/index.js";
import { pool } from "./src/db/index.js";

const startServer = async () => {
    try {
        const client = await pool.connect();
        console.log("Database connected successfully");
        client.release();

        const server = app.listen(config.port, () => {
            console.log(`\n🚀 Server running on http://localhost:${config.port}`);
            console.log(`📦 Environment: ${config.nodeEnv}`);
            console.log(`🔗 Health check: http://localhost:${config.port}/api/health\n`);
        });

        const shutdown = async (signal) => {
            console.log(`\n${signal} signal received: closing HTTP server`);
            server.close(async () => {
                console.log("HTTP server closed.");
                try {
                    await pool.end();
                    console.log("Database pool closed.");
                    process.exit(0);
                } catch (err) {
                    console.error("Error during database shutdown", err);
                    process.exit(1);
                }
            });
        };

        process.on("SIGINT", () => shutdown("SIGINT"));
        process.on("SIGTERM", () => shutdown("SIGTERM"));

    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

startServer();
