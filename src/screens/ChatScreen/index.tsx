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
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from './css';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import { RootStackParamList } from '@/navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
import { useChat } from '@/hooks/useChat'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const { item } = route.params || { item: {} };
  const navigation = useNavigation();
  const sender = useSelector((state: RootState) => state.user.user);
  const receiver = route.params?.item.secondUser;
  const { sendMessage, loadMessages, loading, messages } = useChat();
  const [message, setMessage] = useState('');
  const flatListRef = useRef<FlatList>(null);
  console.log("check render");

  // Load messages only when sender or receiver IDs change
  useEffect(() => {
    const fetchMessage = async () => {
      if (sender?._id && receiver?._id) {
        console.log("check fetch");
        await loadMessages(receiver._id, sender._id);
      }
    };
    fetchMessage();
  }, [sender?._id, receiver?._id]);

  const handleSendMessage = useCallback(async () => {
    if (message.trim()) {
      if (sender && receiver) {
        await sendMessage(receiver._id, message, sender._id);
      }
      setMessage('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  }, [message, sender, receiver, sendMessage]);

  const MessageItem = React.memo(
    ({ item }: { item: any }) => {
      const isMyMessage = useMemo(() => {
        // If senderId is an object with _id
        if (item.senderId && typeof item.senderId === 'object' && item.senderId._id) {
          return item.senderId._id === sender?._id;
        }
        // If senderId is a string
        else if (typeof item.senderId === 'string') {
          return item.senderId === sender?._id;
        }
        return false;
      }, [item.senderId, sender?._id]);

      const receiverPerson = item.receiverId;

      return (
        <View style={[
          styles.messageRow,
          isMyMessage ? styles.myMessageRow : styles.otherMessageRow
        ]}>
          {!isMyMessage && (
            <Image
              source={{ uri: receiver?.avatar || receiverPerson?.avatar || 'https://via.placeholder.com/40' }}
              style={styles.messageAvatar}
              defaultSource={require('../../../assets/user_default.jpg')}
            />
          )}

          <View style={[
            styles.messageBubble,
            isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble
          ]}>
            <Text style={styles.messageText}>{item.content}</Text>
            <Text style={styles.messageTime}>
              {new Date(item.timestamp).toLocaleTimeString()}
            </Text>
          </View>
        </View>
      );
    },
    // Thêm hàm so sánh để quyết định khi nào re-render
    (prevProps, nextProps) => {
      // Chỉ render lại khi nội dung hoặc trạng thái thay đổi
      return (
        prevProps.item._id === nextProps.item._id &&
        prevProps.item.content === nextProps.item.content &&
        prevProps.item.status === nextProps.item.status &&
        prevProps.item.timestamp === nextProps.item.timestamp
      );
    }
  );

  // Memoize scroll to end callback
  const scrollToEnd = useCallback(() => {
    flatListRef.current?.scrollToEnd({ animated: true });
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
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

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => <MessageItem item={item} />}
          keyExtractor={(item, index) => item._id ? item._id.toString() : `msg-${index}-${Date.now()}`} style={styles.messageList}
          onContentSizeChange={scrollToEnd}
          onLayout={scrollToEnd}
          initialNumToRender={15}
          maxToRenderPerBatch={10}
          windowSize={10}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tin nhắn"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);