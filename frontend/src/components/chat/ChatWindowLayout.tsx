import { useEffect } from "react";
import { useChatStore } from "@/stores/chat.store";
import { SidebarInset } from "@/components/ui/sidebar";
import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen";
import ChatWindowHeader from "@/components/chat/ChatWindowHeader";
import ChatSkeletonScreen from "@/components/chat/ChatSkeletonScreen";
import ChatWindowBody from "@/components/chat/ChatWindowBody";
import MessageInput from "@/components/chat/MessageInput";

const ChatWindowLayout = () => {
  // get chats info from store
  const {activeChatId, chats, messages, messageLoading: loading, markSeen} = useChatStore();
  // get the selected chat info (active chat)
  const selectedChat = chats.find((c) => c._id === activeChatId) ?? null;

  // mark seen
  useEffect(() => {
    if (!selectedChat) {
      return;
    }

    const markAsSeen = async () => {
      try {
        await markSeen();
      } catch (err) {
        console.log(err);
        throw err;
      }
    }

    markAsSeen();
  }, [markSeen, selectedChat]);

  // when does not have active chat, display welcome screen
  if (!selectedChat) {
     return <ChatWelcomeScreen/>;
  }
  // when loading chat, display skeleton screen
  if (loading) {
    return <ChatSkeletonScreen/>;
  }
  // active chat screen
  return (
    <SidebarInset className="flex flex-col h-full flex-1 overflow-hidden rounded-sm shadow-md">
      {/* header */}
      <ChatWindowHeader chat={selectedChat}/>

      {/* body */}
      <div className="flex-1 overflow-y-auto bg-primary-foreground">
        <ChatWindowBody/>
      </div>

      {/* footer (input) */}
      <MessageInput selectedChat={selectedChat}/>
    </SidebarInset>
  );
}

export default ChatWindowLayout;