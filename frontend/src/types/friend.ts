export interface Friend {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}

export interface FriendRequest {
    id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}