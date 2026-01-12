import { useChatStore } from "@/stores/chat.store";
import DirectChatCard from "@/components/chat/DirectChatCard";

const DirectChatList = () => {
  // get direct chat list
  const { chats } = useChatStore();
  if (!chats) {
    return;
  }

  const directChats = chats.filter((chat) => chat.type === "direct");

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {
        directChats.map((chat) => (
          <DirectChatCard key={chat._id} chat={chat}/>
        ))
      }
    </div>
  );
}

export default DirectChatList;