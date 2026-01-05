import { response } from "../utils/response.util.js";

export const getMe = async (req, res) => {
    try {
        return response.success(res, {user: req.user}, "Get user info successfully", 200);
    } catch (err) {
        console.log("Error when get user info", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}

export const test = async (req, res) => {
    try {
        return response.success(res, {}, "", 204);
    } catch (err) {
        console.log("Error", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}