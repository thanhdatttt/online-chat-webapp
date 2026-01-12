import { cn } from "@/lib/utils";
import type { Chat } from "@/types/chat";
import { useAuthStore } from "@/stores/auth.store";
import { useChatStore } from "@/stores/chat.store";
import ChatCard from "@/components/chat/ChatCard";
import UserAvatar from "./UserAvatar";
import StatusBadge from "./StatusBadge";
import UnReadBadge from "./UnReadBadge";

const DirectChatCard = ({chat} : {chat: Chat}) => {
  // get user info
  const {user} = useAuthStore();
  // get active chat
  const {activeChatId, setActiveChat, messages} = useChatStore();
  if (!user) {
    return null;
  }

  // get other user info
  const otherUser = chat.members.find((member) => member._id !== user._id);
  if (!otherUser) {
    return null;
  }

  // get chart info
  const unReadCounts = chat.unReadCounts[user._id];
  const lastMessage = chat.lastMessage?.content?.trim() || (chat.lastMessage?.attachments?.length ? "📎 Attachment" : "");

  // handle function
  const handleSelectChat = async (id: string) => {
    try {
      setActiveChat(id);
      if (!messages[id]) {
        // fetch messages
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  return (
    <ChatCard 
      chatId={chat._id} 
      name={otherUser.displayName ?? ""} 
      timestamps={chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : undefined}
      isActive={activeChatId === chat._id}
      unReadCounts={unReadCounts}
      leftSection={
        <>
          <UserAvatar type="sidebar" name={otherUser.displayName ?? ""} avatarUrl={otherUser.avatarUrl ?? undefined}/>
          <StatusBadge status="offline"/>
          {unReadCounts > 0 && <UnReadBadge unReadCounts={unReadCounts}/>}
        </>
      }
      subtitle={<p className={cn("text-sm truncate", unReadCounts > 0 ? "font-bold text-foreground" : "text-muted-foreground")}>
        {lastMessage}
      </p>}
      onSelect={handleSelectChat}
    />
  );
}

export default DirectChatCard;