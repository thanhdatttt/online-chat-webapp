import api from "@/lib/axios";
import type { ChatResponse } from "@/types/chat";

export const chatService = {
  fetchChats: async (): Promise<ChatResponse> => {
    try {
      const res = await api.get("/chats");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}