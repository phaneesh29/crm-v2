import config from "../config/index.js";
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, _next) => {
    const statusCode = err.statusCode || err.status || 500;
    const isServerError = statusCode >= 500;
    const message =
        config.isProduction && isServerError
            ? "Internal Server Error"
            : err.message;

    console.error(`[ERROR] ${req.method} ${req.originalUrl} — ${err.message}`);
    if (!config.isProduction) {
        console.error(err.stack);
    }

    res.status(statusCode).json({
        status: "error",
        statusCode,
        message,
        ...(config.isProduction ? {} : { stack: err.stack }),
    });
};

export default errorHandler;
