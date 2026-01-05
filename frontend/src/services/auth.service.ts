import api from "@/lib/axios";

// auth service functions
export const authService = {
  signUp: async (username: string, email: string, firstName: string, lastName:string, password: string) => {
    try {
      const res = await api.post("/auth/signup", {username, email, firstName, lastName, password});
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  signIn: async (usernameOrEmail: string, password: string) => {
    try {
      const res = await api.post("/auth/signin", {usernameOrEmail, password});
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  signOut: async () => {
    try {
      await api.post("/auth/signout");
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  refresh: async () => {
    try {
      const res = await api.post("/auth/refresh");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  fetchMe: async () => {
    try {
      const res = await api.get("/users/me");
      return res.data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  },
};