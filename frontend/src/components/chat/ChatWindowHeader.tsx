import type { Chat } from "@/types/chat";
import { useChatStore } from "@/stores/chat.store";
import { useAuthStore } from "@/stores/auth.store";
import { useSocketStore } from "@/stores/socket.store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import UserAvatar from "@/components/chat/UserAvatar";
import StatusBadge from "@/components/chat/StatusBadge";
import GroupChatAvatar from "@/components/chat/GroupChatAvatar";

const ChatWindowHeader = ({chat} : {chat? : Chat}) => {
  const {chats, activeChatId} = useChatStore();
  const {user} = useAuthStore();
  const {onlineUsers} = useSocketStore();

  // get active chat if not included
  chat = chat ?? chats.find((chat) => chat._id === activeChatId);

  // if no chat active, render sidebar icon
  if (!chat) {
    return <header className="md:hidden sticky top-0 z-10 flex items-center gap-2 px-4 py-2 w-full">
      <SidebarTrigger className="-ml-1 text-foreground"/>
    </header>;
  }

  // get other user info if direct chat
  let otherUser;
  if (chat.type === "direct") {
    const otherUsers = chat.members.filter((member) => member._id !== user?._id);
    otherUser = otherUsers.length > 0 ? otherUsers[0] : null;
    if (!user || !otherUser) return;
  }

  return <header className="sticky top-0 z-10 px-4 py-2 flex items-center bg-background">
    <div className="flex items-center gap-2 w-full">
      {/* sidebar close/open button */}
      <SidebarTrigger className="ml-1 text-foreground"/>
      <Separator orientation="vertical"  className="mr-2 data-[orientation=vertical]:h-4"/>

      <div className="p-2 w-full flex items-center gap-3">
        {/* avatar */}
        <div className="relative">
          {chat.type === "direct" ? (
            <>
              <UserAvatar type="sidebar" name={otherUser?.displayName || "Echo"} avatarUrl={otherUser?.avatarUrl || undefined}/>
              <StatusBadge status={onlineUsers.includes(otherUser?._id ?? "") ? "online" : "offline"}/>
            </>
          ) : (
            <>
              <GroupChatAvatar type="sidebar" members={chat.members} />
            </>
          )}
        </div>


        {/* name */}
        <h2 className="font-semibold text-foreground">
          {chat.type === "direct" ? otherUser?.displayName : chat.group?.name}
        </h2>
      </div>
    </div>
  </header>;
}

export default ChatWindowHeader;