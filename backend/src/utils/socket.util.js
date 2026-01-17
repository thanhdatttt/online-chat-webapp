import { getIO } from "../sockets/chat.instance.js"

export const emitNewMessage = (chat, message) => {
    // get io in singleton
    const io = getIO();

    io.to(chat._id.toString()).emit("new-message", {
        message,
        chat: {
            _id: chat._id,
            lastMessage: chat.lastMessage,
            lastMessageAt: chat.lastMessageAt,
        },
        unReadCounts: chat.unReadCounts,
    });
}

export const emitReadMessage = (chat) => {
    const io = getIO();

    io.to(chat._id.toString()).emit("read-message", {
        chat,
        lastMessage: {
            _id: chat.lastMessage._id,
            content: chat.lastMessage.content,
            attachments: chat.lastMessage.attachments,
            createdAt: chat.lastMessage.createdAt,
            senderId: {
                _id: chat.lastMessage.senderId._id,
                displayName: chat.lastMessage.senderId.displayName,
                avatarUrl: chat.lastMessage.senderId.avatarUrl,
            }
        }
    }); 
}