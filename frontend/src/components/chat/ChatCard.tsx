import { Card } from "@/components/ui/card";
import { formatOnlineTime, cn } from "@/lib/utils";
import { MoreHorizontal } from "lucide-react";

// define type for props
interface ChatCardProps {
  chatId: string;
  name: string;
  timestamps?: Date;
  isActive: boolean;
  unReadCounts: number;
  leftSection: React.ReactNode; // for avatar (a react node)
  subtitle: React.ReactNode; // for number of members (a react node)

  // handle functions
  onSelect: (id: string) => void;
}

const ChatCard = ({
  chatId, name, timestamps, isActive, unReadCounts, leftSection, subtitle, onSelect
} : ChatCardProps) => {
  return (
    <Card key={chatId} className={cn("border-none p-3 cursor-pointer transition-smooth glass hover:bg-muted/25", 
      isActive && "ring-2 ring-primary bg-linear-to-tr from-primary-foreground to-primary-glow"
    )} onClick={() => onSelect(chatId)}>
      <div className="flex items-center gap-3">
        {/* avatar node */}
        <div className="relative">{leftSection}</div>

        {/* info node */}
        <div className="flex-1 min-w-0">
          {/* name and time */}
          <div className="flex items-center justify-between mb-1">
            <h3 className={cn("font-semibold text-sm truncate", 
              unReadCounts && unReadCounts > 0 && "text-foreground"
            )}>{name}</h3>

            <span className="text-xs text-muted-foreground">
              {timestamps ? formatOnlineTime(timestamps) : ""}
            </span>
          </div>

          {/* subtitle node */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 flex-1 min-w-0">
              {subtitle}
            </div>

            <MoreHorizontal className="size-4 text-foreground opacity-0 group-hover:opacity-100 hover:size-5 transition-smooth"/>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default ChatCard;