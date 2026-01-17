import { getChatForSocket } from "../controllers/chat.controller.js";

export default async (io, socket, user) => {
    // get chats that have user
    const chatIds = await getChatForSocket(user._id);
    // join room
    chatIds.forEach((id) => {
        socket.join(id);
    });
}