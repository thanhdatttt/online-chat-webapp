import { response } from "../utils/response.util.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

// create new chat
export const createChat = async (req, res) => {
    try {
        const {type, name, memberIds} = req.body;
        const userId = req.user._id;

        let chat;
        // direct chat
        if (type === "direct") {
            const memberId = memberIds[0];
            // check direct chat exists
            chat = await Chat.findOne({
                type: "direct",
                "members.userId": {$all: [userId, memberId]},
            });

            // create new chat if not exist
            if (!chat) {
                chat = await Chat.create({
                    type: "direct",
                    members: [
                        {userId: userId, joinedAt: new Date(), role: "admin"},
                        {userId: memberId, joinedAt: new Date(), role: "admin"},
                    ],
                    unReadCounts: new Map(),
                });
            }
        }

        // group chat
        if (type === "group") {
            chat = await Chat.create({
                type: "group",
                members: [
                    {userId, joinedAt: new Date(), role: "admin"},
                    ...memberIds.map((id) => ({userId: id, joinedAt: new Date(), role: "member"}))
                ],
                group: {
                    name,
                    createdBy: userId,
                },
                unReadCounts: new Map(),
            });
        }
        
        // get info for chat
        await chat.populate([
            {path: "members.userId", select: "displayName avatarUrl"},
            {path: "lastMessage.senderId", select: "displayName avatarUrl"},
        ]);
        return response.success(res, {chat}, "Create chat successfully", 201);
    } catch (err) {
        console.log("Error when create chat: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// get chats of user
export const getChats = async (req, res) => {
    try {
        const userId = req.user._id;
        // get chats that have user and sort by last message
        const chats = await Chat.find({
            "members.userId": userId,
        })
        .sort({lastMessageAt: -1, updatedAt: -1})
        .populate({
            path: "members.userId",
            select: "displayName avatarUrl",
        })
        .populate({
            path: "lastMessage",
            select: "senderId content attachments createdAt",
            populate: {
                path: "senderId",
                select: "displayName avatarUrl",
            }
        });

        // format the response
        const formatted = chats.map((chat) => {
            const members = (chat.members || []).map((member) => ({
                _id: member.userId?._id,
                displayName: member.userId?.displayName,
                avatarUrl: member.userId?.avatarUrl,
                role: member.role,
                joinedAt: member.joinedAt,
            }));

            return {
                ...chat.toObject(),
                unReadCounts: chat.unReadCounts || {},
                members,
            };
        });
        return response.success(res, {chats: formatted}, "Get user chats successfully", 200);
    } catch (err) {
        console.log("Error when getting chats: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// get messages of a chat
export const getMessages = async (req, res) => {
    try {
        const {chatId} = req.params;
        // get pagination info
        const {limit=50, cursor} = req.query;
        const query = {
            chatId,
        }
        if (cursor) {
            query.createdAt = {$lt: new Date(cursor)};
        }

        // get messages
        let messages = await Message.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit) + 1)
        .populate({
            path: "replyTo", 
            select: "senderId content attachments createdAt",
            populate: {
                path: "senderId",
                select: "displayName avatarUrl",
            }
        })
        .populate({
            path: "seenBy",
            select: "displayName avatarUrl",
            options: { limit: 5 } // only get top 5 seen user
        });

        // get next offset
        let nextCursor = null;
        if (messages.length > Number(limit)) {
            const nextMessage = messages[messages.length - 1];
            nextCursor = nextMessage.createdAt.toISOString();
            messages.pop();
        }

        messages = messages.reverse();
        return response.success(res, {messages, nextCursor}, "Get messages successfully", 200);
    } catch (err) {
        console.log("Error when getting messages: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// get chat for socket io
export const getChatForSocket = async (userId) => {
    try {
        const chats = await Chat.find({
            "members.userId" : userId,
        }, {_id: 1});

        return chats.map((chat) => chat._id.toString());
    } catch (err) {
        console.log("Error when getting chats for socket: ", err.message);
        return [];
    }
}