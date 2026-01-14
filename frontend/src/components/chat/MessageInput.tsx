import type { Chat } from "@/types/chat";
import { useAuthStore } from "@/stores/auth.store";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Paperclip, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import EmojiPick from "@/components/chat/EmojiPick";

const MessageInput = ({selectedChat} : {selectedChat: Chat}) => {
  // get user info
  const {user} = useAuthStore();
  // input state
  const [mess, setMess] = useState("");

  if (!user) {
    return;
  }

  return (
    <div className="flex items-center gap-2 p-3 min-h-14 bg-background">
      {/* file button */}
      <Button variant="ghost" size="icon" className="hover:bg-primary/10 transition-smooth cursor-pointer">
        <Paperclip className="size-4"/>
      </Button>

      {/* input */}
      <div className="flex-1 relative">
        <Input value={mess} onChange={(e) => setMess(e.target.value)} placeholder="Enter message" className="pr-20 h-9 bg-white border-border/50 focus:border-primary/50 transition-smooth resize-none">
        </Input>

        {/* emoji button */}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          <Button asChild variant="ghost" size="icon" className="size-8 hover:bg-primary/10 transition-smooth">
            <div>
              {/* emoji */}
              <EmojiPick onChange={(emoji: string) => setMess(`${mess}${emoji}`)}/>
            </div>
          </Button>
        </div>
      </div>

      {/* send button */}
      <Button className="bg-gradient-chat hover:shadow-glow transition-smooth hover:scale-105" disabled={!mess.trim()}>
        <Send className="size-4 text-white"/>
      </Button>
    </div>
  );
}

export default MessageInput;