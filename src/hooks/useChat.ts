import { getMessages } from "@/services/message.service";
import SocketService from "@/services/Socket.service";
import SOCKET_EVENTS from "@/types/socket.event.enum";
import { useEffect, useState, useCallback } from "react";
import { getChatList } from "@/services/chat.service"
import { setChatList } from "@/redux/chatSlice";
import { useDispatch } from 'react-redux';
export const useChat = () => {
    const dispatch = useDispatch();
    const [messages, setMessages] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const loadMessages = async (receiverId: string, senderId: string) => {
        if (!receiverId || !senderId) return;
        setLoading(true);
        try {
            const response: any = await getMessages(receiverId, senderId);
            if (response) {
                setMessages(response.messages);
            } else {
                setMessages([]);
            }
        } catch (error: any) {
            console.error("Error loading messages:", error);
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    //TODO: HANDLE EVENT
    useEffect(() => {
        SocketService.getSocket().connect();
        SocketService.getSocket().off(SOCKET_EVENTS.MESSAGE.RECEIVED);
        SocketService.getSocket().off(SOCKET_EVENTS.MESSAGE.READ);
        SocketService.getSocket().on(SOCKET_EVENTS.MESSAGE.RECEIVED, (newMessage: any) => {
            setMessages((prev: any[]) => [...prev, newMessage]);
        });
        SocketService.getSocket().on(SOCKET_EVENTS.MESSAGE.READ, (update: any) => {
            setMessages((prev: any[]) =>
                prev.map((msg) =>
                    msg.id === update.messageId ? { ...msg, status: "read" } : msg,
                ),
            );
        });
        return () => {
            SocketService.getSocket().disconnect();
            SocketService.getSocket().off(SOCKET_EVENTS.MESSAGE.RECEIVED);
            SocketService.getSocket().off(SOCKET_EVENTS.MESSAGE.READ);
        };
    }, []);

    //TODO: SEND
    const sendMessage = (receiverId: string, content: string, userId: string) => {
        const messageData = {
            senderId: userId,
            receiverId,
            content,
        };
        SocketService.getSocket().emit(SOCKET_EVENTS.MESSAGE.SEND, messageData);
    };

    const getChatListService = useCallback(async () => {
        const result: any = await getChatList();
        dispatch(setChatList(result.chats));
    }, [dispatch]);
    return { messages, sendMessage, loadMessages, loading, getChatListService };
};