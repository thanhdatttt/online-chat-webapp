import { useChatStore } from "@/stores/chat.store";
import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen";
import MessageItem from "@/components/chat/MessageItem";

const ChatWindowBody = () => {
  const {activeChatId, chats, messages: allMessages} = useChatStore();

  // get messages of active chat and active chat info
  const messages = allMessages[activeChatId!]?.items ?? [];
  const selectedChat = chats.find((chat) => chat._id === activeChatId);
  // if no active chat
  if (!selectedChat) {
    return <ChatWelcomeScreen/>
  }

  // if no messages
  if (!messages.length) {
    return <div className="flex h-full items-center justify-center text-muted-foreground">
      Start your story by saying something!
    </div>
  }

  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div className="flex flex-col overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {messages.map((message, index) => (
          <MessageItem key={message._id ?? index} message={message} index={index} messages={messages} selectedChat={selectedChat} lastMessageStatus="sent"/>
        ))}
      </div>
    </div>
  );
}

export default ChatWindowBody;