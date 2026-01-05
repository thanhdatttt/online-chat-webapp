export type AuthProviderType =
  | "local"
  | "google"
  | "facebook"
  | "github";

export interface AuthProvider {
  provider: AuthProviderType;
  providerUserId: string;
  hashedPassword?: string | null;
  createdAt: string; 
}

// define User type
export interface User {
  _id: string;

  username: string;
  email: string;
  displayName: string;

  authProviders: AuthProvider[];

  avatarUrl?: string | null;
  bio?: string | null;
  phone?: string;

  status: "active" | "banned";

  createdAt: string;
  updatedAt: string;
}