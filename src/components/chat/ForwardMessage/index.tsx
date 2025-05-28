import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
  Alert,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { styles } from "./style";
import { conversationGroups, recentContacts } from "./constant";
import { useChat } from "@/hooks/useChat";
import { useSelector } from "react-redux";
import { Message } from "@/screens/ChatScreen";
const ForwardMessage = ({ onClose, selectedMessage }: { onClose: () => void; selectedMessage: Message | null; }) => {
  const [selectedChannelIds, setSelectedChannelIds] = useState<string[]>([]);
  const user = useSelector((state: any) => state.user.user);
  const { listChannel, loadChannel, forwardMessageService, } = useChat(user.id);
  useEffect(() => {
    if (user?.id) {
      loadChannel(user.id);
    }
  }, [user?.id, loadChannel]);

  const toggleSelect = (id: string) => {
    setSelectedChannelIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }; const handleForward = () => {
    if (selectedChannelIds.length > 0 && selectedMessage) {
      forwardMessageService(selectedMessage?.id || '', selectedChannelIds, user.id);
      onClose();
    } else {
      Alert.alert(
        "Không thể chia sẻ tin nhắn",
        "Vui lòng chọn ít nhất một cuộc trò chuyện và đảm bảo có tin nhắn được chọn để chia sẻ.",
        [{ text: "OK" }]
      );
    }
  };
  const renderContact = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => toggleSelect(item.id)}
    >
      <View style={styles.contactInfo}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: item.avatar,
            }}
            style={styles.avatar}
          />
          {item.verified && (
            <View style={styles.verifiedBadge}>
              <FontAwesome name="check" size={10} color="#fff" />
            </View>
          )}
          {item.memberCount && (
            <View style={styles.memberCountBadge}>
              <Text style={styles.memberCountText}>{item.memberCount}</Text>
            </View>
          )}
        </View>
        <Text style={styles.contactName}>{item.name}</Text>
      </View>
      <View style={styles.checkCircle}>
        {selectedChannelIds.includes(item.id) && <View style={styles.innerCheck} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons onPress={onClose} name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chia sẻ</Text>
          <Text style={styles.subtitle}>Đã chọn: {selectedChannelIds.length}</Text>
        </View>
      </View>

      {/* Search bar */}
      <View style={{ backgroundColor: "#fff", height: 70, marginBottom: 8 }}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#999"
          />
        </View>
      </View>

      {/* Quick actions */}
      <View style={styles.quickActions}>
        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Ionicons name="people" size={24} color="#333" />
            <View style={styles.addBadge}>
              <Text style={styles.addText}>+</Text>
            </View>
          </View>
          <Text style={styles.actionText}>Nhóm mới</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Ionicons name="time-outline" size={24} color="#333" />
          </View>
          <Text style={styles.actionText}>Nhật ký</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.actionItem}>
          <View style={styles.actionIcon}>
            <Ionicons name="share-outline" size={24} color="#333" />
          </View>
          <Text style={styles.actionText}>App khác</Text>
        </TouchableOpacity>
      </View>

      <ScrollView>        {/* Recent contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          {listChannel && listChannel.length > 0 ? (
            <FlatList
              data={listChannel}
              renderItem={renderContact}
              keyExtractor={(item) => item.id}
              scrollEnabled={false}
            />
          ) : (
            <View style={{ padding: 16, alignItems: 'center' }}>
              <Text style={{ color: '#666', fontSize: 14 }}>
                {user?.id ? 'Đang tải danh sách cuộc trò chuyện...' : 'Chưa có cuộc trò chuyện nào'}
              </Text>
            </View>
          )}
        </View>

        {/* Conversation groups */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Nhóm trò chuyện</Text>
          <FlatList
            data={conversationGroups}
            renderItem={renderContact}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
      <View style={styles.bottomContainer}>
        <View style={styles.messagePreviewContainer}>
          <Text style={styles.contentMessage}>
            {selectedMessage ? selectedMessage.content : "Không có tin nhắn nào được chọn."}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 16 }}>
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelButtonText}>Hủy</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleForward}
            style={[styles.forwardButton, selectedChannelIds.length === 0 && styles.forwardButtonDisabled]}
            disabled={selectedChannelIds.length === 0}
          >
            <Text style={[styles.forwardButtonText, selectedChannelIds.length === 0 && styles.forwardButtonTextDisabled]}>
              Chia sẻ
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForwardMessage;
