import SocketService from "@/services/Socket.service";
import SOCKET_EVENTS from "@/types/socket.event.enum";
import { useEffect, useState, useCallback, useRef } from "react";
interface ResponseType<T> {
    success: boolean;
    message: string;
    data: any;
}

// Hook nhận channelId và userId để hỗ trợ dynamic context
export const useChat = (channelId: string, userId: string) => {
    const socketService = useRef(SocketService.getInstance().getSocket()).current;
    const [messages, setMessages] = useState<any[]>([]);
    const [chatList, setChatList] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [loadingChatList, setLoadingChatList] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const hasSetupListeners = useRef(false);

    // Tải danh sách tin nhắn
    const loadMessages = useCallback(async (chanId: string) => {
        if (!chanId) {
            setError("Channel ID is required");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            if (!socketService.connected) {
                throw new Error("Socket not connected");
            }
            socketService.emit(SOCKET_EVENTS.MESSAGE.LOAD, { channelId: chanId });
            // Fallback: Dùng API nếu cần
            // const response = await getMessages(chanId);
            // setMessages(response.data);
        } catch (err: any) {
            setError(err.message || "Failed to load messages");
            setLoading(false);
        }
    }, []);

    // Gửi tin nhắn mới
    const sendMessage = useCallback((chanId: string, senderId: string, content: string) => {
        if (!chanId || !senderId || !content.trim()) {
            setError("Channel ID, sender ID, and content are required");
            return;
        }
        if (!socketService.connected) {
            setError("Socket not connected");
            return;
        }
        setError(null);
        const messageData = {
            channelId: chanId,
            senderId,
            content,
        };
        socketService.emit(SOCKET_EVENTS.MESSAGE.SEND, messageData);
    }, []);

    // Tải danh sách kênh chat
    const getChatListService = useCallback(async (uId: string) => {
        if (!uId) {
            setError("User ID is required");
            return;
        }
        setLoadingChatList(true);
        setError(null);
        try {
            if (!socketService.connected) {
                throw new Error("Socket not connected");
            }
            socketService.emit(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL, { currentUserId: uId });
            // Fallback: Dùng API nếu cần
            // const response = await getChatList(uId);
            // setChatList(response.data);
        } catch (err: any) {
            setError(err.message || "Failed to load chat list");
            setLoadingChatList(false);
        }
    }, []);

    // Thiết lập Socket.IO listeners
    useEffect(() => {
        if (hasSetupListeners.current || !channelId || !userId) return;

        hasSetupListeners.current = true;
        console.log("Setting up socket listeners");

        // Kết nối socket nếu chưa kết nối
        if (!socketService.connected) {
            socketService.connect();
        }

        // Xóa listeners cũ
        socketService.off(SOCKET_EVENTS.MESSAGE.RECEIVED);
        socketService.off(SOCKET_EVENTS.MESSAGE.READ);
        socketService.off(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL);
        socketService.off(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL_RESPONSE);
        socketService.off(SOCKET_EVENTS.MESSAGE.LOAD);
        socketService.off(SOCKET_EVENTS.MESSAGE.LOAD_RESPONSE);

        // Lắng nghe tin nhắn mới
        socketService.on(SOCKET_EVENTS.MESSAGE.RECEIVED, (newMessage: any) => {
            setMessages((prev) => {
                // Tránh trùng lặp tin nhắn
                if (prev.some((msg) => msg.id === newMessage.id)) {
                    return prev;
                }
                return [...prev, newMessage];
            });
        });

        // Lắng nghe trạng thái tin nhắn
        socketService.on(SOCKET_EVENTS.MESSAGE.READ, (update: { messageId: string }) => {
            setMessages((prev) =>
                prev.map((msg) =>
                    msg.id === update.messageId ? { ...msg, status: "read" } : msg,
                ),
            );
        });

        // Lắng nghe danh sách kênh
        socketService.on(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL_RESPONSE, (data: ResponseType<any[]>) => {
            setLoadingChatList(false);
            if (data.success) {
                setChatList(data.data);
            } else {
                setError(data.message);
            }
        });

        // Lắng nghe danh sách tin nhắn
        socketService.on(SOCKET_EVENTS.MESSAGE.LOAD_RESPONSE, (data: ResponseType<any[]>) => {
            setLoading(false);
            if (data.success) {
                setMessages(data.data);
            } else {
                setError(data.message);
            }
        });

        // Xử lý lỗi socket
        socketService.on("error", (err: { message: string }) => {
            setError(err.message);
        });

        // Cleanup
        return () => {
            console.log("Cleaning up socket listeners");
            socketService.off(SOCKET_EVENTS.MESSAGE.RECEIVED);
            socketService.off(SOCKET_EVENTS.MESSAGE.READ);
            socketService.off(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL);
            socketService.off(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL_RESPONSE);
            socketService.off(SOCKET_EVENTS.MESSAGE.LOAD);
            socketService.off(SOCKET_EVENTS.MESSAGE.LOAD_RESPONSE);
            socketService.off("error");
            socketService.disconnect();
        };
    }, [channelId, userId]);

    return {
        messages,
        sendMessage,
        loadMessages,
        getChatListService,
        loading,
        chatList,
        loadingChatList,
        error,
    };
};