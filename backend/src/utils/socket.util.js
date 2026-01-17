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
    })
}