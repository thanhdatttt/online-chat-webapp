export interface Friend {
    _id: string;
    username: string;
    displayName: string;
    avatarUrl?: string;
}

export interface FriendRequest {
    _id: string;
    from?: {
        _id: string;
        username: string;
        displayName: string;
        avatarUrl?: string;
    };
    to?: {
        _id: string;
        username: string;
        displayName: string;
        avatarUrl?: string;
    };
    message: string;
    createdAt: string;
    updatedAt: string;
}