import SocketService from "@/services/Socket.service";
import { useEffect, useState, useCallback, useRef } from "react";
import SOCKET_EVENTS from "@/constants";

interface Sender {
    id: string;
    name: string;
    avatar: string;
}
interface Emoji {
    emoji: string;
    userId: string;
    messageId: string,
    quantity: number;
    createAt: string;
    updateAt: string;
    deleteAt?: string;
}
interface MessageType {
    id?: string;
    _id?: string;
    channelId: string;
    senderId: string;
    content: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    emojis?: Emoji[]
    sender?: Sender;
}

interface ResponseType {
    success: boolean;
    message: string;
    data: any;
}

export const useChat = (currentUserId: string) => {
    const [noMessageToLoad, setNoMessageToLoad] = useState(false);
    const [messages, setMessages] = useState<MessageType[]>([]);
    const [channel, setChannel] = useState<any>(null);
    const [listChannel, setListChannel] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const currentChannelRef = useRef<string | null>(null);
    const isLoadingMessagesRef = useRef<boolean>(false);

    const socketService = SocketService.getInstance(currentUserId);

    // Log messages sau khi trạng thái cập nhật
    useEffect(() => {
        if (messages.length > 0) {
            console.log("Messages updated:", messages);
        }
    }, [messages]);

    useEffect(() => {
        const socket = socketService.getSocket();
        if (!socket.connected) {
            socket.connect();
        }
        console.log("Socket connected:", socket.connected);

        const handleConnectError = (err: Error) => {
            console.error('Socket connection error:', err);
            setError('Không thể kết nối đến server chat');
        };

        const handleDisconnect = (reason: string) => {
            console.warn('Socket disconnected:', reason);
            setError('Mất kết nối với server');
        };

        const findOrCreateResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                setChannel(response.data);
                currentChannelRef.current = response.data.id;
            } else {
                setError(response.message || 'Không thể tạo/tìm phòng chat');
            }
        };

        const joinRoomResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                setChannel(response.data.channel);
                const messages = response.data.messages || [];
                if (messages.length < 10) { // Giả sử server trả về tối đa 10 tin nhắn
                    setNoMessageToLoad(true);
                }
                if (!isLoadingMessagesRef.current) {
                    setMessages(messages);
                }
                currentChannelRef.current = response.data.channel.id;
            } else {
                setError(response.message || 'Không thể tham gia phòng chat');
            }
        };

        const loadMessageResponse = (response: ResponseType) => {
            setLoading(false);
            isLoadingMessagesRef.current = false;
            if (response.success && response.data) {
                const newMessages = Array.isArray(response.data) ? response.data : [];
                if (newMessages.length < 10) {
                    console.log('Setting noMessageToLoad to true due to newMessages.length:', newMessages.length);
                    setNoMessageToLoad(true);
                }
                setMessages(prevMessages => {
                    const updatedMessages = [...newMessages, ...prevMessages];
                    return updatedMessages;
                });
            } else {
                setError(response.message || 'Không thể tải tin nhắn');
            }
        };

        const updateChannelWithMessage = (message: MessageType) => {
            setListChannel(prevChannels => {
                return prevChannels.map(channel => {
                    if (channel.id === message.channelId) {
                        return {
                            ...channel,
                            message: message.content,
                            time: message.timestamp,
                            lastMessage: message,
                            isRead: currentChannelRef.current === message.channelId
                        };
                    }
                    return channel;
                });
            });
        };

        const receivedMessage = (message: any) => {
            console.log("Received message:", message);
            const members = message.members || [];
            const isMember = members.some((member: any) => member.userId === currentUserId);
            if (!isMember) {
                console.log("Received message not for current user, ignoring:", message);
                return;
            }

            loadChannel(currentUserId);

            updateChannelWithMessage(message);

            if (message.channelId !== currentChannelRef.current) {
                console.log("Message is for a different channel, ignoring", {
                    messageChannelId: message.channelId,
                    currentChannelId: currentChannelRef.current
                });
                return;
            }

            setMessages((prev) => {
                const messageId = message.id || message._id;
                const isDuplicate = messageId ?
                    prev.some(msg => (msg.id === messageId || msg._id === messageId)) :
                    false;

                if (isDuplicate) {
                    console.log("Duplicate message detected, not adding");
                    return prev;
                }

                console.log("Adding new message to state for channel:", currentChannelRef.current);
                return [...prev, message];
            });
            setLoading(false);
        };

        const loadChannelResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                const validChannels = (response.data || []).filter(
                    (channel: any) => channel && channel.id && typeof channel === 'object'
                );
                setListChannel(validChannels);
            } else {
                setError(response.message || 'Không thể tải danh sách phòng chat');
            }
        };

        const createGroupResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                setListChannel(prev => [...prev, response.data]);
            } else {
                setError(response.message || 'Không thể tạo nhóm chat');
            }
        };

        const leaveRoomResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                setChannel(null);
                setMessages([]);
                setListChannel(prev => prev.filter(channel => channel && channel.id !== response.data.channelId));
            } else {
                setError(response.message || 'Không thể rời phòng chat');
            }
        };

        //emoji
        const interactEmojiResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success && response.data) {
                const updatedMessage: MessageType = response.data;
                setMessages(prev => prev.map(msg =>
                    msg.id === updatedMessage._id || msg._id === updatedMessage._id
                        ? { ...msg, emojis: updatedMessage.emojis || [] }
                        : msg
                ));
            } else {
                setError(response.message || "Không thể bày tỏ cảm xúc");
            }
        };
        const removeMyEmojiResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success) {
                setMessages(prev => prev.map(msg => {
                    if (msg.id === response.data?._id || msg._id === response.data?._id) {
                        return {
                            ...msg,
                            emojis: msg.emojis?.filter(emoji => emoji.userId !== currentUserId) || []
                        };
                    }
                    return msg;
                }));
            } else {
                setError(response.message || "Không thể xóa emoji");
            }
        };

        const uploadFileResponse = (response: ResponseType) => {
            if (response.success) {
                const newMessage = response.data.message;
                setMessages((prev) => {
                    const messageId = newMessage.id;
                    const isDuplicate = messageId ?
                        prev.some(msg => (msg.id === messageId)) :
                        false;

                    if (isDuplicate) {
                        console.log("Duplicate file message detected, not adding");
                        return prev;
                    }

                    return [...prev, newMessage];
                });

                updateChannelWithMessage(response.data.message);
            } else {
                console.error("Failed to upload file:", response.message);
            }
            setLoading(false);
        };

        socket.on('connect_error', handleConnectError);
        socket.on('disconnect', handleDisconnect);
        socket.on(SOCKET_EVENTS.CHANNEL.JOIN_ROOM_RESPONSE, joinRoomResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.FIND_ORCREATE_RESPONSE, findOrCreateResponse);
        socket.on(SOCKET_EVENTS.MESSAGE.RECEIVED, receivedMessage);
        socket.on(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL_RESPONSE, loadChannelResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.CREATE_RESPONSE, createGroupResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.LEAVE_ROOM_RESPONSE, leaveRoomResponse);
        socket.on(SOCKET_EVENTS.MESSAGE.LOAD_RESPONSE, loadMessageResponse);
        socket.on(SOCKET_EVENTS.EMOJI.INTERACT_EMOJI_RESPONSE, interactEmojiResponse);
        socket.on(SOCKET_EVENTS.EMOJI.REMOVE_MY_EMOJI_RESPONSE, removeMyEmojiResponse);
        socket.on(SOCKET_EVENTS.FILE.UPLOAD_RESPONSE, uploadFileResponse);

        return () => {
            socket.off('connect_error', handleConnectError);
            socket.off('disconnect', handleDisconnect);
            socket.off(SOCKET_EVENTS.CHANNEL.FIND_ORCREATE_RESPONSE, findOrCreateResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.JOIN_ROOM_RESPONSE, joinRoomResponse);
            socket.off(SOCKET_EVENTS.MESSAGE.RECEIVED, receivedMessage);
            socket.off(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL_RESPONSE, loadChannelResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.CREATE_RESPONSE, createGroupResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.LEAVE_ROOM_RESPONSE, leaveRoomResponse);
            socket.off(SOCKET_EVENTS.MESSAGE.LOAD_RESPONSE, loadMessageResponse);
            socket.off(SOCKET_EVENTS.EMOJI.INTERACT_EMOJI_RESPONSE, interactEmojiResponse);
            socket.off(SOCKET_EVENTS.EMOJI.REMOVE_MY_EMOJI_RESPONSE, removeMyEmojiResponse);
            socket.off(SOCKET_EVENTS.FILE.UPLOAD_RESPONSE, uploadFileResponse);
        };
    }, [currentUserId]);

    const findOrCreateChat = useCallback((receiverId: string) => {
        setLoading(true);
        setChannel(null);
        setMessages([]);
        setError(null);
        const socket = socketService.getSocket();
        const params = { senderId: currentUserId, receiverId };
        socket.emit(SOCKET_EVENTS.CHANNEL.FIND_ORCREATE, params);
    }, [currentUserId]);

    const joinRoom = useCallback((channelId: string) => {
        setNoMessageToLoad(false); // Đặt lại khi tham gia phòng
        setChannel(null);
        if (!isLoadingMessagesRef.current) {
            setMessages([]);
        }
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        currentChannelRef.current = channelId;
        const params = { channelId, currentUserId };
        socket.emit(SOCKET_EVENTS.CHANNEL.JOIN_ROOM, params);
    }, [currentUserId]);

    const loadMessages = useCallback((channelId: string) => {
        if (channelId !== currentChannelRef.current || isLoadingMessagesRef.current) {
            console.log('Skipping loadMessages: wrong channel or already loading', {
                channelId,
                currentChannel: currentChannelRef.current,
                isLoading: isLoadingMessagesRef.current,
            });
            return;
        }
        isLoadingMessagesRef.current = true;
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { channelId, offset: messages.length };
        socket.emit(SOCKET_EVENTS.MESSAGE.LOAD, params);
    }, [messages, currentUserId]);

    const sendMessage = useCallback((channelId: string, content: string) => {
        const socket = socketService.getSocket();
        const messageData = {
            channelId,
            senderId: currentUserId,
            content: content.trim(),
            timestamp: new Date().toISOString(),
            status: "sent"
        };
        currentChannelRef.current = channelId;
        setLoading(true);
        socket.emit(SOCKET_EVENTS.MESSAGE.SEND, messageData);
    }, [currentUserId]);

    const loadChannel = useCallback((userId: string) => {
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { currentUserId: userId };
        socket.emit(SOCKET_EVENTS.CHANNEL.LOAD_CHANNEL, params);
    }, []);

    const createGroup = useCallback((name: string, members: string[]) => {
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { name, currentUserId, members };
        socket.emit(SOCKET_EVENTS.CHANNEL.CREATE, params);
    }, [currentUserId]);

    const leaveRoom = useCallback((channelId: string) => {
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { channelId, userId: currentUserId };
        socket.emit(SOCKET_EVENTS.CHANNEL.LEAVE_ROOM, params);
    }, [currentUserId]);

    //emoji
    const interactEmoji = useCallback((messageId: string, emoji: string, userId: string, channelId: string) => {
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { messageId, emoji, userId, channelId };
        socket.emit(SOCKET_EVENTS.EMOJI.INTERACT_EMOJI, params);
    }, [])

    const removeMyEmoji = useCallback((messageId: string, userId: string, channelId: string) => {
        setLoading(true);
        setError(null);
        const socket = socketService.getSocket();
        const params = { messageId, userId, channelId };
        socket.emit(SOCKET_EVENTS.EMOJI.REMOVE_MY_EMOJI, params);
    }, [])


    const getMimeType = (ext: string): string => {
        const map: { [key: string]: string } = {
            jpg: 'image/jpeg',
            jpeg: 'image/jpeg',
            png: 'image/png',
            gif: 'image/gif',
            pdf: 'application/pdf',
            docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            mp4: 'video/mp4',
        };
        return map[ext.toLowerCase()] || 'application/octet-stream';
    };

    const sendFileMessage = useCallback(async (channelId: string, file: any) => {
        const socket = socketService.getSocket();
        setLoading(true);
        console.log("Sending file message:", file);
        try {
            // fetch file local path
            const response = await fetch(file.path); // đường dẫn bắt đầu bằng file:// 
            const arrayBuffer = await response.arrayBuffer();
            console.log("Fetched file data:", arrayBuffer);
            const fileMessage = {
                channelId,
                senderId: currentUserId,
                fileName: file.filename + '.' + file.extension,
                fileData: arrayBuffer,
                mimeType: getMimeType(file.extension),
                timestamp: new Date().toISOString(),
                status: "sent",
            };
            socket.emit(SOCKET_EVENTS.FILE.UPLOAD, fileMessage);
        } catch (error) {
            console.error("Lỗi khi gửi file bằng fetch:", error);
        }
    }, []);



    return {
        findOrCreateChat,
        joinRoom,
        loadMessages,
        sendMessage,
        loadChannel,
        createGroup,
        leaveRoom,
        interactEmoji,
        removeMyEmoji,
        sendFileMessage,
        listChannel,
        channel,
        messages,
        loading,
        error,
        noMessageToLoad
    };
};