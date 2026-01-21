import * as React from "react";
import { NavUser } from "@/components/sidebar/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useThemeStore } from "@/stores/theme.store";
import { useAuthStore } from "@/stores/auth.store";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import ToolBar from "@/components/chat/ToolBar";
import NewGroupModal from "@/components/chat/NewGroupModal";
import AddFriendModal from "@/components/chat/AddFriendModal";
import GroupChatList from "@/components/chat/GroupChatList";
import DirectChatList from "@/components/chat/DirectChatList";
import CreateNewChat from "@/components/chat/CreateNewChat";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // get theme functions
  const {isDark, toggleTheme} = useThemeStore();
  // get user info
  const {user} = useAuthStore();

  return (
    <Sidebar variant="inset" {...props}>
      {/* header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="bg-gradient-primary">
              <div>
                <div className="flex w-full itens-center justify-between px-2">
                  {/* App name */}
                  <h1 className="text-xl font-bold text-slate-100">Echo</h1>

                  {/* them switch */}
                  <div className="flex items-center gap-2">
                    <Sun className="size-4 text-white/80"/>
                    <Switch checked={isDark} onCheckedChange={toggleTheme} className="data-[state=checked]:bg-background/80"/>
                    <Moon className="size-4 text-white/80"/>
                  </div>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* content */}
      <SidebarContent className="beautiful-scrollbar">
        {/* tool bar */}
        <SidebarGroup>
          <ToolBar/>
        </SidebarGroup>
        <SidebarGroup>
          <CreateNewChat/>
        </SidebarGroup>

        {/* direct message */}
        <SidebarGroup>
          {/* header */}
          <SidebarGroupLabel>Friends</SidebarGroupLabel>
          <SidebarGroupAction title="Add friend" className="cursor-pointer">
            <AddFriendModal/>
          </SidebarGroupAction>

          {/* content */}
          <SidebarContent>
            <DirectChatList/>
          </SidebarContent>
        </SidebarGroup>

        {/* group message */}
        <SidebarGroup>
          {/* header */}
          <SidebarGroupLabel>Chats</SidebarGroupLabel>
          <SidebarGroupAction title="Create group" className="cursor-pointer">
            <NewGroupModal/>
          </SidebarGroupAction>

          {/* content */}
          <SidebarContent>
            <GroupChatList/>
          </SidebarContent>
        </SidebarGroup>
      </SidebarContent>

      {/* footer */}
      <SidebarFooter>
        {user && <NavUser user={user} />}
      </SidebarFooter>
    </Sidebar>
  )
}
