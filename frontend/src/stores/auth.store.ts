import { create } from "zustand";
import { toast } from "sonner";
import type { AuthState } from "@/types/store";
import { authService } from "@/services/auth.service";
import { config } from "@/lib/config";

export const useAuthStore = create<AuthState>((set, get) => ({
  accessToken: null,
  user: null,
  loading: false,

  setAccesstoken: (accessToken) => {
    set({accessToken});
  },
  // clear store function
  clearState: () => {
    set({accessToken: null, user: null, loading: false});
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
      const res = await authService.signIn(usernameOrEmail, password);
      get().setAccesstoken(res.accessToken);

      toast.success("Login successfully");

      // get user info after sign in
      await get().fetchMe();
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
     window.location.href =`${config.apiUrl}/api/auth/google`;
  },

  loginWithFacebook: async () => {
     window.location.href =`${config.apiUrl}/api/auth/facebook`;
  },

  loginWithGithub: async () => {
     window.location.href =`${config.apiUrl}/api/auth/github`;
  },

  handleOauthSuccess: async (accessToken) => {
    try {
      set({loading: true});

      get().setAccesstoken(accessToken);
      await get().fetchMe();

      toast.success("Login successfully");
    } catch (err) {
      console.log(err);
      toast.error("Failed to login");
      throw err;
    } finally {
      set({loading: false});
    }
  }
}));