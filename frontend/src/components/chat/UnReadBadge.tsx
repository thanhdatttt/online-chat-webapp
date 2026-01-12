import { Badge } from "@/components/ui/badge";

const UnReadBadge = ({unReadCounts} : {unReadCounts: number}) => {
  return (
    <div className="pulse-ring absolute z-20 -top-1 -right-1">
      <Badge variant="destructive" className="size-5 flex items-center justify-center p-0 text-xs bg-gradient-chat border border-background">
        {unReadCounts > 9 ? "9+" : unReadCounts}
      </Badge>
    </div>
  );
}

export default UnReadBadge;