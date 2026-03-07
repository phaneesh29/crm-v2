import app from "./src/app.js";
import config from "./src/config/index.js";

const start = async () => {
    try {
        app.listen(config.port, () => {
            console.log(`\n🚀 Server running on http://localhost:${config.port}`);
            console.log(`📦 Environment: ${config.nodeEnv}`);
            console.log(`🔗 Health check: http://localhost:${config.port}/api/health\n`);
        });
    } catch (err) {
        console.error("Failed to start server:", err);
        process.exit(1);
    }
};

start();
