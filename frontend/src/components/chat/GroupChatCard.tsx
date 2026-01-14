import { cn } from "@/lib/utils";
import type { Chat } from "@/types/chat";
import { useAuthStore } from "@/stores/auth.store";
import { useChatStore } from "@/stores/chat.store";
import ChatCard from "@/components/chat/ChatCard";
import UnReadBadge from "./UnReadBadge";
import GroupChatAvatar from "./GroupChatAvatar";
import UserAvatar from "./UserAvatar";

const GroupChatCard = ({chat} : {chat : Chat}) => {
  // get user info
  const {user} = useAuthStore();
  // get active chat
  const {activeChatId, setActiveChat, messages} = useChatStore();
  if (!user) {
    return null;
  }

  // get chart info
  const unReadCounts = chat.unReadCounts[user._id];
  const name = chat.group?.name ?? "";
  const avatarUrl = chat.group?.avatarUrl ?? null;
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
      name={name}
      timestamps={chat.lastMessage?.createdAt ? new Date(chat.lastMessage.createdAt) : undefined}
      isActive={activeChatId === chat._id}
      unReadCounts={unReadCounts}
      leftSection={
        <>
          {unReadCounts > 0 && <UnReadBadge unReadCounts={unReadCounts}/>}
          {avatarUrl ? <UserAvatar type="chat" name={name} avatarUrl={avatarUrl}/> : <GroupChatAvatar members={chat.members} type="chat"/>}
        </>
      }
      subtitle={<p>
        {lastMessage && (<p className={cn("text-sm truncate", unReadCounts > 0 ? "font-medium text-foreground" : "text-muted-foreground")}>
          {chat.lastMessage?.senderId.displayName}: {lastMessage}
        </p>)}
      </p>}
      onSelect={handleSelectChat}
    />
  );
}

export default GroupChatCard;