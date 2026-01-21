import { UserPlusIcon, UsersRound } from "lucide-react";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import AddFriendModal from "@/components/chat/AddFriendModal";

const ToolBar = () => {
  return (
    <SidebarMenu className="space-y-2">
      {/* search bar */}
      <SidebarMenuItem>
        <Input type="text" placeholder="Search" className="h-8 text-xs" />
      </SidebarMenuItem>

      <div className="grid grid-cols-2 gap-2">
        {/* new friend button */}
         <div className="relative">
          {/* visual button */}
          <Button
            variant="outline"
            size="sm"
            className="flex-1 gap-2 w-full pointer-events-none"
          >
            <UserPlusIcon/>
            <span>+Friend</span>
          </Button>

          {/* FULL CLICK TRIGGER */}
          <div className="
            absolute inset-0 z-10
            **:w-full **:h-full
            **:flex **:items-center **:justify-center
            opacity-0
          ">
            <AddFriendModal />
          </div>
        </div>

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