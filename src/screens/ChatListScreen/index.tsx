import React, { useEffect, useCallback, memo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import styles from './css';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat';

interface Chat {
  id: string;
  avatar?: string;
  name?: string;
  message?: string;
  time?: string;
  type?: string;
  members?: any[];
}

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
              uri: item.avatar || 'https://via.placeholder.com/150',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.name || 'Unknown User'}
            </Text>
            <Text style={styles.chatTime}>{getTimeDisplay(item.time)}</Text>
          </View>
          <View style={styles.chatPreview}>
            <Text style={styles.chatMessage} numberOfLines={1}>
              {item.message || 'No messages'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.message === nextProps.item.message &&
    prevProps.item.time === nextProps.item.time,
);

const listChannelScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const currentUserId = useSelector((state: RootState) => state.user.user?.id || '');
  console.log('currentUserId: ', currentUserId);
  const { loadChannel, listChannel, loading } = useChat(currentUserId);
  useFocusEffect(
    useCallback(() => {
      if (currentUserId) {
        console.log('Screen focused, calling loadChannel with userId:', currentUserId);
        loadChannel(currentUserId);
      }
    }, [currentUserId, loadChannel]),
  );


  useEffect(() => {
    console.log('listChannel updated:', listChannel);
  }, [listChannel]);

  const renderChatItem = useCallback(
    ({ item }: { item: Chat }) => <ChatItem item={item} navigation={navigation} />,
    [navigation],
  );

  const keyExtractor = useCallback((item: Chat) => item.id, []);

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ alignItems: 'center', padding: 20 }}>
          <ActivityIndicator size="large" color="#1E88E5" />
          <Text>Loading chats...</Text>
        </View>
      )}
      <FlatList
        data={listChannel}
        renderItem={renderChatItem}
        keyExtractor={keyExtractor}
        style={styles.chatList}
      />
    </View>
  );
};

export default listChannelScreen;