import { MessageCirclePlus, UsersRound, UserRoundPlus } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const ToolBar = () => {
  return (
    <SidebarMenu className="space-y-2">
      {/* search bar */}
      <SidebarMenuItem>
        <Input type="text" placeholder="Search" className="h-8 text-xs" />
      </SidebarMenuItem>

      <div className="grid grid-cols-3 gap-2">
        {/* new message button */}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 bg-transparent dark:hover:bg-primary cursor-pointer"
          onClick={() => console.log("New message clicked")}
        >
          <MessageCirclePlus className="size-4" />
          <span>+Message</span>
        </Button>

        {/* new friend button */}
        <Button
          variant="outline"
          size="sm"
          className="flex-1 gap-2 bg-transparent dark:hover:bg-primary cursor-pointer"
          onClick={() => console.log("New message clicked")}
        >
          <UserRoundPlus className="size-4" />
          <span>+Friend</span>
        </Button>

        {/* new group message */}
        <Button
          variant="outline"
          size="sm"
          className="gap-2 bg-transparent dark:hover:bg-primary cursor-pointer"
          onClick={() => console.log("New group clicked")}
        >
          <UsersRound className="size-4" />
          <span>+Group</span>
        </Button>
      </div>
    </SidebarMenu>
  );
}

export default ToolBar;