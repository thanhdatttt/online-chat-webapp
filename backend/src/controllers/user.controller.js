import { response } from "../utils/response.util.js";
import User from "../models/User.js";
import Friend from "../models/Friend.js";
import FriendRequest from "../models/FriendRequest.js";

export const getMe = async (req, res) => {
    try {
        return response.success(res, {user: req.user}, "Get user info successfully", 200);
    } catch (err) {
        console.log("Error when get user info", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}

export const searchUsers = async (req, res) => {
    try {
        const {q} = req.query;
        if (!q || q.trim() === "") {
            return response.error(res, "Bad request", "Missing username", 400);
        }

        const user = await User.findOne({ username: q }).select(
        "_id displayName username avatarUrl"
        );

        return response.success(res, {user}, "Search successfully", 200);
    } catch (err) {
        console.log("Error when search user: ", err.message);
        return response.error(res, "System Error", err.message, 500);
    }
}