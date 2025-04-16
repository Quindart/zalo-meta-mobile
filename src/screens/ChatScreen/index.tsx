import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from './css';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import { RootStackParamList } from '@/navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat';
import { debounce } from 'lodash';

// Định nghĩa kiểu cho navigation và route
type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Định nghĩa interface cho message
interface Message {
  id?: string;
  _id?: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
}

// ChatHeader component
const ChatHeader = React.memo(
  ({ navigation, item }: { navigation: ChatScreenNavigationProp; item: any }) => (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryContainer]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{item.name || 'Chat'}</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="videocam-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  ),
);

// MessageItem component
const MessageItem = React.memo(
  ({
    content,
    timestamp,
    senderId,
    senderAvatar,
    isMyMessage,
    status,
  }: {
    content: string;
    timestamp: string;
    senderId: string;
    senderAvatar: string;
    isMyMessage: boolean;
    status: string;
  }) => {
    const me = useSelector((state: RootState) => state.user.user);

    return (
      <View style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}>
        <Image
          source={{ uri: isMyMessage ? me?.avatar : senderAvatar }}
          style={styles.messageAvatar}
          defaultSource={require('../../../assets/user_default.jpg')}
        />
        <View style={[styles.messageBubble, isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble]}>
          <Text style={styles.messageText}>{content}</Text>
          <Text style={styles.messageTime}>
            {timestamp ? new Date(timestamp).toLocaleTimeString() : ''}{' '}
            {isMyMessage && (
              <>
                {status === 'sent' && '✓'}
                {status === 'delivered' && '✓✓'}
                {status === 'read' && '✓✓ (Đã đọc)'}
              </>
            )}
          </Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.content === nextProps.content &&
      prevProps.timestamp === nextProps.timestamp &&
      prevProps.senderId === nextProps.senderId &&
      prevProps.senderAvatar === nextProps.senderAvatar &&
      prevProps.isMyMessage === nextProps.isMyMessage &&
      prevProps.status === nextProps.status
    );
  },
);

// MessageInputContainer component
const MessageInputContainer = React.memo(
  ({
    channelId,
    sendMessage,
  }: {
    channelId: string;
    sendMessage: (chanId: string, content: string) => void;
  }) => {
    const [inputMessage, setInputMessage] = useState('');

    const handleSendMessage = useCallback(() => {
      if (inputMessage.trim()) {
        sendMessage(channelId, inputMessage);
        setInputMessage('');
      }
    }, [inputMessage, channelId, sendMessage]);

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tin nhắn"
          value={inputMessage}
          onChangeText={(e) => setInputMessage(e)}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  },
);

