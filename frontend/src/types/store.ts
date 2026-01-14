import type { User } from "./user.ts";
import type { Chat, Message } from "./chat.ts";

// define type for auth store
export interface AuthState {
  accessToken: string | null,
  user: User | null,
  loading: boolean | null,

  setAccesstoken: (accessToken: string) => void;
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
  
  reset: () => void;
  setActiveChat: (chatId: string | null) => void;
  fetchChats: () => Promise<void>;
  fetchMessages: (chatId?: string) => Promise<void>;
}