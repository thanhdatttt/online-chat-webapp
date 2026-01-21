import { friendService } from "@/services/friend.service";
import type { FriendState } from "@/types/store";
import { toast } from "sonner";
import { create } from "zustand";

export const useFriendStore = create<FriendState>((set, get) => ({
  loading: false,
  friends: [],
  receivedList: [],
  sentList: [],

  searchUsers: async (q: string) => {
    try {
      set({loading: true});

      const res = await friendService.searchUsers(q);
      return res.user;
    } catch (err) {
      console.log(err);
      toast.error("Error when search user. Please try again");
      return null;
    } finally {
      set({loading: false});
    }
  },

  sendFriendRequest: async (to: string, message?: string) => {
    try {
      set({loading: true});

      const res = await friendService.sendFriendRequest(to, message);
      return res.message;
    } catch (err) {
      console.log(err);
      return "Error when sending request. Please try again later";
    } finally {
      set({loading: false});
    }
  },

  getAllFriendRequests: async () => {
    try {
      set({loading: true});

      const res = await friendService.getAllFriendRequests();
      if (!res) return;

      const {sent, received} = res;
      set({sentList: sent});
      set({receivedList: received});
    } catch (err) {
      console.log(err);
      toast.error("Error when get requests. Please try again");
      throw err;
    } finally {
      set({loading: false});
    }
  },

  acceptRequest: async (requestId) => {
    try {
      set({loading: true});

      await friendService.acceptRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (err) {
      console.log(err);
      toast.error("Error when accepting. Please try again");
      throw err;
    } finally {
      set({loading: false});
    }
  },

  declineRequest: async (requestId) => {
    try {
      set({loading: true});

      await friendService.declineRequest(requestId);
      set((state) => ({
        receivedList: state.receivedList.filter((r) => r._id !== requestId),
      }));
    } catch (err) {
      console.log(err);
      toast.error("Error when declining. Please try again");
      throw err;
    } finally {
      set({loading: false});
    }
  },

  cancelRequest: async (requestId) => {
    try {
      set({loading: true});

      await friendService.cancelRequest(requestId);
      set((state) => ({
        sentList: state.sentList.filter((r) => r._id !== requestId),
      }));
    } catch (err) {
      console.log(err);
      toast.error("Error when canceling. Please try again");
      throw err;
    } finally {
      set({loading: false});
    }
  },

  getFriends: async () => {
    try {
      set({loading: true});

      const res = await friendService.getFriends();
      const friends = res.friends;
      set({friends: friends});
    } catch (err) {
      console.log(err);
      set({friends: []});
      throw err;
    } finally {
      set({loading: false});
    }
  }
}));