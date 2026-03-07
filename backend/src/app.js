import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import config from "./config/index.js";
import { generalLimiter } from "./middlewares/rateLimiter.js";
import errorHandler from "./middlewares/errorHandler.js";
import routes from "./routes/index.js";

const app = express();

app.set("trust proxy", true);

app.use(helmet());

app.use(
    cors({
        origin: config.corsOrigin,
        credentials: true,
    })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use(compression());

app.use(morgan(config.isProduction ? "combined" : "dev"));

app.use(generalLimiter);

app.use("/api", routes);

app.use((req, res) => {
    res.status(404).json({
        status: "error",
        message: `Route ${req.originalUrl} not found`,
    });
});

app.use(errorHandler);

export default app;
