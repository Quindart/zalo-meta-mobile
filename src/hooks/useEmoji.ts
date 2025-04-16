import SocketService from "@/services/Socket.service";
import SOCKET_EVENTS from "@/types/socket.event.enum";
import { useEffect, useState, useCallback, useRef } from "react";
interface ResponseType<T> {
    success: boolean;
    message: string;
    data: any;
}

export const useEmoji = () => {
    const socketService = useRef(SocketService.getInstance().getSocket()).current;
    const emojis = useState(null);
    const interactEmoji = useCallback(async (messageId: string, emoji: string, userId: string) => {

    }, [])
}