import { chatService } from "@/services/chat.service";
import type { ChatState } from "@/types/store";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useChatStore = create<ChatState>()(
  // store and manage chat in local storage
  persist(
    (set, get) => ({
      chats: [],
      messages: {},
      activeChatId: null,
      loading: false,

      setActiveChat: (chatId) => {
        set({activeChatId: chatId});
      },

      // reset state of chat store
      reset: () => {
        set({
          chats: [],
          messages: {},
          activeChatId: null,
          loading: false,
        });
      },

      fetchChats: async () => {
        try {
          set({loading: true});

          const {chats} = await chatService.fetchChats();
          set({chats: chats});
        } catch (err) {
          console.log(err);
          throw err;
        } finally {
          set({loading: false});
        }
      }
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({chats: state.chats}) // only store chat info, not message info
    }
  )
);