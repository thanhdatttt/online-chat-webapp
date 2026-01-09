import { response } from "../utils/response.util.js";
import Friend from "../models/Friend.js";
import Chat from "../models/Chat.js";

// sort order of userIds
const arrange = (a, b) => (a > b ? [b, a] : [a, b]); 

// check friendship
export const checkFriendShip = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const recipientId = req.body?.recipientId ?? null;
        const memberIds = req.body?.memberIds ?? [];

        if (!recipientId && memberIds.length === 0) {
            return response.error(res, "Bad request", "Must have recipientId or memberIds", 400);
        }

        // direct
        if (recipientId) {
            const [userA, userB] = arrange(userId, recipientId);
            const isFriend = await Friend.findOne({userA, userB,});
            if (!isFriend) {
                return response.error(res, "Forbidden", "You are not friend of this user", 403);
            }

            return next();
        }

        // group
        const checkFriends = memberIds.map(async (id) => {
            const [userA, userB] = arrange(userId, id);
            const friend = await Friend.findOne({
                userA,
                userB,
                blockedBy: null,
            });
            return friend ? null : id;
        });
        const result = await Promise.all(checkFriends);
        const notFriends = result.filter(Boolean);
        if (notFriends.length > 0) {
            return response.error(res, "Forbidden", {reason: "You can only add unblock friends to group", notFriends}, 403);
        }

        next();
    } catch (err) {
        console.log("Error when checking friendship: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// check user is member of group chat
export const checkGroupMemberShip = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const {chatId} = req.body;

        // check chat exists
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return response.error(res, "Not found", "Chat not found", 404);
        }

        // check user is member of group chat
        const isMember = chat.members.some((member) => member.userId.toString() === userId.toString());
        if (!isMember) {
            return response.error(res, "Forbidden", "You are not in this group chat", 403);
        }

        req.chat = chat;
        next();
    } catch (err) {
        console.log("Error when checking group membership: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// check is blocked
export const checkBlocked = async (req, res, next) => {
    try {
        const userId = req.user._id.toString();
        const recipientId = req.body?.recipientId;

        if (recipientId) {
            const [userA, userB] = arrange(userId, recipientId);

            const isBlocked = await Friend.findOne({
                userA,
                userB,
                blockedBy: recipientId,
            });

            if (isBlocked) {
                return response.error(res, "Forbidden", "You are blocked by this user", 403);
            }

            return next();
        }
    } catch (err) {
        console.log("Error when checking blocks: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}