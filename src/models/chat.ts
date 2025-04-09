import { User } from "./user";

export interface Chat {
    _id: string;
    lastMessage: string;
    lastMessageSenderId: string;
    lastMessageStatus: string;
    lastMessageTime: Date;
    secondUser: User;
    createdAt: Date;
    updatedAt: Date;
}