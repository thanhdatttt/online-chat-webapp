import api from "@/lib/axios";
import type { ChatResponse, Message, SendDirectMessagePayload, SendGroupMessagePayload } from "@/types/chat";

// define type for fetching messages
interface FetchMessagesProps {
  messages: Message[];
  nextCursor?: string;
}

// limit number of messages per page
const pageLimit = 20;

// chat service functions
export const chatService = {
  fetchChats: async (): Promise<ChatResponse> => {
    try {
      const res = await api.get("/chats");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  fetchMessage: async (id: string, cursor: string): Promise<FetchMessagesProps> => {
    try {
      const res = await api.get(`/chats/${id}/messages?limit=${pageLimit}&cursor=${cursor}`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  sendDirectMessage: async (payload: SendDirectMessagePayload) => {
    try {
      const res = await api.post("/messages/direct", payload);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  sendGroupMessage: async (payload: SendGroupMessagePayload) => {
    try {
      const res = await api.post("/messages/group", payload);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  markSeen: async (chatId: string) => {
    try {
      const res = await api.patch(`/chats/${chatId}/seen`);
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  createChat: async (type: "direct" | "group", name: string, memberIds: string[]) => {
    try {
      const res = await api.post("/chats", {type, name, memberIds});
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}