import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Image, FlatList, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import styles from "./styles"
import popupStyles from './popupcss';
import FileMessageBubble from '../FileMessageBubble';
import ImageGroupBubble from '../ImageGroupBubble';
import { RootState } from '@/redux/store';

interface Emoji {
    emoji: string;
    userId: string;
    messageId: string;
    quantity: number;
    createAt: string;
    updateAt: string;
    deleteAt?: string;
}

interface MessageItemProps {
    content: string;
    timestamp: string;
    senderId: string;
    senderAvatar: string;
    isMyMessage: boolean;
    status: string;
    emojis?: Emoji[];
    onLongPress?: () => void;
    messageType?: string;
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
}

const MessageItem = React.memo(
    ({
        content,
        timestamp,
        senderId,
        senderAvatar,
        isMyMessage,
        status,
        emojis,
        onLongPress,
        messageType,
        file,
        imagesGroup,
    }: MessageItemProps) => {
        const me = useSelector((state: RootState) => state.user.user);
        const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);        // Debug logging

        // Safety check for props
        if (!content && !file && !imagesGroup) {
            console.warn('MessageItem: No content, file, or imagesGroup provided');
        }

        const renderEmojis = useMemo(() => {
            if (!emojis || emojis.length === 0) return null;
            const maxDisplay = 4;
            const displayEmojis = emojis.length > maxDisplay ? emojis.slice(0, 3) : emojis;
            const remainingCount = emojis.length > maxDisplay ? emojis.length - 3 : 0; return (
                <View style={[styles.emojiWrapper, isMyMessage ? styles.emojiWrapperRight : styles.emojiWrapperLeft]}>
                    {displayEmojis.map((emoji, index) => (
                        <View key={index} style={styles.emojiItem}>
                            <Text style={styles.emojiTextIcon}>{emoji.emoji}</Text>
                        </View>
                    ))}
                    {remainingCount > 0 ? (
                        <View style={styles.remainingCount}>
                            <Text style={styles.remainingText}>+{remainingCount}</Text>
                        </View>
                    ) : null}
                </View>
            );
        }, [emojis, isMyMessage]);

        const emojiSummary = useMemo(() => {
            if (!emojis) return [];
            const emojiCountMap: { [key: string]: { emoji: string; count: number } } = {};
            emojis.forEach((emoji) => {
                if (!emojiCountMap[emoji.emoji]) {
                    emojiCountMap[emoji.emoji] = { emoji: emoji.emoji, count: 0 };
                }
                emojiCountMap[emoji.emoji].count += emoji.quantity;
            });
            return Object.values(emojiCountMap);
        }, [emojis]);

        const renderEmojiCount = ({ item }: { item: { emoji: string; count: number } }) => (
            <View style={popupStyles.emojiRow}>
                <Text style={popupStyles.emoji}>{item.emoji}</Text>
                <Text style={popupStyles.emojiCount}>{item.count}</Text>
            </View>
        );

        return (
            <View style={styles.messageWrapper}>                <TouchableOpacity
                activeOpacity={0.8}
                onLongPress={onLongPress}
                style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}
            >
                {!isMyMessage && senderAvatar && (
                    <Image
                        source={{ uri: senderAvatar }}
                        style={styles.messageAvatar}
                        defaultSource={require('../../../../assets/user_default.jpg')}
                    />
                )}
                <View
                    style={[
                        styles.messageBubble,
                        isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
                    ]}
                >
                    {(() => {
                        if ((messageType === 'file' || messageType === 'image') && file) {
                            return <FileMessageBubble file={file} />;
                        } else if (messageType === 'imageGroup' && imagesGroup && imagesGroup.length > 0) {
                            return <ImageGroupBubble imagesGroup={imagesGroup} />;
                        } else {
                            const displayContent = content ? String(content).trim() : '';
                            return displayContent ? (
                                <Text style={styles.messageText}>{displayContent}</Text>
                            ) : (
                                <Text style={styles.messageText}> </Text>
                            );
                        }
                    })()}
                    <Text style={styles.messageTime}>
                        {(() => {
                            const timeStr = timestamp ? new Date(timestamp).toLocaleTimeString() : '';
                            const statusStr = isMyMessage ? (() => {
                                if (status === 'sent') return ' ✓';
                                if (status === 'delivered') return ' ✓✓';
                                if (status === 'read') return ' ✓✓ (Đã đọc)';
                                return '';
                            })() : '';
                            return timeStr + statusStr;
                        })()}
                    </Text>
                </View>
            </TouchableOpacity>
                {renderEmojis ? (
                    <TouchableOpacity
                        onPress={() => setEmojiModalVisible(true)}
                        style={isMyMessage ? styles.myEmojiContainer : styles.otherEmojiContainer}
                    >
                        {renderEmojis}
                    </TouchableOpacity>
                ) : null}
                <Modal
                    visible={isEmojiModalVisible}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setEmojiModalVisible(false)}
                >
                    <TouchableOpacity
                        style={popupStyles.modalOverlay}
                        onPress={() => setEmojiModalVisible(false)}
                        activeOpacity={1}
                    >
                        <View style={popupStyles.modalContent}>
                            <Text style={popupStyles.modalTitle}>Tất cả {emojiSummary.length}</Text>
                            <FlatList
                                data={emojiSummary}
                                renderItem={renderEmojiCount}
                                keyExtractor={(item) => item.emoji}
                                style={popupStyles.emojiList}
                            />
                        </View>
                    </TouchableOpacity>
                </Modal>
            </View>
        );
    }, (prevProps, nextProps) =>
    prevProps.content === nextProps.content &&
    prevProps.timestamp === nextProps.timestamp &&
    prevProps.senderId === nextProps.senderId &&
    prevProps.senderAvatar === nextProps.senderAvatar &&
    prevProps.isMyMessage === nextProps.isMyMessage &&
    prevProps.status === nextProps.status &&
    prevProps.onLongPress === nextProps.onLongPress &&
    prevProps.messageType === nextProps.messageType &&
    JSON.stringify(prevProps.file) === JSON.stringify(nextProps.file) &&
    JSON.stringify(prevProps.imagesGroup) === JSON.stringify(nextProps.imagesGroup) &&
    JSON.stringify(prevProps.emojis) === JSON.stringify(nextProps.emojis)
);

export default MessageItem;