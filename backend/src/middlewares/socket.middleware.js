import { config } from "../configs/config.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const socketAuth = async (socket, next) => {
    try {
        // get token
        const token = socket.handshake.auth?.token;
        if (!token) {
            return next(new Error("Unauhtorized - token is not exist"));
        }

        // decode token
        const decoded = jwt.verify(token, config.JWT_SECRET_KEY);
        if (!decoded) {
            return next(new Error("Unauhtorized - token is invalid or expired"));
        }

        // check user
        const user = await User.findById(decoded.userId).select("-hashedPassword");
        if (!user) {
            return next(new Error("Unauhtorized - User not found"));
        }

        socket.user = user;
        next();
    } catch (err) {
        console.log("Error when checking socket: ", err.message);
        return next(new Error("Unauthorized"));
    }
}