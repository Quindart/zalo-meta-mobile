import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Clipboard,
  TouchableOpacity,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { debounce } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

import { chatScreenStyle as styles } from './style';
import theme from '@/theme';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat';
import { setCurrentChannel } from '@/redux/userSlice';
import ChatHeader from '@/components/chat/ChatHeader';
import MessageItem from '@/components/chat/MessageItem';
import MessageInputContainer from '@/components/chat/MessageInput';
import ForwardMessage from '@/components/chat/ForwardMessage';
import { MessageType, Emoji } from '@/types/IChat';
export interface Message {
  id?: string;
  _id?: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: 'sent' | 'delivered' | 'read';
  emojis?: Emoji[];
  messageType?: 'text' | 'file' | 'imageGroup';
  isDeletedById: string;
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
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
}
type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`ChatScreen render #${renderCountRef.current}`);

  const { item }: any = route.params || { item: {} };
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const sender = useSelector((state: RootState) => state.user.user);
  const channelId = item?.id || '';
  const {
    sendMessage,
    messages,
    loading,
    error,
    joinRoom,
    channel,
    loadMessages,
    noMessageToLoad,
    interactEmoji,
    removeMyEmoji,
    sendFileMessage,
    recallMessage,
    deleteMessage,
    forwardMessage,
    uploadImageGroup
  } = useChat(`${sender?.id}`);

  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const previousMessagesLength = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const initialRenderRef = useRef(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [openForward, setOpenForward] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert('Lỗi', error);
    }
  }, [error]);

  useEffect(() => {
    if (channelId && sender?.id) {
      setHasMoreMessages(true);
      joinRoom(channelId);
    } else {
      Alert.alert('Lỗi', 'Không thể tham gia phòng chat do thiếu thông tin');
    }
  }, [channelId, sender?.id, joinRoom]);

  useEffect(() => {
    if (noMessageToLoad) {
      setHasMoreMessages(false);
    }
  }, [noMessageToLoad]);

  useEffect(() => {
    if (loadingMore) {
      setLoadingMore(false);
    }
    previousMessagesLength.current = messages.length;

    if (initialRenderRef.current && messages.length > 0) {
      setTimeout(() => {
        try {
          flatListRef.current?.scrollToEnd({ animated: false });
        } catch (err) { }
        initialRenderRef.current = false;
      }, 500);
    }
  }, [messages, loadingMore]);

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
        } catch (err) { }
      }, 300);
    }
  }, [messages.length, loadingMore, isAtBottom]);

  useEffect(() => {
    if (channel && channel.id) {
      console.log("Cập nhật currentChannel:", channel);
      dispatch(setCurrentChannel(channel));
    }
  }, [channel, dispatch]);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: '*/*' });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const name = asset.name;
      const uri = asset.uri;
      const size = asset.size || 0;
      const extension = name.split('.').pop() || '';
      const filename = name.replace(`.${extension}`, '');
      const fileData = { filename, path: uri, extension, size };
      sendFileMessage(channelId, fileData);
    }
  };
  const handlePickMultipleImages = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: true,
        selectionLimit: 4, // Limit to 4 images like the web version
        quality: 0.8,
        aspect: [4, 3],
        allowsEditing: false,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        // Convert ImagePicker assets to File-like objects for uploadImageGroup
        const filePromises = result.assets.map(async (asset, index) => {
          const name = asset.fileName || `image_${index}.jpg`;

          // Fetch the image data as blob then convert to File-like object
          const response = await fetch(asset.uri);
          const blob = await response.blob();

          // Create a File-like object that works with FileReader
          const file = new File([blob], name, {
            type: asset.type || 'image/jpeg'
          });

          return file;
        });

        const fileObjects = await Promise.all(filePromises);
        uploadImageGroup(channelId, fileObjects);
      }
    } catch (error) {
      console.error('Error picking multiple images:', error);
      Alert.alert('Error', 'Failed to select images. Please try again.');
    }
  };

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
      setLoadingMore(true);
      loadMessages(channelId);
    }, 300),
    [channelId, loading, loadingMore, hasMoreMessages, loadMessages, noMessageToLoad]
  );

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isBottom = contentOffset.y >= contentSize.height - layoutMeasurement.height - 50;
    setIsAtBottom(isBottom);
  }, []);

  const handleLongPressMessage = useCallback((message: Message) => {
    setSelectedMessage(message);
    setIsPopupVisible(true);
  }, []);

  const handleQuickReact = useCallback(
    (emoji: string) => {
      if (!selectedMessage) return;
      interactEmoji(
        selectedMessage.id || selectedMessage._id || '',
        emoji,
        sender?.id || '',
        selectedMessage.channelId
      );
      setIsPopupVisible(false);
      setSelectedMessage(null);
    },
    [selectedMessage, interactEmoji, sender?.id]
  ); const handlePopupAction = useCallback(
    (action: string) => {
      if (!selectedMessage) return;
      switch (action) {
        case 'reply':
          Alert.alert('Thông báo', 'Chức năng trả lời tin nhắn chưa được triển khai.');
          break; case 'forward':
          setOpenForward(true);
          setIsPopupVisible(false);
          return;
        case 'backup-restore':
          if (selectedMessage.sender.id !== sender?.id) {
            Alert.alert('Thông báo', 'Chức năng thu hồi tin nhắn không giành cho người nhận.');
            break;
          }
          deleteMessage(selectedMessage.id || selectedMessage._id || '', selectedMessage.channelId);
          break;
        case 'copy':
          if (selectedMessage) {
            Clipboard.setString(selectedMessage.content);
            Alert.alert('Thông báo', 'Đã sao chép tin nhắn!');
          }
          break;
        case 'delete':
          recallMessage(selectedMessage.id || selectedMessage._id || '');
          break;
        case 'remove_reaction':
          if (selectedMessage) {
            if (selectedMessage.emojis?.filter((emoji) => emoji.userId === sender?.id).length === 0) {
              Alert.alert('Thông báo', 'Bạn chưa tương tác cảm xúc với tin nhắn này!');
              break;
            }
            removeMyEmoji(
              selectedMessage.id || selectedMessage._id || '',
              sender?.id || '',
              selectedMessage.channelId
            );
          }
          break;
        default:
          break;
      }
      setIsPopupVisible(false);
      setSelectedMessage(null);
    },
    [selectedMessage, removeMyEmoji, sender?.id, deleteMessage, recallMessage]
  );

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    setSelectedMessage(null);
  }, []);

  const renderListHeader = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={{ padding: 10, alignItems: 'center' }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={{ marginTop: 5, fontSize: 12, color: '#777' }}>Đang tải tin nhắn cũ...</Text>
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

  const renderEmptyList = useCallback(() => (
    <View>
      <Text>Chưa có tin nhắn nào. Bắt đầu trò chuyện ngay!</Text>
    </View>
  ), []); const renderItem = useCallback(
    ({ item }: { item: Message }) => {
      const isMyMessage = sender?.id === item.sender.id;

      // Safety checks
      if (!item || !item.sender) {
        console.warn('Invalid message item:', item);
        return null;
      }

      return (
        <MessageItem
          content={String(item.content || '')}
          timestamp={String(item.timestamp || '')}
          senderId={String(item.senderId || '')}
          senderAvatar={item.sender?.avatar || 'https://example.com/default-avatar.png'}
          isMyMessage={isMyMessage}
          status={String(item.status || 'sent')}
          emojis={item.emojis}
          messageType={String(item.messageType || 'text')}
          file={item.file}
          imagesGroup={item.imagesGroup}
          onLongPress={() => handleLongPressMessage(item)}
        />
      );
    },
    [sender, handleLongPressMessage]
  );

  const keyExtractor = useCallback(
    (item: Message, index: number) =>
      item.id ? item.id.toString() : item._id ? item._id.toString() : `msg-${index}-${Date.now()}`,
    []
  );

  const quickReactions = [
    { emoji: '❤️', action: 'HEART' },
    { emoji: '👍', action: 'LIKE' },
    { emoji: '😂', action: 'LAUGH' },
    { emoji: '😮', action: 'SURPRISED' },
    { emoji: '😢', action: 'SAD' },
    { emoji: '😡', action: 'ANGRY' },
  ];

  const actions = [
    { label: 'Trả lời', icon: 'reply', action: 'reply', color: '#4a90e2' },
    { label: 'Chuyển tiếp', icon: 'share', action: 'forward', color: '#4a90e2' },
    { label: 'Sao chép', icon: 'content-copy', action: 'copy', color: '#4a90e2' },
    { label: 'Ghim', icon: 'pin', action: 'pin', color: '#f5a623' },
    { label: 'Thu hồi', icon: 'backup-restore', action: 'backup-restore', color: '#ff4d4f' },
    { label: 'Xóa', icon: 'delete', action: 'delete', color: '#ff4d4f' },
    { label: 'Bỏ cảm xúc', icon: 'heart-off', action: 'remove_reaction', color: 'grey' },
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        {channel ? (
          <ChatHeader item={channel} />
        ) : (
          <View style={{ padding: 20, alignItems: 'center', backgroundColor: '#1E88E5' }}>
            <Text style={{ color: 'white', fontSize: 16 }}>Đang tải phòng chat...</Text>
          </View>
        )}

        {loading && messages.length === 0 && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10, color: '#777' }}>Đang tải tin nhắn...</Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages.filter((msg) => msg.isDeletedById !== sender?.id)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={styles.messageList}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyList}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={10}
          removeClippedSubviews={false}
          onRefresh={handleLoadMoreMessages}
          refreshing={loadingMore} onScroll={handleScroll}
          scrollEventThrottle={16}
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        />

        <MessageInputContainer
          channelId={channelId}
          sendMessage={sendMessage}
          onPickFile={handlePickFile}
          onPickMultipleImages={handlePickMultipleImages}
          isUploading={loading}
        />

        <Modal
          visible={isPopupVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePopup}
        >
          <TouchableWithoutFeedback onPress={closePopup}>
            <View style={styles.modalOverlay}>
              <View style={styles.popupContainer}>
                <View style={styles.emojiRow}>
                  {quickReactions.map((reaction, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.emojiButton}
                      onPress={() => handleQuickReact(reaction.emoji)}
                    >
                      <Text style={styles.emojiText}>{reaction.emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <View style={styles.actionRow}>
                  {actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      style={styles.actionButton}
                      onPress={() => handlePopupAction(action.action)}
                    >
                      <MaterialCommunityIcons name={action.icon as any} size={24} color={action.color} />
                      <Text style={[styles.actionText, { color: action.color }]}>{action.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        {openForward && (
          <View style={styles.forwardModalContainer}>
            <ForwardMessage
              selectedMessage={selectedMessage}
              onClose={() => {
                setOpenForward(false);
                setSelectedMessage(null);
              }}
            />
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);