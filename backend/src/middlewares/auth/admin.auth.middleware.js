import jwt from "jsonwebtoken";
import config from "../../config/index.js";

const adminAuth = (req, res, next) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({
            status: "error",
            message: "Access denied. No token provided.",
        });
    }

    try {
        const decoded = jwt.verify(token, config.jwtSecret);

        if (decoded.role !== "admin") {
            return res.status(403).json({
                status: "error",
                message: "Access denied. Admin privileges required.",
            });
        }

        req.admin = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            status: "error",
            message: "Invalid or expired token.",
        });
    }
};

export default adminAuth;
