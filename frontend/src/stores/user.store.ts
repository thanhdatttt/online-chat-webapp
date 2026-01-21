
import type { UserState } from "@/types/store";
import { userService } from "@/services/user.service";
import { useAuthStore } from "@/stores/auth.store";
import { useChatStore } from "@/stores/chat.store";
import { create } from "zustand";
import { toast } from "sonner";

export const useUserStore = create<UserState>(() => ({
  updateAvatarUrl: async (formData) => {
    try {
      const { user, setUser } = useAuthStore.getState();
      const data = await userService.uploadAvatar(formData);

      if (user) {
        setUser({
          ...user,
          avatarUrl: data.avatarUrl,
        });

        useChatStore.getState().fetchChats();
      }
    } catch (err) {
      console.log(err);
      toast.error("Upload avatar failed");
      throw err;
    }
  },
}));
