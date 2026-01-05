import type { User } from "./user.ts";

// define type for auth store
export interface AuthState {
  accessToken: string | null,
  user: User | null,
  loading: boolean | null,

  setAccesstoken: (accessToken: string) => void;
  clearState: () => void;

  signUp: (username: string, email: string, firstName: string, lastName: string, password: string) => Promise<void>,
  signIn: (usernameOrEmail: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  refresh: () => Promise<void>;
  fetchMe: () => Promise<void>;

  loginWithGoogle: () => Promise<void>;
  loginWithFacebook: () => Promise<void>;
  loginWithGithub: () => Promise<void>;
  handleOauthSuccess: (accessToken: string) => Promise<void>;
}