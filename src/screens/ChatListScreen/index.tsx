import React, { useState, useEffect, useCallback, memo } from 'react';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './css';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat';

// Định nghĩa type (đồng bộ với useChat)
interface User {
  _id: string;
  firstName: string;
  lastName: string;
  avatar?: string;
}

interface Chat {
  id: string;
  secondUser?: User;
  lastMessage?: string;
  lastMessageTime?: string;
  isCallLog?: boolean;
  hasNotification?: boolean;
  userCount?: number;
}

// Component render item
const ChatItem = memo(
  ({ item, navigation }: { item: Chat; navigation: NavigationProp<ParamListBase> }) => {
    const getTimeDisplay = useCallback((time?: string) => {
      if (!time) return 'mới đây';
      const now = new Date();
      const msgDate = new Date(time);
      const diffMs = now.getTime() - msgDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHrs = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHrs / 24);

      if (diffMins < 1) return 'mới đây';
      if (diffMins < 60) return `${diffMins} phút`;
      if (diffHrs < 24) return `${diffHrs} giờ`;
      if (diffDays < 7) return `${diffDays} ngày`;
      return msgDate.toLocaleDateString();
    }, []);

    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate(ROUTING.CHAT_SCREEN, { item })}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: item.secondUser?.avatar || 'https://via.placeholder.com/150',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.secondUser
                ? `${item.secondUser.firstName} ${item.secondUser.lastName}`
                : 'Unknown User'}
            </Text>
            <Text style={styles.chatTime}>{getTimeDisplay(item.lastMessageTime)}</Text>
          </View>
          <View style={styles.chatPreview}>
            {item.isCallLog && (
              <Ionicons name="call" size={14} color="gray" style={styles.messageIcon} />
            )}
            <Text style={styles.chatMessage} numberOfLines={1}>
              {item.lastMessage || 'No messages'}
            </Text>
            {item.hasNotification && <View style={styles.notificationDot} />}
            {item.userCount && (
              <View style={styles.userCountContainer}>
                <Text style={styles.userCountText}>{item.userCount}</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.lastMessage === nextProps.item.lastMessage &&
    prevProps.item.lastMessageTime === nextProps.item.lastMessageTime,
);

// ChatListScreen
const ChatListScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const currentUserId = useSelector((state: RootState) => state.user.user?._id || '');
  const { getChatListService, chatList, loadingChatList, error } = useChat('', currentUserId);

  // Tải danh sách kênh chat
  useEffect(() => {
    if (currentUserId) {
      getChatListService(currentUserId);
    }
  }, [currentUserId, getChatListService]);

  // Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: () => { } }]);
    }
  }, [error]);

  const renderChatItem = useCallback(
    ({ item }: { item: Chat }) => <ChatItem item={item} navigation={navigation} />,
    [navigation],
  );

  const keyExtractor = useCallback((item: Chat) => item.id, []);

  return (
    <View style={styles.container}>
      {loadingChatList && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text>Loading chats...</Text>
        </View>
      )}
      <FlatList
        data={chatList}
        renderItem={renderChatItem}
        keyExtractor={keyExtractor}
        style={styles.chatList}
        ListEmptyComponent={() => {
          if (!loadingChatList) {
            return (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No chats available</Text>
              </View>
            );
          }
          return null;
        }}
      />
    </View>
  );
};

export default ChatListScreen;