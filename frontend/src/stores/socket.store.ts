import { create } from "zustand";
import type { SocketState } from "@/types/store";
import { io, type Socket} from "socket.io-client";
import { useAuthStore } from "@/stores/auth.store";
import { config } from "@/lib/config";
import { useChatStore } from "@/stores/chat.store";

const baseURL = config.socketUrl;

export const useSocketStore = create<SocketState>((set, get) => ({
    socket: null,
    onlineUsers: [],

    connectSocket: () => {
        const accessToken= useAuthStore.getState().accessToken;
        const existSocket = get().socket;

        if (existSocket) return; // avoid create too many socket server connection
        
        // create socket connection
        const socket: Socket = io(baseURL, {
            auth: {token: accessToken},
            transports: ["websocket"],
        });
        set({socket});

        // connect
        socket.on("connect", () => {
            console.log("Socket connected");
        });

        // online
        socket.on("online-users", (userIds) => {
            set({onlineUsers: userIds});
        });

        // new message
        socket.on("new-message", ({message, chat, unReadCounts}) => {
            // add new message to state
            useChatStore.getState().addMessage(message);

            const lastMessage = {
                _id: chat.lastMessage._id,
                content: chat.lastMessage.content,
                attachments: chat.lastMessage.attachments,
                createdAt: chat.lastMessage.createdAt,
                senderId: {
                    _id: chat.lastMessage.senderId._id,
                    displayName: chat.lastMessage.senderId.displayName,
                    avatarUrl: null,
                }
            };
            const updatedChat = {
                ...chat,
                lastMessage,
                unReadCounts, 
            };

            if (useChatStore.getState().activeChatId === message.chatId) {
                // mark seen
                useChatStore.getState().markSeen();
            }

            // update chats in store
            useChatStore.getState().updateChat(updatedChat);
        });

        // read message
        socket.on("read-message", ({chat, lastMessage}) => {
            const updated = {
                _id: chat._id,
                lastMessage,
                lastMessageAt: chat.lastMessageAt,
                unReadCounts: chat.unReadCounts,
            };

            useChatStore.getState().updateChat(updated);
        })
    },

    disconnectSocket: () => {
        const socket = get().socket;
        // disconnect if have connection
        if (socket) {
            socket.disconnect();
            console.log("Socket disconnected");
            set({socket: null});
        }
    }
}));