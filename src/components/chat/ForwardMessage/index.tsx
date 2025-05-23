import React, { useState } from "react";
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
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { styles } from "./style";
import { conversationGroups, recentContacts } from "./constant";

const ForwardMessage = () => {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
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
              uri: "https://cdnv2.tgdd.vn/mwg-static/common/News/1569295/tho-7-mau-1-2-0.jpg",
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
        {selected.includes(item.id) && <View style={styles.innerCheck} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Chia sẻ</Text>
          <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
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

      <ScrollView>
        {/* Recent contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gần đây</Text>
          <FlatList
            data={recentContacts}
            renderItem={renderContact}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
          />
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
    </SafeAreaView>
  );
};

export default ForwardMessage;
