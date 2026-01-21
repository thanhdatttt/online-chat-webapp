import api from "@/lib/axios";

export const friendService = {
  searchUsers: async (q: string) => {
    try {
      const res = await api.get(`/users/search?q=${q}`);
      return res.data;
    } catch (err) {
        console.log(err);
        throw err;
    }
  },

  sendFriendRequest: async (to: string, message?: string) => {
    try {
      const res = await api.post("/friends/requests", {to, message});
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getAllFriendRequests: async () => {
    try {
      const res = await api.get("/friends/requests");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  acceptRequest: async (requestId: string) => {
    try {
      await api.post(`/friends/requests/${requestId}/accept`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  declineRequest: async (requestId: string) => {
    try {
      await api.post(`/friends/requests/${requestId}/decline`);
    } catch (err) {
       console.log(err);
       throw err;
    }
  },

  cancelRequest: async (requestId: string) => {
    try {
      await api.post(`/friends/requests/${requestId}/cancel`);
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  getFriends: async () => {
    try {
      const res = await api.get("/friends");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}