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
import { useChat } from '@/hooks/useChat';

type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;



// ChatHeader
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

// MessageItem
const MessageItem = React.memo(
  (
    { item }: { item: any }) => {
    const me = useSelector((state: RootState) => state.user.user);
    const isMyMessage = useMemo(() => {
      if (me?.id === item.sender?.id)
        return true;
      return false;
    }, [me?.id, item.sender?.id]);
    return (
      <View
        style={[styles.messageRow, isMyMessage ? styles.myMessageRow : styles.otherMessageRow]}
      >
        {!isMyMessage ? (
          <Image
            source={{
              uri: item.sender.avatar,
            }}
            style={styles.messageAvatar}
            defaultSource={require('../../../assets/user_default.jpg')}
          />
        ) : (
          <Image
            source={{
              uri: me?.avatar,
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
            {new Date(item.timestamp).toLocaleTimeString()}
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
      prevProps.item.senderId?._id === nextProps.item.senderId?._id
    );
  },
);

// MessageInputContainer
const MessageInputContainer = React.memo(
  ({
    channelId,
    sendMessage,
  }: {
    channelId: string;
    sendMessage: (chanId: string, content: string) => void;
  }) => {
    const [inputMessage, setInputMessage] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const handleSendMessage = useCallback(() => {
      if (inputMessage.trim()) {
        sendMessage(channelId, inputMessage);
        setInputMessage('');
        setTimeout(() => {
          flatListRef.current?.scrollToEnd?.({ animated: true });
        }, 100);
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
  const channelId = item.id || '';
  const members = item.members || [];

  // Sử dụng useChat
  const { sendMessage, messages, loading, joinRoom } = useChat(sender?.id);
  console.log("check messages", messages);

  const flatListRef = useRef<FlatList>(null);

  // Tải tin nhắn khi khởi tạo
  useEffect(() => {
    if (channelId && sender?.id) {
      console.log('Loading messages for channelId:', channelId);
      joinRoom(channelId);
    }
  }, [channelId, sender?.id, joinRoom]);



  // Cuộn đến cuối danh sách tin nhắn
  const scrollToEnd = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: any }) => <MessageItem item={item} />,
    [sender],
  );

  const keyExtractor = useCallback(
    (item: any, index: number) =>
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

        <MessageInputContainer channelId={channelId} sendMessage={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);