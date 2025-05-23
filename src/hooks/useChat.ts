import SocketService from "@/services/Socket.service";
import { useEffect, useState, useCallback, useRef } from "react";
import SOCKET_EVENTS from "@/constants";
import { setCurrentChannel } from '@/redux/userSlice';
import { useDispatch } from 'react-redux';

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

interface UserType {
    id: string;
    name?: string;
    avatar?: string;
    firstName?: string;
    lastName?: string;
}

interface ChannelMemberType {
    userId: string;
    role?: string;
    user?: UserType;
}

interface ChannelType {
    id: string;
    name?: string;
    type?: 'direct' | 'group';
    members: ChannelMemberType[];
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
            if (response.success) {
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

        // const loadChannelResponse = (response: ResponseType) => {
        //     setLoading(false);
        //     if (response.success && response.data) {
        //         const validChannels = (response.data || []).filter(
        //             (channel: any) => channel && channel.id && typeof channel === 'object'
        //         );
        //         setListChannel(validChannels);
        //     } else {
        //         setError(response.message || 'Không thể tải danh sách phòng chat');
        //     }
        // };

        const loadChannelResponse = (response: ResponseType) => {
            console.log("check response to fetch channel: ", response);
            if (response.success) {
                // Remove duplicates using a Set with channel IDs
                const uniqueChannels = (response.data as ChannelType[]).filter((channel, index, self) =>
                    index === self.findIndex((c) => c.id === channel.id)
                );

                setListChannel(uniqueChannels);
                setLoading(false);
            } else {
                console.error("Failed to load channel:", response.message);
                setLoading(false);
            }
        }

        // const createGroupResponse = (response: ResponseType) => {
        //     setLoading(false);
        //     if (response.success && response.data) {
        //         setListChannel(prev => [...prev, response.data]);
        //     } else {
        //         setError(response.message || 'Không thể tạo nhóm chat');
        //     }
        // };


        const dissolveGroupResponse = (response: ResponseType) => {
            if (response.success) {
                setChannel(null);
                setMessages([]);
                setLoading(false);
                console.log("Group dissolved successfully:", response.data);
                setListChannel((prev) => prev.filter(channel => channel.id !== response.data.id));
            }
            else {
                console.error("Failed to dissolve group:", response.message);
                setLoading(false);
            }
        }

        const createGroupResponse = (response: ResponseType) => {
            if (response.success) {
                console.log("Group created successfully:", response.data);
                setListChannel((prev) => {
                    const channelExists = prev.some(
                        (channel) => channel.id === response.data.id
                    );

                    if (channelExists) {
                        console.log("Channel already exists in list, not adding duplicate:", response.data.id);
                        return prev;
                    }

                    console.log("Adding new channel to list:", response.data.id);
                    return [...prev, response.data];
                });
                setLoading(false);
            } else {
                console.error("Failed to create group:", response.message);
                setLoading(false);
            }
        }

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
        //Thu hoi tin nhan
        const recallMessageResponse = (response: ResponseType) => {
            if (response.success) {
                const messageId = response.data.messageId;
                setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
                console.log("Check message after recall: ", messages);

                loadChannel(currentUserId);
                setLoading(false);
            } else {
                console.error("Failed to recall message:", response.message);
            }
        }
        const deleteMessageResponse = (response: ResponseType) => {
            if (response.success) {
                const messageId = response.data.messageId;
                setMessages((prev) =>
                    prev.map((msg) =>
                        msg.id === messageId ? { ...msg, content: "Tin nhắn đã được thu hồi", isRecalled: true } : msg
                    )
                );
                setLoading(false);
            } else {
                console.error("Failed to delete message:", response.message);
                setLoading(false);
            }
        }

        const addMemberResponse = (response: ResponseType) => {
            setLoading(false);
            if (response.success) {
                // response.data chính là channel đã format (có trường members mới)
                console.log("Thêm thành viên thành công:", response.data);
                setChannel(response.data);           // Cập nhật channel hiện tại nếu đang view chi tiết
                setListChannel(prev => {
                    // Cập nhật listChannel nếu cần: replace channel cũ bằng channel mới
                    return prev.map(ch =>
                        ch.id === response.data.id ? response.data : ch
                    );
                });
            } else {
                console.error("Thêm thành viên thất bại:", response.message);
            }
        };

        const assignRoleUpdatedResponse = (response: ResponseType) => {
            if (response.success) {
                setChannel(response.data);
                setListChannel(prev => {
                    return prev.map(ch =>
                        ch.id === response.data.id ? response.data : ch
                    );
                });
            } else {
                console.error("Phân quyền thành viên thất bại:", response.message);
            }
        }
        // const removeMemberResponse = (response: ResponseType) => {
        //     setLoading(false);
        //     console.log("💲💲💲 ~ removeMemberResponse ~ response.data:", response)

        //     if (response.success) {
        //         setChannel(response.data);

        //         setListChannel(prev => {
        //             return prev.map(ch =>
        //                 ch.id === response.data.id ? response.data : ch
        //             );
        //         });
        //     } else {
        //         console.error(response.message);
        //     }
        // }

        const removeMemberResponse = (response: ResponseType) => {
            setLoading(false);
            const dispatch = useDispatch();
            if (response.success) {
                // Cập nhật channel mới từ server
                setChannel(response.data);
                dispatch(setCurrentChannel(response.data)); // 👈 Cập nhật vào Redux

                // Optional: Đóng modal nếu đang mở
            } else {
                console.error("Xóa thành viên thất bại:", response.message);
            }
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
        socket.on(SOCKET_EVENTS.MESSAGE.RECALL_RESPONSE, recallMessageResponse);
        socket.on(SOCKET_EVENTS.MESSAGE.DELETE_RESPONSE, deleteMessageResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.ADD_MEMBER_RESPONSE, addMemberResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.DISSOLVE_GROUP_RESPONSE, dissolveGroupResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.ROLE_UPDATED, assignRoleUpdatedResponse);
        socket.on(SOCKET_EVENTS.CHANNEL.REMOVE_MEMBER_RESPONSE, removeMemberResponse);



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
            socket.off(SOCKET_EVENTS.MESSAGE.RECALL_RESPONSE, recallMessageResponse);
            socket.off(SOCKET_EVENTS.MESSAGE.DELETE_RESPONSE, deleteMessageResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.ADD_MEMBER_RESPONSE, addMemberResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.DISSOLVE_GROUP_RESPONSE, dissolveGroupResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.ROLE_UPDATED, assignRoleUpdatedResponse);
            socket.off(SOCKET_EVENTS.CHANNEL.REMOVE_MEMBER_RESPONSE, removeMemberResponse);
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
        const params = { channelId, currentUserId, offset: messages.length };
        socket.emit(SOCKET_EVENTS.MESSAGE.LOAD, params);
    }, [messages, currentUserId]);

