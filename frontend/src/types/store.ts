import type { Friend, FriendRequest } from "./friend.ts";
import type { User } from "./user.ts";
import type { Chat, Message, SendDirectMessagePayload, SendGroupMessagePayload } from "./chat.ts";
import type { Socket } from "socket.io-client";

// define type for auth store
export interface AuthState {
  accessToken: string | null,
  user: User | null,
  loading: boolean | null,

  setAccesstoken: (accessToken: string) => void;
  setUser: (user: User) => void;
  clearState: () => void;

  signUp: (username: string, email: string, firstName: string, lastName: string, password: string) => Promise<void>,
  signIn: (usernameOrEmail: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  fetchMe: () => Promise<void>;

  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  handleOauthSuccess: (accessToken: string) => Promise<void>;
}

// define type for theme store
export interface ThemeState {
  isDark: boolean,

  toggleTheme: () => void;
  setTheme: (dark: boolean) => void;
}

// define type for chat store
export interface ChatState {
  chats: Chat[];
  messages: Record<string, {
    items: Message[],
    hasMore: boolean,
    nextCursor?: string | null;
  }>;
  activeChatId: string | null;
  loading: boolean; // for chats
  messageLoading: boolean; // for messages
  createLoading: boolean;
  
  reset: () => void;
  setActiveChat: (chatId: string | null) => void;
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId?: string) => Promise<void>;
  sendDirectMessage: (payload: SendDirectMessagePayload) => Promise<void>;
  sendGroupMessage: (payload: SendGroupMessagePayload) => Promise<void>;
  markSeen: () => Promise<void>;
  addChat: (chat: Chat) => void;
  createChat: (type: "direct" | "group", name: string, memberIds: string[]) => Promise<void>;

  // socket handle functions
  addMessage: (message: Message) => Promise<void>;
  updateChat: (chat: unknown) => void;
}

// define store for friends
export interface FriendState {
  loading: boolean;
  friends: Friend[],
  receivedList: FriendRequest[];
  sentList: FriendRequest[];

  searchUsers: (q: string) => Promise<User | null>;
  sendFriendRequest: (to: string, message?: string) => Promise<string>;
  getAllFriendRequests: () => Promise<void>;
  getFriends: () => Promise<void>;
  acceptRequest: (requestId: string) => Promise<void>;
  declineRequest: (requestId: string) => Promise<void>;
  cancelRequest: (requestId: string) => Promise<void>;
}

// define store for user
export interface UserState {
  updateAvatarUrl: (formData: FormData) => Promise<void>;
}

// define store for socket
export interface SocketState {
  socket: Socket | null;
  onlineUsers: string[];

  connectSocket: () => void;
  disconnectSocket: () => void;
}