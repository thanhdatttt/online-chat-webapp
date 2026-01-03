import { config } from "../configs/config.js";
import { response } from "../utils/response.util.js";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

// authorization
export const authProtect = (req, res, next) => {
  try {
    // get token
    const header = req.headers.authorization;
    const token = header && header.split(" ")[1];
    if (!token) {
        return response.error(res, "Bad request", "No token provided", 401);
    }

    // verify token
    jwt.verify(token, config.JWT_SECRET_KEY, async (err, decoded) => {
        if (err) {
            return response.error(res, "Forbidden", "Token is expired", 403);
        }
        
        // get user
        const user = await User.findById(decoded.userId).select("-hashedPassword");
        if (!user) {
            return response.error(res, "Not found", "User not found", 404);
        }

        req.user = user;
        next();
    });
  } catch (err) {
    console.log("Error when jwt authorizing: ", err.message);
    return response.error(res, "System error", err.message, 500);
  }
};
