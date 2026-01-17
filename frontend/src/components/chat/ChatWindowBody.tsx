import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChatStore } from "@/stores/chat.store";
import InfiniteScroll from "react-infinite-scroll-component";
import ChatWelcomeScreen from "@/components/chat/ChatWelcomeScreen";
import MessageItem from "@/components/chat/MessageItem";

const ChatWindowBody = () => {
  const {activeChatId, chats, messages: allMessages, fetchMessages} = useChatStore();
  const [lastMessageStatus, setLastMessageStatus] = useState<"sent" | "seen">("sent");

  // get messages of active chat and active chat info
  const messages = allMessages[activeChatId!]?.items ?? [];
  const reversed = [...messages].reverse();
  const hasMore = allMessages[activeChatId!]?.hasMore ?? false;
  const key = `chat-scroll-${activeChatId}`;
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

  // ref
  const messageEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  // fecth more messages
  const fecthMoreMessages = async () => {
    try {
      if (!activeChatId) {
        return;
      }

      await fetchMessages(activeChatId);
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
  // save scroll location
  const handleScrollSave = () => {
    const container = containerRef.current;
    if (!container || !activeChatId) {
      return;
    }

    sessionStorage.setItem(key, JSON.stringify({
      scrollTop: container.scrollTop,
      scrollHeight: container.scrollHeight,
    }));
  }

  // set mark seen
  useEffect(() => {
    const lastMessage = selectedChat?.lastMessage;
    if (!lastMessage) {
      return;
    }

    setLastMessageStatus("seen");
  }, [selectedChat]);

  // update scroll location
  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) {
      return;
    }

    const item = sessionStorage.getItem(key);
    if (item) {
      const {scrollTop} = JSON.parse(item);
      requestAnimationFrame(() => {
        container.scrollTop = scrollTop;
      })
    }
  }, [messages.length]);

  // scroll down when load messages
  useLayoutEffect(() => {
    if (!messageEndRef.current) {
      return;
    }

    messageEndRef.current.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [activeChatId]);

  return (
    <div className="p-4 bg-primary-foreground h-full flex flex-col overflow-hidden">
      <div id="scrollable" ref={containerRef} onScroll={handleScrollSave} className="flex flex-col-reverse overflow-y-auto overflow-x-hidden beautiful-scrollbar">
        {/* ref */}
        <div ref={messageEndRef}></div>

        <InfiniteScroll 
          dataLength={messages.length} 
          next={fecthMoreMessages} 
          hasMore={hasMore} 
          scrollableTarget="scrollable" 
          loader={<p>Loading</p>}
          inverse={true}
          style={{
            display: "flex",
            flexDirection: "column-reverse",
            overflow: "visible",
          }}>
          {reversed.map((message, index) => (
            <MessageItem key={message._id ?? index} message={message} index={index} messages={reversed} selectedChat={selectedChat} lastMessageStatus={lastMessageStatus}/>
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
}

export default ChatWindowBody;