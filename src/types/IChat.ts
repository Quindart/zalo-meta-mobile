export interface Sender {
    id: string;
    name: string;
    avatar: string;
}
export interface Emoji {
    emoji: string;
    userId: string;
    messageId: string,
    quantity: number;
    createAt: string;
    updateAt: string;
    deleteAt?: string;
}
export interface MessageType {
    id?: string;
    _id?: string;
    channelId: string;
    senderId: string;
    content: string;
    timestamp: string;
    isDeletedById: string,
    status: 'sent' | 'delivered' | 'read';
    emojis?: Emoji[]
    messageType?: 'text' | 'file' | 'imageGroup';
    file?: {
        filename: string;
        path: string;
        extension: string;
        size?: string | number;
    };
    imagesGroup?: Array<{
        id: string;
        filename: string;
        path: string;
        extension: string;
        size?: string | number;
    }>;
    sender?: Sender;
}

export interface ResponseType {
    success: boolean;
    message: string;
    data: any;
}

export interface UserType {
    id: string;
    name?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
}

export interface ChannelMemberType {
    userId: string;
    role?: string;
    user?: UserType;
}

export interface ChannelType {
    id: string;
    name?: string;
    type?: 'direct' | 'group';
    members: any[];
    createdAt?: string;
    updatedAt?: string;
    message?: string;
    time?: string;
    lastMessage?: MessageType;
    isRead?: boolean;
    avatar?: string;
    isDeleted?: boolean;
}

export interface AssignRoleParams {
    channelId: string;
    userId: string;
    targetUserId: string;
    newRole: 'captain' | 'member' | 'sub_captain';
};