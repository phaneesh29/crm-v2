import rateLimit from "express-rate-limit";
import config from "../config/index.js";


const getClientIp = (req) => {
    const cfIp = req.headers["cf-connecting-ip"];
    if (cfIp) return cfIp;

    const xff = req.headers["x-forwarded-for"];
    if (xff) return xff.split(",")[0].trim();

    return req.ip;
};


export const generalLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMax,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    keyGenerator: getClientIp,
    validate: { xForwardedForHeader: false, keyGeneratorIpFallback: false },
    message: {
        status: 429,
        error: "Too many requests, please try again later.",
    },
});


export const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 20,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    keyGenerator: getClientIp,
    validate: { xForwardedForHeader: false, keyGeneratorIpFallback: false },
    message: {
        status: 429,
        error: "Too many authentication attempts, please try again later.",
    },
});
