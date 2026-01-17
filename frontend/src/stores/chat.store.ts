import type { ChatState } from "@/types/store";
import { chatService } from "@/services/chat.service";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/stores/auth.store";
import { toast } from "sonner";

export const useChatStore = create<ChatState>()(
  // store and manage chat in local storage
  persist(
    (set, get) => ({
      chats: [],
      messages: {},
      activeChatId: null,
      loading: false, // for chats
      messageLoading: false, // for messages

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
          messageLoading: false,
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
      },

      fetchMessages: async (chatId) => {
        try {
          set({messageLoading: true});

          // get chat info and user info
          const {activeChatId, messages} = get();
          const {user} = useAuthStore.getState();

          // get id of chat
          const id = chatId ?? activeChatId;
          if (!id) {
            return;
          }

          // get current messages of chat -> get next cursor
          const current = messages?.[id];
          const nextCursor = current?.nextCursor === undefined ? "" : current.nextCursor;
          if (nextCursor === null) return;

          // get messages
          const {messages: fetched, nextCursor: cursor} = await chatService.fetchMessage(id, nextCursor);
          // add isOwn field to separate user messages and other messages
          const processed = fetched.map((m) => ({
            ...m,
            isOwn: m.senderId === user?._id,
          }));
          set((state) => {
            // get previous messages and merge with current messages
            const prev = state.messages[id]?.items ?? [];
            const merged = prev.length > 0 ? [...processed,...prev] : processed;

            return {
              messages: {
                ...state.messages,
                [id]: {
                  items: merged,
                  hasMore: !!cursor,
                  nextCursor: cursor ?? null,
                }
              },
            }
          });
        } catch (err) {
          console.log(err);
          throw err;
        } finally {
          set({messageLoading: false});
        }
      },

      sendDirectMessage: async ({recipientId, chatId, type, content, attachments, replyTo}) => {
        try {
          await chatService.sendDirectMessage({recipientId, chatId, type, content, attachments, replyTo});
          // update chat
          set((state) => ({
            chats: state.chats.map((chat) => chat._id === chatId ? {...chat} : chat)
          }));

        } catch (err) {
          console.log(err);
          toast.error("Error when sending message. Please try again!");
          throw err;
        }
      },

      sendGroupMessage: async ({chatId, type, content, attachments, replyTo}) => {
        try {
          await chatService.sendGroupMessage({ chatId, type, content, attachments, replyTo});
          // update chat
          set((state) => ({
            chats: state.chats.map((chat) => chat._id === chatId ? {...chat} : chat)
          }));
        } catch (err) {
          console.log(err);
          toast.error("Error when sending message. Please try again!");
          throw err;
        }
      },

      addMessage: async (message) => {
        try {
          const {user} = useAuthStore.getState();
          const {fetchMessages} = get();

          message.isOwn = message.senderId === user?._id;

          const chatId = message.chatId;

          // get prev messages (make sure that messages of chat have fetched)
          let prevItems = get().messages[chatId]?.items ?? [];
          if (prevItems.length == 0) {
            await fetchMessages(chatId);
            prevItems = get().messages[chatId]?.items ?? [];
          }

          // update messages in state
          set((state) => {
            if (prevItems.some((m) => m._id === message._id)) {
              return state;
            }

            return {
              messages: {
                ...state.messages,
                [chatId] : {
                  items: [...prevItems, message],
                  hasMore: state.messages[chatId].hasMore,
                  nextCursor: state.messages[chatId].nextCursor ?? undefined,
                }
              }
            }
          });
        } catch (err) {
          console.log(err);
          toast.error("Error when add message in socket");
          throw err;
        }
      },

      updateChat: (chat) => {
        set((state) => ({
          chats: state.chats.map((c) => c._id === chat._id ? { ...c, ...chat } : c),
        }));
      }
    }),
    {
      name: "chat-storage",
      partialize: (state) => ({chats: state.chats}) // only store chat info, not message info
    }
  )
);