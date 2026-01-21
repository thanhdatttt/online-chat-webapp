import { response } from "../utils/response.util.js";
import { uploadImageFromBuffer } from "../middlewares/upload.middleware.js";
import User from "../models/User.js";

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

export const uploadAvatar = async (req, res) => {
    try {
        const file = req.file;
        const userId = req.user._id;
        if (!file) {
        return response.error(res, "Bad request", "No file uploaded", 400);
        }

        const result = await uploadImageFromBuffer(file.buffer);
        const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
            avatarUrl: result.secure_url,
        },
        {
            new: true,
        }
        ).select("avatarUrl");

        if (!updatedUser.avatarUrl) {
            return response.error(res, "Bad request", "Avatar is null", 400);
        }

        return response.success(res, {avatarUrl: updatedUser.avatarUrl}, "Upload avatar successfully", 200);
    } catch (err) {
        console.log("Error wen uploading avatar: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}