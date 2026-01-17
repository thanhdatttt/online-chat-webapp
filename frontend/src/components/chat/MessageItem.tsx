import type { Chat, Member, Message } from "@/types/chat";
import { cn, formatMessageTime } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "@/components/chat/UserAvatar";

// define type for props
interface MessageItemProps {
  message: Message;
  index: number;
  messages: Message[];
  selectedChat: Chat;
  lastMessageStatus: "sent" | "seen";
}

const MessageItem = ({message, index, messages, selectedChat, lastMessageStatus} : MessageItemProps) => {
  // previous message from index
  const prev = index + 1 < messages.length ? messages[index + 1] : undefined;

  // check if the message need to break (if not break -> does not need to render avatar and time)
  // when to break (first message, previous sender different from current sender)
  const isShowtime = index === 0 || new Date(message.createdAt).getTime() - new Date(prev?.createdAt || 0).getTime() > 300000;
  const isBreak = isShowtime|| message.senderId !== prev?.senderId;

  // get sender 
  const sender = selectedChat.members.find((member: Member) => member._id.toString() === message.senderId.toString());

  return (
    <>
      {/* time */}
      {isShowtime && (
        <span className="flex justify-center text-xs text-muted-foreground px-1">
          {formatMessageTime(new Date(message.createdAt))}
        </span>
      )}

      <div className={cn("flex gap-2 message-bounce mt-1", message.isOwn ? "justify-end" : "justify-start")}>
        {/* avatar */}
        {/* render avatar when not own that message and when break*/}
        {!message.isOwn && (
          <div className="w-8">
            {isBreak && (
              <UserAvatar type="chat" name={sender?.displayName ?? "Echo"} avatarUrl={sender?.avatarUrl ?? undefined}/>
            )}
          </div>
        )}

        {/* content */}
        <div className={cn("max-w-xs lg:max-w-md space-y-1 flex flex-col", message.isOwn ? "items-end" : "items-start")}>
          <Card className={cn("p-3", message.isOwn ? "chat-bubble-sent border-0" : "bg-chat-bubble-received")}>
            <p className="text-sm font-semibold leading-relaxed wrap-break-words">{message.content}</p>
          </Card>

          {/* seen or sent */}
          {message.isOwn && message._id === selectedChat.lastMessage?._id && (
            <Badge variant="outline" className={cn("text-xs px-1.5 py-1.5 border-0 h-4", lastMessageStatus === "seen" ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground")}>
              {lastMessageStatus}
            </Badge>
          )}
        </div>
      </div>
    </>

  );
}

export default MessageItem;