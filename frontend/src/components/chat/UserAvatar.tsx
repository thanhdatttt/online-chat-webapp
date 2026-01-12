import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// define type for avatar props
interface IUserAvatarProps {
  type: "sidebar" | "chat" | "profile"; // position of avatar (from position to get size)
  name: string;
  avatarUrl?: string;
  className?: string; // class css from outside 
}

const UserAvatar = ({type, name, avatarUrl, className} : IUserAvatarProps) => {
  // set up avatar info
  const bgColor = !avatarUrl ? "bg-blue-500" : "";

  if (!name) {
    name = "Echo avatar";
  }

  return (
    <Avatar className={cn(className ?? "",
      type === "sidebar" && "size-12 text-base",
      type === "chat" && "size-8 text-sm",
      type === "profile" && "size-24 text-3xl shadow-md"
    )}>
      <AvatarImage src={avatarUrl} alt={name}/>
      <AvatarFallback className={`${bgColor} text-white font-semibold`}>
        {name.charAt(0)}
      </AvatarFallback>
    </Avatar>
  );
}

export default UserAvatar;