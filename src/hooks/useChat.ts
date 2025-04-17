import SocketService from "@/services/Socket.service";
import { useEffect, useState, useCallback, useRef } from "react";
import * as FileSystem from 'expo-file-system';

const SOCKET_EVENTS = {
    MESSAGE: {
        SEND: "message:send",
        RECEIVED: "message:received",
        DELIVERED: "message:delivered",
        READ: "message:read",
        ERROR: "message:error",
        LOAD: "message:load",
        LOAD_RESPONSE: "message:loadResponse",

    },
    FILE: {
        UPLOAD: "file:upload",
        UPLOAD_RESPONSE: "file:uploadResponse",
    },
    CHANNEL: {
        FIND_BY_ID: "channel:findById",
        FIND_BY_ID_RESPONSE: "channel:findByIdResponse",
        FIND_ORCREATE: "channel:findOrCreate",
        FIND_ORCREATE_RESPONSE: "channel:findOrCreateResponse",
        LOAD_CHANNEL: "channel:load",
        LOAD_CHANNEL_RESPONSE: "channel:loadResponse",
        CREATE: "channel:create",
        CREATE_RESPONSE: "channel:createResponse",
        JOIN_ROOM: "joinRoom",
        JOIN_ROOM_RESPONSE: "joinRoomResponse",
        LEAVE_ROOM: "leaveRoom",
        LEAVE_ROOM_RESPONSE: "leaveRoomResponse",
    },
};

interface Sender {
    id: string;
    name: string;
    avatar: string;
}

interface MessageType {
    id?: string;
    _id?: string;
    channelId: string;
    senderId: string;
    content: string;
    timestamp: string;
    status: 'sent' | 'delivered' | 'read';
    sender?: Sender;
    members?: any[];
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
            console.log("Full response from server:", response);
            if (response.success && response.data) {
                const newMessages = Array.isArray(response.data) ? response.data : [];
                console.log("Received new messages:", newMessages.length);
                if (newMessages.length < 10) {
                    console.log('Setting noMessageToLoad to true due to newMessages.length:', newMessages.length);
                    setNoMessageToLoad(true);
                }
                setMessages(prevMessages => {
                    const updatedMessages = [...newMessages, ...prevMessages];
                    console.log("Updated messages:", updatedMessages);
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
                console.log('Load channel response:', response.data);
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

    interface FileMessage {
        channelId: string;
        senderId: string;
        content: string;
        timestamp: string;
        status: 'sent' | 'delivered' | 'read';
        messageType: 'file';
        file: File;
    }

    interface Acknowledgment {
        success: boolean;
        message: string;
        data?: any;
    }

    // Sửa trong useChat.ts

    interface FileData {
        filename: string;
        path: string;
        extension: string;
        size?: string | number;
    }

    interface FileData {
        filename: string;
        path: string;
        extension: string;
        size?: string | number;
    }



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

    // const sendFileMessage = useCallback((channelId: string, file: File) => {
    //     const socket = socketService.getSocket();
    //     setLoading(true);
    //     console.log("Sending file message:", file);
    //     console.log("id data:", channelId);
    //     const reader = new FileReader(); // Tạo một FileReader để đọc file

    //     console.log("Uploading file:", file);
    //     reader.onload = () => {
    //         const fileData = reader.result as ArrayBuffer; // Đọc dữ liệu file dưới dạng ArrayBuffer
    //         console.log("File data:", fileData);
    //         const fileMessage = {
    //             channelId,
    //             senderId: currentUserId,
    //             fileName: file.name,
    //             fileData,
    //             timestamp: new Date().toISOString(),
    //             status: "sent",
    //         };
    //         console.log("File data read:", fileData);
    //         socket.emit(SOCKET_EVENTS.FILE.UPLOAD, fileMessage);
    //     };
    //     reader.readAsArrayBuffer(file);
    // }, []);


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
        sendFileMessage,
        listChannel,
        channel,
        messages,
        loading,
        error,
        noMessageToLoad
    };
};