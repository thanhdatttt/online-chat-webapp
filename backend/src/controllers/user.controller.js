import { response } from "../utils/response.util.js";
import User from "../models/User.js";

export const getMe = async (req, res) => {
    try {
        return response.success(res, {user: req.user}, "Get user info successfully", 200);
    } catch (err) {
        console.log("Error when get user info", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}