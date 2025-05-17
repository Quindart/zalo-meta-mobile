import React, {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
} from "react";
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
  Modal,
  TouchableWithoutFeedback,
  Clipboard,
  ScrollView,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { chatScreenStyle, popupStyle } from "./style";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import theme from "@/theme";
import { RootStackParamList } from "@/navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTING } from "@/utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useChat } from "@/hooks/useChat";
import { debounce } from "lodash";
import { useDispatch } from "react-redux";
import { setCurrentChannel } from "@/redux/userSlice";

import FileMessageBubble from "@/screens/ChatScreen/FileMessageBubble";
import * as DocumentPicker from "expo-document-picker"; // thư viện để chọn file

type ChatScreenRouteProp = RouteProp<
  RootStackParamList,
  typeof ROUTING.CHAT_SCREEN
>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

interface Emoji {
  emoji: string;
  userId: string;
  messageId: string;
  quantity: number;
  createAt: string;
  updateAt: string;
  deleteAt?: string;
}

interface Message {
  id?: string;
  _id?: string;
  channelId: string;
  senderId: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  emojis?: Emoji[];
  messageType?: "text" | "file";
  file?: {
    filename: string;
    path: string;
    extension: string;
    size?: string | number;
  };
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
}

const ChatHeader = React.memo(({ item }: { item: any }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentUserId = useSelector((state: RootState) => state.user.user?.id);

  const handleOptionsPress = useCallback(() => {
    if (item?.type === "group") {
      navigation.navigate(ROUTING.OPTION_GROUP, { itemGroup: item });
    } else if (item?.type === "direct") {
      const friend = item.members?.find(
        (mem: any) => mem.userId !== currentUserId
      );
      if (friend && friend.user) {
        navigation.navigate(ROUTING.OPTION_FRIEND, { itemFriend: friend.user });
      } else {
        alert("Không tìm thấy thông tin bạn bè");
      }
    }
  }, [item, currentUserId]);

  return (
    <LinearGradient
      colors={["#1E88E5", "#42A5F5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={chatScreenStyle.header}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={chatScreenStyle.iconButton}
      >
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <Text style={chatScreenStyle.headerTitle}>{item.name || "Chat"}</Text>
      <View style={chatScreenStyle.headerIcons}>
        <TouchableOpacity style={chatScreenStyle.iconButton}>
          <Ionicons name="call-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={chatScreenStyle.iconButton}>
          <Ionicons name="videocam-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={chatScreenStyle.iconButton}
          onPress={handleOptionsPress}
        >
          <AntDesign name="bars" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
});

export default ChatHeader;

// MessageItem component
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
  }: {
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
  }) => {
    const me = useSelector((state: RootState) => state.user.user);
    const [isEmojiModalVisible, setEmojiModalVisible] = useState(false);

    const renderEmojis = useMemo(() => {
      if (!emojis || emojis.length === 0) return null;
      const maxDisplay = 4;
      const displayEmojis =
        emojis.length > maxDisplay ? emojis.slice(0, 3) : emojis;
      const remainingCount = emojis.length > maxDisplay ? emojis.length - 3 : 0;

      return (
        <View
          style={[
            chatScreenStyle.emojiWrapper,
            isMyMessage ? chatScreenStyle.emojiWrapperRight : chatScreenStyle.emojiWrapperLeft,
          ]}
        >
          {displayEmojis.map((emoji, index) => (
            <View key={index} style={chatScreenStyle.emojiItem}>
              <Text style={chatScreenStyle.emojiTextIcon}>{emoji.emoji}</Text>
            </View>
          ))}
          {remainingCount > 0 && (
            <View style={chatScreenStyle.remainingCount}>
              <Text style={chatScreenStyle.remainingText}>+{remainingCount}</Text>
            </View>
          )}
        </View>
      );
    }, [emojis, isMyMessage]);

    const emojiSummary = useMemo(() => {
      if (!emojis) return [];
      const emojiCountMap: { [key: string]: { emoji: string; count: number } } =
        {};
      emojis.forEach((emoji) => {
        if (!emojiCountMap[emoji.emoji]) {
          emojiCountMap[emoji.emoji] = { emoji: emoji.emoji, count: 0 };
        }
        emojiCountMap[emoji.emoji].count += emoji.quantity;
      });
      return Object.values(emojiCountMap);
    }, [emojis]);

    const renderEmojiCount = ({
      item,
    }: {
      item: { emoji: string; count: number };
    }) => (
      <View style={popupStyle.emojiRow}>
        <Text style={popupStyle.emoji}>{item.emoji}</Text>
        <Text style={popupStyle.emojiCount}>{item.count}</Text>
      </View>
    );

    return (
      <View style={chatScreenStyle.messageWrapper}>
        <TouchableOpacity
          activeOpacity={0.8}
          onLongPress={onLongPress}
          style={[
            chatScreenStyle.messageRow,
            isMyMessage ? chatScreenStyle.myMessageRow : chatScreenStyle.otherMessageRow,
          ]}
        >
          {!isMyMessage && (
            <Image
              source={{ uri: senderAvatar }}
              style={chatScreenStyle.messageAvatar}
              defaultSource={require("../../../assets/user_default.jpg")}
            />
          )}

          <View
            style={[
              chatScreenStyle.messageBubble,
              isMyMessage ? chatScreenStyle.myMessageBubble : chatScreenStyle.otherMessageBubble,
            ]}
          >
            {/* ✅ Render content hoặc file */}
            {(messageType === "file" || messageType === "image") && file ? (
              <FileMessageBubble file={file} />
            ) : (
              <Text style={chatScreenStyle.messageText}>{content}</Text>
            )}

            <Text style={chatScreenStyle.messageTime}>
              {timestamp ? new Date(timestamp).toLocaleTimeString() : ""}{" "}
              {isMyMessage && (
                <>
                  {status === "sent" && "✓"}
                  {status === "delivered" && "✓✓"}
                  {status === "read" && "✓✓ (Đã đọc)"}
                </>
              )}
            </Text>
          </View>
        </TouchableOpacity>

        {/* ✅ Render emoji reaction */}
        {renderEmojis && (
          <TouchableOpacity
            onPress={() => setEmojiModalVisible(true)}
            style={
              isMyMessage ? chatScreenStyle.myEmojiContainer : chatScreenStyle.otherEmojiContainer
            }
          >
            {renderEmojis}
          </TouchableOpacity>
        )}

        <Modal
          visible={isEmojiModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setEmojiModalVisible(false)}
        >
          <TouchableOpacity
            style={popupStyle.modalOverlay}
            onPress={() => setEmojiModalVisible(false)}
            activeOpacity={1}
          >
            <View style={popupStyle.modalContent}>
              <Text style={popupStyle.modalTitle}>
                Tất cả {emojiSummary.length}
              </Text>
              <FlatList
                data={emojiSummary}
                renderItem={renderEmojiCount}
                keyExtractor={(item) => item.emoji}
                style={popupStyle.emojiList}
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  },
  (prevProps, nextProps) =>
    prevProps.content === nextProps.content &&
    prevProps.timestamp === nextProps.timestamp &&
    prevProps.senderId === nextProps.senderId &&
    prevProps.senderAvatar === nextProps.senderAvatar &&
    prevProps.isMyMessage === nextProps.isMyMessage &&
    prevProps.status === nextProps.status &&
    prevProps.onLongPress === nextProps.onLongPress &&
    prevProps.messageType === nextProps.messageType &&
    JSON.stringify(prevProps.file) === JSON.stringify(nextProps.file) &&
    JSON.stringify(prevProps.emojis) === JSON.stringify(nextProps.emojis)
);

const MessageInputContainer = React.memo(
  ({
    channelId,
    sendMessage,
    onPickFile,
  }: {
    channelId: string;
    sendMessage: (chanId: string, content: string) => void;
    onPickFile: () => void;
  }) => {
    const [inputMessage, setInputMessage] = useState("");

    const handleSendMessage = useCallback(() => {
      if (inputMessage.trim()) {
        sendMessage(channelId, inputMessage);
        setInputMessage("");
      }
    }, [inputMessage, channelId, sendMessage]);

    return (
      <View style={chatScreenStyle.inputContainer}>
        <TouchableOpacity style={chatScreenStyle.attachmentButton} onPress={onPickFile}>
          <Ionicons name="attach" size={22} color="#555" />
        </TouchableOpacity>
        <TextInput
          style={chatScreenStyle.input}
          placeholder="Tin nhắn"
          value={inputMessage}
          onChangeText={(e) => setInputMessage(e)}
          multiline
          returnKeyType="send"
          onSubmitEditing={handleSendMessage}
        />
        <TouchableOpacity
          style={[
            chatScreenStyle.sendButton,
            inputMessage.trim() ? chatScreenStyle.sendButtonActive : null,
          ]}
          onPress={handleSendMessage}
          disabled={!inputMessage.trim()}
        >
          <Ionicons name="send" size={22} color="white" />
        </TouchableOpacity>
      </View>
    );
  }
);

// ChatScreen component
const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const renderCountRef = useRef(0);
  renderCountRef.current += 1;
  console.log(`ChatScreen render #${renderCountRef.current}`);

  const { item } = route.params || { item: {} };
  const navigation = useNavigation<ChatScreenNavigationProp>();
  const sender = useSelector((state: RootState) => state.user.user);
  const channelId = item?.id || "";

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
  } = useChat(`${sender?.id}`);

  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreMessages, setHasMoreMessages] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const previousMessagesLength = useRef(0);
  const flatListRef = useRef<FlatList>(null);
  const initialRenderRef = useRef(true);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  useEffect(() => {
    if (error) {
      Alert.alert("Lỗi", error);
    }
  }, [error]);

  useEffect(() => {
    if (channelId && sender?.id) {
      setHasMoreMessages(true);
      joinRoom(channelId);
    } else {
      Alert.alert("Lỗi", "Không thể tham gia phòng chat do thiếu thông tin");
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
        } catch (err) {}
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
        } catch (err) {}
      }, 300);
    }
  }, [messages.length, loadingMore, isAtBottom]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (channel && channel.id) {
      console.log("Cập nhật currentChannel:", channel);
      dispatch(setCurrentChannel(channel));
    }
  }, [channel, dispatch]);

  const handlePickFile = async () => {
    const result = await DocumentPicker.getDocumentAsync({ type: "*/*" });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const asset = result.assets[0];
      const name = asset.name;
      const uri = asset.uri;
      const size = asset.size || 0;

      const extension = name.split(".").pop() || "";
      const filename = name.replace(`.${extension}`, "");

      const fileData = {
        filename,
        path: uri,
        extension,
        size,
      };

      sendFileMessage(channelId, fileData);
    }
  };

  const handleLoadMoreMessages = useCallback(
    debounce(() => {
      if (
        loading ||
        loadingMore ||
        !hasMoreMessages ||
        !channelId ||
        noMessageToLoad
      ) {
        console.log("Skipping loadMessages in chat room:", {
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
    [
      channelId,
      loading,
      loadingMore,
      hasMoreMessages,
      loadMessages,
      noMessageToLoad,
    ]
  );

  const handleScroll = useCallback((event: any) => {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isBottom =
      contentOffset.y >= contentSize.height - layoutMeasurement.height - 50;
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
        selectedMessage.id || selectedMessage._id || "",
        emoji,
        sender?.id || "",
        selectedMessage.channelId
      );
      setIsPopupVisible(false);
      setSelectedMessage(null);
    },
    [selectedMessage, interactEmoji, sender?.id]
  );
  const handleRecallMessage = useCallback(() => {
    if (!selectedMessage) return;
    if (selectedMessage.sender.id !== sender?.id) {
      Alert.alert(
        "Thông báo",
        "Bạn không thể thu hồi tin nhắn của người khác!"
      );
      return;
    }
    deleteMessage(
      selectedMessage.id || selectedMessage._id || "",
      selectedMessage.channelId
    );
  }, [selectedMessage]);
  const handleDeleteMessage = useCallback(() => {
    if (!selectedMessage) return;
    recallMessage(selectedMessage.id || selectedMessage._id || "");
  }, [selectedMessage]);
  const handlePopupAction = useCallback(
    (action: string) => {
      if (!selectedMessage) return;

      switch (action) {
        case "reply":
          Alert.alert(
            "Thông báo",
            "Chức năng trả lời tin nhắn chưa được triển khai."
          );
          break;
        case "forward":
          Alert.alert(
            "Thông báo",
            "Chức năng chuyển tiếp tin nhắn chưa được triển khai."
          );
          break;
        case "backup-restore":
          if (selectedMessage.sender.id !== sender?.id) {
            Alert.alert(
              "Thông báo",
              "Chức năng thu hồi tin nhắn không giành cho người nhận."
            );
            break;
          }
          deleteMessage(
            selectedMessage.id || selectedMessage._id || "",
            selectedMessage.channelId
          );
          break;
        case "copy":
          if (selectedMessage) {
            Clipboard.setString(selectedMessage.content);
            Alert.alert("Thông báo", "Đã sao chép tin nhắn!");
          }
          break;
        case "delete":
          recallMessage(selectedMessage.id || selectedMessage._id || "");
          break;
        case "remove_reaction":
          if (selectedMessage) {
            removeMyEmoji(
              selectedMessage.id || selectedMessage._id || "",
              sender?.id || "",
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
    [selectedMessage, removeMyEmoji, sender?.id]
  );

  const closePopup = useCallback(() => {
    setIsPopupVisible(false);
    setSelectedMessage(null);
  }, []);

  const renderListHeader = useCallback(() => {
    if (loadingMore) {
      return (
        <View style={{ padding: 10, alignItems: "center" }}>
          <ActivityIndicator size="small" color={theme.colors.primary} />
          <Text style={{ marginTop: 5, fontSize: 12, color: "#777" }}>
            Đang tải tin nhắn cũ...
          </Text>
        </View>
      );
    }
    if (!hasMoreMessages && messages.length > 0) {
      return (
        <View style={{ padding: 10, alignItems: "center" }}>
          <Text style={{ fontSize: 12, color: "#777" }}>
            Đã hiển thị tất cả tin nhắn
          </Text>
        </View>
      );
    }
    return messages.length > 0 ? (
      <View style={{ padding: 10, alignItems: "center" }}>
        <Text style={{ fontSize: 12, color: "#777" }}>
          Kéo xuống để tải thêm tin nhắn cũ
        </Text>
      </View>
    ) : null;
  }, [loadingMore, hasMoreMessages, messages.length]);

  const renderEmptyList = useCallback(
    () => (
      <View>
        <Text>Chưa có tin nhắn nào. Bắt đầu trò chuyện ngay!</Text>
      </View>
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: Message }) => {
      const isMyMessage = sender?.id === item.sender.id;
      return (
        <MessageItem
          content={item.content || ""}
          timestamp={item.timestamp || ""}
          senderId={item.senderId || ""}
          senderAvatar={
            item.sender?.avatar || "https://example.com/default-avatar.png"
          }
          isMyMessage={isMyMessage}
          status={item.status || "sent"}
          emojis={item.emojis}
          messageType={item.messageType} // 🆕
          file={item.file} // 🆕
          onLongPress={() => handleLongPressMessage(item)}
        />
      );
    },
    [sender, handleLongPressMessage]
  );

  const keyExtractor = useCallback(
    (item: Message, index: number) =>
      item.id
        ? item.id.toString()
        : item._id
        ? item._id.toString()
        : `msg-${index}-${Date.now()}`,
    []
  );

  const quickReactions = [
    { emoji: "❤️", action: "HEART" },
    { emoji: "👍", action: "LIKE" },
    { emoji: "😂", action: "LAUGH" },
    { emoji: "😮", action: "SURPRISED" },
    { emoji: "😢", action: "SAD" },
    { emoji: "😡", action: "ANGRY" },
  ];

  const actions = [
    { label: "Trả lời", icon: "reply", action: "reply", color: "#4a90e2" },
    {
      label: "Chuyển tiếp",
      icon: "share",
      action: "forward",
      color: "#4a90e2",
    },
    {
      label: "Sao chép",
      icon: "content-copy",
      action: "copy",
      color: "#4a90e2",
    },
    { label: "Ghim", icon: "pin", action: "pin", color: "#f5a623" },
    {
      label: "Thu hồi",
      icon: "backup-restore",
      action: "backup-restore",
      color: "#ff4d4f",
    },
    { label: "Xóa", icon: "delete", action: "delete", color: "#ff4d4f" },
    {
      label: "Bỏ cảm xúc",
      icon: "heart-off",
      action: "remove_reaction",
      color: "grey",
    },
  ];

  return (
    <SafeAreaView style={chatScreenStyle.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={chatScreenStyle.container}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {channel ? (
          <ChatHeader item={channel} />
        ) : (
          <View
            style={{
              padding: 20,
              alignItems: "center",
              backgroundColor: "#1E88E5",
            }}
          >
            <Text style={{ color: "white", fontSize: 16 }}>
              Đang tải phòng chat...
            </Text>
          </View>
        )}

        {loading && messages.length === 0 && (
          <View style={chatScreenStyle.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={{ marginTop: 10, color: "#777" }}>
              Đang tải tin nhắn...
            </Text>
          </View>
        )}

        <FlatList
          ref={flatListRef}
          data={messages.filter((msg) => msg.isDeletedById !== sender?.id)}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          style={chatScreenStyle.messageList}
          ListHeaderComponent={renderListHeader}
          ListEmptyComponent={renderEmptyList}
          initialNumToRender={15}
          maxToRenderPerBatch={15}
          windowSize={10}
          removeClippedSubviews={false}
          onRefresh={handleLoadMoreMessages}
          refreshing={loadingMore}
          onScroll={handleScroll}
          scrollEventThrottle={16}
          maintainVisibleContentPosition={{ minIndexForVisible: 0 }}
        />

        <MessageInputContainer
          channelId={channelId}
          sendMessage={sendMessage}
          onPickFile={handlePickFile} // ✅ truyền vào đây
        />

        <Modal
          visible={isPopupVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={closePopup}
        >
          <TouchableWithoutFeedback onPress={closePopup}>
            <View style={chatScreenStyle.modalOverlay}>
              <View style={chatScreenStyle.popupContainer}>
                {/* Hàng emoji phản hồi nhanh */}
                <View style={chatScreenStyle.emojiRow}>
                  {quickReactions.map((reaction, index) => (
                    <TouchableOpacity
                      key={index}
                      style={chatScreenStyle.emojiButton}
                      onPress={() => handleQuickReact(reaction.emoji)}
                    >
                      <Text style={chatScreenStyle.emojiText}>{reaction.emoji}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                {/* Hàng các hành động */}
                <View style={chatScreenStyle.actionRow}>
                  {actions.map((action, index) => (
                    <TouchableOpacity
                      key={index}
                      style={chatScreenStyle.actionButton}
                      onPress={() => handlePopupAction(action.action)}
                    >
                      <MaterialCommunityIcons
                        name={action.icon}
                        size={24}
                        color={action.color}
                      />
                      <Text
                        style={[chatScreenStyle.actionText, { color: action.color }]}
                      >
                        {action.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);
