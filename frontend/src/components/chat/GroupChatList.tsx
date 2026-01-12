import { useChatStore } from "@/stores/chat.store";
import GroupChatCard from "@/components/chat/GroupChatCard";

const GroupChatList = () => {
  // get group chat list
  const {chats} = useChatStore();
  if (!chats) {
    return;
  }

  const groupChats = chats.filter((chat) => chat.type === "group");

  return (
    <div className="flex-1 overflow-y-auto p-2 space-y-2">
      {
        groupChats.map((chat) => (
          <GroupChatCard key={chat._id} chat={chat}/>
        ))
      }
    </div>
  );
}

export default GroupChatList;