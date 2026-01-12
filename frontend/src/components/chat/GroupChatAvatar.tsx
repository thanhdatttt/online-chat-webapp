import type { Member } from "@/types/chat";
import { Ellipsis } from "lucide-react";
import UserAvatar from "@/components/chat/UserAvatar";

// define type for props
interface GroupAvatarProps {
  members: Member[];
  type: "chat" | "sidebar" // position of avatar (from position to get size)
}

const GroupChatAvatar = ({members, type} : GroupAvatarProps) => {
  // get limit avatars in group
  const avatars = [];
  const limit = Math.min(members.length, 3);
  for (let i = 0; i < limit; i++) {
    const member = members[i];
    avatars.push(<UserAvatar key={i} type={type} name={member.displayName} avatarUrl={member.avatarUrl ?? undefined}/>)
  }

  return (
    <div className="relative flex -space-x-2 *:data-[slot=avatar]:ring-background *:data-[slot=avatar]:ring-2">
      {avatars}

      {/* more than 3 avatars will render this */}
      { members.length > 3 && (
          <div className="flex items-center justify-center z-10 size-8 rounded-full bg-muted ring-2 ring-background text-muted-foreground">
            <Ellipsis className="size-4"/>
          </div>
        )
      }
    </div>
  );
}

export default GroupChatAvatar;