// ChatScreen component
const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`ChatScreen render #${renderCountRef.current}`);

  const { item } = route.params || { item: {} };
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const sender = useSelector((state: RootState) => state.user.user);
  const channelId = item?.id || '';

  // Sử dụng useChat hook
  const {
    sendMessage,
    messages,
    loading,
    error,
    joinRoom,
    loadMessages,
    noMessageToLoad,
  } = useChat(sender?.id);

  // State theo dõi trạng thái
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const previousMessagesLength = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const initialRenderRef = useRef(true);


  // Tham gia phòng khi vào màn hình
  useEffect(() => {
    if (channelId && sender?.id) {
      console.log('Joining room with channelId:', channelId);
      setHasMoreMessages(true);
      joinRoom(channelId);
    } else {
      Alert.alert('Lỗi', 'Không thể tham gia phòng chat do thiếu thông tin');
    }
  }, [channelId, sender?.id, joinRoom]);

  // Đồng bộ hasMoreMessages với noMessageToLoad
  useEffect(() => {
    if (noMessageToLoad) {
      console.log('No more messages to load based on noMessageToLoad');
      setHasMoreMessages(false);
    }
  }, [noMessageToLoad]);

  // Kiểm tra tin nhắn và cuộn xuống dưới
  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
    previousMessagesLength.current = messages.length;

    // Cuộn xuống dưới khi vào lần đầu
    if (initialRenderRef.current && messages.length > 0) {
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToEnd({ animated: false });
        } catch (err) {
          console.log('Error scrolling to bottom initially:', err);
        }
        initialRenderRef.current = false;
      }, 500);
    }
  }, [messages, loadingMore]);

  // Cuộn xuống dưới khi có tin nhắn mới (nếu đang ở dưới cùng)
  useEffect(() => {
    if (
      !initialRenderRef.current &&
      !loadingMore &&
      isAtBottom &&
      messages.length > previousMessagesLength.current
    ) {
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToEnd({ animated: true });
        } catch (err) {
          console.log('Error scrolling to bottom after new message:', err);
        }
      }, 300);
    }
  }, [messages.length, loadingMore, isAtBottom]);

  const handleLoadMoreMessages = useCallback(
    debounce(() => {
      if (loading || loadingMore || !hasMoreMessages || !channelId || noMessageToLoad) {
        console.log('Skipping loadMessages in chat room:', {
          loading,
          loadingMore,
          hasMoreMessages,
          channelId,
          noMessageToLoad,
        });
        return;
      }
      console.log('Loading more messages for channelId:', channelId);
      setLoadingMore(true);
      loadMessages(channelId);
    }, 300),
    [channelId, loading, loadingMore, hasMoreMessages, loadMessages, noMessageToLoad],
  );

  // Theo dõi vị trí cuộn
  const handleScroll = useCallback(
    (event: any) => {
      const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
      const isBottom = contentOffset.y >= contentSize.height - layoutMeasurement.height - 50;
      setIsAtBottom(isBottom);
    },
    [],
  );

  // Render header trạng thái load message
  const renderListHeader = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={{ padding: 10, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={{ marginTop: 5, fontSize: 12, color: '#777' }}>
            Đang tải tin nhắn cũ...
          </Text>
        </View>
      );
    }
    if (!hasMoreMessages && messages.length > 0) {
      return (
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Text style={{ fontSize: 12, color: '#777' }}>Đã hiển thị tất cả tin nhắn</Text>
        </View>
      );
    }
    return messages.length > 0 ? (
      <View style={{ padding: 10, alignItems: 'center' }}>
        <Text style={{ fontSize: 12, color: '#777' }}>Kéo xuống để tải thêm tin nhắn cũ</Text>
      </View>
    ) : null;
  }, [loadingMore, hasMoreMessages, messages.length]);

  // Render danh sách trống
  const renderEmptyList = useCallback(() => (
    <View>
      <Text>Chưa có tin nhắn nào. Bắt đầu trò chuyện ngay!</Text>
    </View>
  ), []);

  // Render item tin nhắn
  const renderItem = useCallback(
    ({ item }: { item: Message }) => {
      const isMyMessage = sender?.id === item.sender.id ? true : false;
      return (
        <MessageItem
          content={item.content || ''}
          timestamp={item.timestamp || ''}
          senderId={item.senderId || ''}
          senderAvatar={item.sender?.avatar || 'https://example.com/default-avatar.png'}
          isMyMessage={isMyMessage}
          status={item.status || 'sent'}
        />
      );
    },
    [sender],
  );

  // Key extractor cho FlatList
  const keyExtractor = useCallback(
    (item: Message, index: number) =>
      item.id ? item.id.toString() : item._id ? item._id.toString() : `msg-${index}-${Date.now()}`,
    [],
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <ChatHeader navigation={navigation} item={item} />

        {/* Hiển thị spinner khi tải tin nhắn ban đầu */}
        {loading && messages.length === 0 && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10, color: '#777' }}>Đang tải tin nhắn...</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.messageList}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyList}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={10}
          removeClippedSubviews={Platform.OS === 'android'}
          onRefresh={handleLoadMoreMessages}
          refreshing={loadingMore}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        />

        <MessageInputContainer channelId={channelId} sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);