    const sendMessage = useCallback((channelId: string, content: string, fcmToken: string) => {
        const socket = socketService.getSocket();
        const messageData = {
            channelId,
            senderId: currentUserId,
            fcmToken: fcmToken,
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
        console.log("check userId in useChat: ", userId);
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

    const dissolveGroup = useCallback((channelId: string) => {
        setLoading(true);
        const socket = socketService.getSocket();
        const params = {
            channelId,
            userId: currentUserId
        };
        socket.emit(SOCKET_EVENTS.CHANNEL.DISSOLVE_GROUP, params);
    }, []);

    const addMember = useCallback((channelId: string, userId: string) => {
        setLoading(true);
        console.log("Adding member:", userId, "to channel:", channelId);
        const socket = socketService.getSocket();
        socket.emit(SOCKET_EVENTS.CHANNEL.ADD_MEMBER, { channelId, userId });
    }, []);

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

    //Thu hoi message
    const recallMessage = useCallback((messageId: string) => {
        const socket = socketService.getSocket();
        const params = {
            senderId: currentUserId,
            messageId
        };
        socket.emit(SOCKET_EVENTS.MESSAGE.RECALL, params);
    }, [])
    const deleteMessage = useCallback((messageId: string, channelId: string) => {
        const socket = socketService.getSocket();
        const params = {
            senderId: currentUserId,
            messageId,
            channelId
        };
        socket.emit(SOCKET_EVENTS.MESSAGE.DELETE, params);
    }, [])

    const removeMember = useCallback((channelId: string, senderId: string, userId: string) => {
        setLoading(true);
        const socket = socketService.getSocket();
        socket.emit(SOCKET_EVENTS.CHANNEL.REMOVE_MEMBER, { channelId, senderId, userId });
        setLoading(false);
    }, []);

    const assignRole = useCallback(({ channelId, userId, targetUserId, newRole }: AssignRoleParams) => {
        const socket = socketService.getSocket();
        socket.emit(SOCKET_EVENTS.CHANNEL.ASSIGN_ROLE, { channelId, userId, targetUserId, newRole });
    }, [])


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
        deleteMessage,
        recallMessage,
        sendFileMessage,
        dissolveGroup,
        addMember,
        removeMember,
        assignRole,
        listChannel,
        channel,
        messages,
        loading,
        error,
        noMessageToLoad
    };
};