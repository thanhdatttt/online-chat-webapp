import api from "@/lib/axios";
import type { ChatResponse, Message } from "@/types/chat";

// define type for fetching messages
interface FetchMessagesProps {
  messages: Message[];
  nextCursor?: string;
}
// limit number of messages per page
const pageLimit = 50;

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
  }
}