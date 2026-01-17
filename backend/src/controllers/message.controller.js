import { response } from "../utils/response.util.js";
import { updateChatAfterCreateMessage } from "../utils/message.util.js";
import { emitNewMessage } from "../utils/socket.util.js";
import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

// send direct message (1- 1)
export const sendDirectMessage = async (req, res) => {
    try {
        const {chatId, content, type="text", attachments, replyTo} = req.body;
        const senderId = req.user._id;

        // check chat is exists
        let chat = await Chat.findById(chatId);
        if (!chat) {
            // // create new chat
            // chat = await Chat.create({
            //     type: "direct",
            //     members: [
            //         {userId: senderId, joinedAt: new Date(), role: "member"},
            //         {userId: recipientId, joinedAt: new Date(), role: "member"},
            //     ],
            //     unReadCounts: new Map(),
            // });
            return response.error(res, "Bad request", "Chat is not exist", 400);
        }

        // create new message
        const message = await Message.create({
            chatId: chat._id,
            senderId,
            type,
            content,
            attachments,
            replyTo,
            seenBy: [senderId],
        });
        // update chat
        updateChatAfterCreateMessage(chat, message, senderId);
        await chat.save();

        // emit message in socket
        const populatedChat = await Chat.findById(chat._id)
        .populate({
            path: "lastMessage",
            select: "senderId content attachments createdAt",
            populate: {
                path: "senderId",
                select: "displayName avatarUrl",
            }
        });
        emitNewMessage(populatedChat, message);
        return response.success(res, {message}, "Send direct message successfully", 201);
    } catch (err) {
        console.log("Error when send direct message: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// send message to group
export const sendGroupMessage = async (req, res) => {
    try {
        const {chatId, content, attachments, type="text", replyTo} = req.body;
        const senderId = req.user._id;
        const chat = req.chat;

        // create new message
        const message = await Message.create({
            chatId: chat._id,
            senderId,
            type,
            content,
            attachments,
            replyTo,
            seenBy: [senderId],
        });
        // update chat
        updateChatAfterCreateMessage(chat, message, senderId);
        await chat.save();

        // emit message in socket
        const populatedChat = await Chat.findById(chat._id)
        .populate({
            path: "lastMessage",
            select: "senderId content attachments createdAt",
            populate: {
                path: "senderId",
                select: "displayName avatarUrl",
            }
        });
        emitNewMessage(populatedChat, message);
        return response.success(res, {message}, "Send group message successfully", 201);
    } catch (err) {
        console.log("Error when send group message: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}

// mark seen messages
export const markSeen = async (req, res) => {
    try {
        const {chatId} = req.params;
        const userId = req.user._id;

        // mark seen
        await Message.updateMany({
            chatId,
            seenBy: {$ne: userId},
        }, {$push: {seenBy: userId}});

    } catch (err) {
        console.log("Error when send mark seen: ", err.message);
        return response.error(res, "System error", err.message, 500);
    }
}