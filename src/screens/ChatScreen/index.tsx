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
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import { RootStackParamList } from '@/navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat'; // Hook đã cải tiến

type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Định nghĩa interface (từ useChat)
interface Message {
  id: string;
  channelId: string;
  senderId: string;
  content: string;
  status: 'sent' | 'delivered' | 'read';
  createdAt: string;
}

interface Chat {
  id: string;
  name: string;
  lastMessage?: Message;
  participants: string[];
}

// ChatHeader
const ChatHeader = React.memo(
  ({ navigation, item }: { navigation: ChatScreenNavigationProp; item: Chat }) => (
    <LinearGradient
      colors={[theme.colors.primary, theme.colors.primaryContainer]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{item.name}</Text>
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

// MessageItem
const MessageItem = React.memo(
  ({ item, sender, receiver }: { item: Message; sender: any; receiver: any }) => {
    const isMyMessage = useMemo(() => {
      if (item.senderId && typeof item.senderId === 'object' && item.senderId._id) {
        return item.senderId._id === sender?._id;
      } else if (typeof item.senderId === 'string') {
        return item.senderId === sender?._id;
      }
      return false;
    }, [item.senderId, sender?._id]);

    const receiverPerson = item.receiverId;

    return (
      <View
        style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}
      >
        {!isMyMessage && (
          <Image
            source={{
              uri: receiver?.avatar || receiverPerson?.avatar || 'https://via.placeholder.com/40',
            }}
            style={styles.messageAvatar}
            defaultSource={require('../../../assets/user_default.jpg')}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.messageTime}>
            {new Date(item.createdAt).toLocaleTimeString()}
          </Text>
        </View>
      </View>
    );
  },
  (prevProps, nextProps) => {
    return (
      prevProps.item.id === nextProps.item.id &&
      prevProps.item.content === nextProps.item.content &&
      prevProps.item.status === nextProps.item.status &&
      prevProps.item.createdAt === nextProps.item.createdAt &&
      prevProps.sender?._id === nextProps.sender?._id
    );
  },
);

// MessageInputContainer
const MessageInputContainer = React.memo(
  ({
    channelId,
    senderId,
    sendMessage,
  }: {
    channelId: string;
    senderId: string;
    sendMessage: (chanId: string, senderId: string, content: string) => void;
  }) => {
    const [inputMessage, setInputMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);

    const handleSendMessage = useCallback(() => {
      if (inputMessage.trim()) {
        sendMessage(channelId, senderId, inputMessage);
        setInputMessage('');
        setTimeout(() => {
          flatListRef.current?.scrollToEnd?.({ animated: true });
        }, 100);
      }
    }, [inputMessage, channelId, senderId, sendMessage]);

    return (
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Tin nhắn"
          value={inputMessage}
          onChangeText={setInputMessage}
          multiline
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>
    );
  },
);

// ChatScreen
const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`ChatScreen render #${renderCountRef.current}`);

  const { item } = route.params || { item: {} };
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const sender = useSelector((state: RootState) => state.user.user);
  const channelId = item.id; // Giả định item.id là channelId
  const userId = sender?._id || '';

  // Sử dụng useChat
  const {
    messages,
    sendMessage,
    loadMessages,
    getChatListService,
    loading,
    chatList,
    loadingChatList,
    error,
  } = useChat(channelId, userId);

  const flatListRef = useRef<FlatList>(null);

  // Tải tin nhắn và danh sách kênh khi khởi tạo
  useEffect(() => {
    if (channelId && userId) {
      loadMessages(channelId);
      getChatListService(userId);
    }
  }, [channelId, userId, loadMessages, getChatListService]);

  // Hiển thị lỗi nếu có
  useEffect(() => {
    if (error) {
      Alert.alert('Error', error, [{ text: 'OK', onPress: () => { } }]);
    }
  }, [error]);

  // Cuộn đến cuối danh sách tin nhắn
  const scrollToEnd = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: Message }) => (
      <MessageItem item={item} sender={sender} receiver={item.secondUser} />
    ),
    [sender],
  );

  const keyExtractor = useCallback(
    (item: Message, index: number) =>
      item.id ? item.id.toString() : `msg-${index}-${Date.now()}`,
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

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.messageList}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
          removeClippedSubviews={true}
        />

        <MessageInputContainer channelId={channelId} senderId={userId} sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);