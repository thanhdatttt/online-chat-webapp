import { create } from "zustand";
import { toast } from "sonner";
import type { AuthState } from "@/types/store";
import { authService } from "@/services/auth.service";
import { config } from "@/lib/config";
import { persist } from "zustand/middleware";
import { useChatStore } from "@/stores/chat.store";

export const useAuthStore = create<AuthState>()(
  // store and manage user info in local storage
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      loading: false,

      setAccesstoken: (accessToken) => {
        set({accessToken});
      },
      // clear store function and other stores
      clearState: () => {
        set({accessToken: null, user: null, loading: false});
        localStorage.clear();
        useChatStore.getState().reset();
      },

      // auth functions
      signUp: async (username, email, firstName, lastName, password) => {
        try {
          set({loading: true});
          await authService.signUp(username, email, firstName, lastName, password);
          
          toast.success("Registered successfully");
        } catch (err) {
          console.log(err);
          toast.error("Failed to register");
          throw err;
        } finally {
          set({loading: false});
        }
      },

      signIn: async (usernameOrEmail, password) => {
        try {
          set({loading: true});

          // clear local storage and stores
          localStorage.clear();
          useChatStore.getState().reset();

          const res = await authService.signIn(usernameOrEmail, password);
          get().setAccesstoken(res.accessToken);

          toast.success("Login successfully");

          // get infos (user, chats, ...)
          await get().fetchMe();
          useChatStore.getState().fetchChats();
        } catch (err) {
          console.log(err);
          toast.error("Failed to login");
          throw err;
        } finally {
          set({loading: false});
        }
      },

      signOut: async () => {
        try {
          set({loading: true});

          await authService.signOut();
          get().clearState();

          toast.success("Logout successfully");
        } catch (err) {
          console.log(err);
          toast.error("Failed to logout");
          throw err;
        } finally {
          set({loading: false});
        }
      },

      refresh: async () => {
        try {
          set({loading: true});

          const {user, fetchMe, setAccesstoken} = get();
          const res = await authService.refresh();
          const accessToken = res.accessToken;
          setAccesstoken(accessToken);

          if (!user) {
            await fetchMe();
          }
        } catch (err) {
          console.log(err);
          toast.error("Failed to refresh");
          get().clearState();
          throw err;
        } finally {
          set({loading: false});
        }
      },

      fetchMe: async () => {
        try {
          set({loading: true});

          const res = await authService.fetchMe();
          set({
            user: res.user,
          });

        } catch (err) {
          console.log(err);
          set({accessToken: null, user: null});
          toast.error("Failed to get user info. Try again");
          throw err;
        } finally {
          set({loading: false});
        }
      },

      loginWithGoogle: async () => {
        // clear local storage and stores
        localStorage.clear();
        useChatStore.getState().reset();

        window.location.href =`${config.apiUrl}/auth/google`;
      },

      loginWithFacebook: async () => {
        // clear local storage and stores
        localStorage.clear();
        useChatStore.getState().reset();

        window.location.href =`${config.apiUrl}/auth/facebook`;
      },

      loginWithGithub: async () => {
        // clear local storage and stores
        localStorage.clear();
        useChatStore.getState().reset();

        window.location.href =`${config.apiUrl}/auth/github`;
      },

      handleOauthSuccess: async (accessToken) => {
        try {
          set({loading: true});

          get().setAccesstoken(accessToken);

          // get infos (user, chats, ...)
          await get().fetchMe();
          useChatStore.getState().fetchChats();

          toast.success("Login successfully");
        } catch (err) {
          console.log(err);
          toast.error("Failed to login");
          throw err;
        } finally {
          set({loading: false});
        }
      }
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({user: state.user}) // only store user in local storage
    }
  )
);