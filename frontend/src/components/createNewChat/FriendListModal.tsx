import { useFriendStore } from "@/stores/friend.store";
import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { MessageCircleMore, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import UserAvatar from "@/components/chat/UserAvatar";
import { useChatStore } from "@/stores/chat.store";

const FriendListModal = () => {
  const { friends } = useFriendStore();
  const { createChat } = useChatStore();

  const handleAddConversation = async (friendId: string) => {
    try {
      await createChat("direct", "", [friendId]);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DialogContent className="glass max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl capitalize">
          <MessageCircleMore className="size-5" />
          Start new chat
        </DialogTitle>
      </DialogHeader>

      {/* friends list */}
      <div className="space-y-4">
        <h1 className="text-sm font-semibold text-muted-foreground mb-3 uppercase tracking-wide">
          Friend list
        </h1>

        <div className="space-y-2 max-h-60 overflow-y-auto">
          {friends.map((friend) => (
            <Card
              onClick={() => handleAddConversation(friend._id)}
              key={friend._id}
              className="p-3 cursor-pointer transition-smooth hover:shadow-soft glass hover:bg-muted/30 group/friendCard"
            >
              <div className="flex items-center gap-3">
                {/* avatar */}
                <div className="relative">
                  <UserAvatar
                    type="sidebar"
                    name={friend.displayName}
                    avatarUrl={friend.avatarUrl}
                  />
                </div>

                {/* info */}
                <div className="flex-1 min-w-0 flex flex-col">
                  <h2 className="font-semibold text-sm truncate">
                    {friend.displayName}
                  </h2>
                  <span className="text-sm text-muted-foreground">
                    @{friend.username}
                  </span>
                </div>
              </div>
            </Card>
          ))}

          {friends.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="size-12 mx-auto mb-3 opacity-50" />
              You have no friend now. Add your friend!
            </div>
          )}
        </div>
      </div>
    </DialogContent>
  );
};

export default FriendListModal;