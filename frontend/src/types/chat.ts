export interface Member {
  _id: string;
  role: "admin" | "member";
  displayName: string;
  avatarUrl?: string | null;
  joinedAt: string;
}

export interface SeenUser {
  _id: string;
  displayName?: string;
  avatarUrl?: string | null;
}

export interface Group {
  name: string;
  avatarUrl?: string | null;
  createdBy: string;
}

export interface LastOrReplyMessage {
  _id: string;
  content?: string | null;
  attachments?: File[] | null;
  createdAt?: Date;
  senderId: {
    _id: string;
    displayName: string;
    avatarUrl?: string | null;
  };
}

export interface Chat {
  _id: string;
  type: "direct" | "group";
  group?: Group | null;
  members: Member[];
  lastMessageAt: string;
  lastMessage: LastOrReplyMessage | null;
  unReadCounts: Record<string, number>; // key = userId, value = unread count
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface ChatResponse {
  chats: Chat[];
}

export interface File {
  url: string;
  fileName: string;
  size: number;
}

export interface Reaction {
  userId: string;
  emoji: string;
}

export interface Message {
  _id: string;
  chatId: string;
  senderId: string;
  type: "text" | "image" | "file" | "video" | "audio";
  content?: string | null;
  attachments?: File[] | null;
  seenBy: SeenUser[],
  replyTo?: LastOrReplyMessage | null;
  reactions: Reaction[];
  isDeleted: boolean;
  isOwn?: boolean;
  deletedAt?: string | null;
  updatedAt?: string | null;
  createdAt: string;
}

// define send message payload
export interface SendDirectMessagePayload {
  recipientId: string;
  chatId?: string | null;
  content?: string;
  type?: "text" | "image" | "file" | "video" | "audio";
  attachments?: File[];
  replyTo?: string;
}

export interface SendGroupMessagePayload {
  chatId?: string | null;
  content?: string;
  type?: "text" | "image" | "file" | "video" | "audio";
  attachments?: File[];
  replyTo?: string;
}