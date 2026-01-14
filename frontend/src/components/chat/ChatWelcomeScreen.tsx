import { SidebarInset } from "@/components/ui/sidebar";
import ChatWindowHeader from "@/components/chat/ChatWindowHeader";

const ChatWelcomeScreen = () => {
  return (
    <SidebarInset className="flex w-full h-full bg-transparent">
      <ChatWindowHeader/>

      <div className="flex bg-primary-foreground rounded-2xl flex-1 items-center justify-center">
        <div className="text-center">
          {/* Icon */}
          <div className="size-24 mx-auto mb-6 rounded-full flex items-center justify-center shadow-glow pulse-ring">
            <span className="text-3xl">
              <img src="./Logo.svg" alt="Echo" />
            </span>
          </div>

          {/* title */}
          <h2 className="text-4xl font-bold mb-2 bg-gradient-chat bg-clip-text text-transparent">Welcome to Echo</h2>

          {/* subtitle */}
          <p className="text-muted-foreground">Start your story now!</p>
        </div>
      </div>
    </SidebarInset>
  );
}

export default ChatWelcomeScreen;