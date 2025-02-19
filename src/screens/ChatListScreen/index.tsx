import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import { AntDesign, Ionicons, FontAwesome } from '@expo/vector-icons';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import ChatScreen from '../ChatScreen';

const ChatListScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {

  const chatData = [
    {
      id: '1',
      type: 'group',
      name: 'Nhóm 9 CNPM',
      avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
      lastMessage: 'Nguyễn Tấn Minh: với mấy lượng đồ tôi thêm...',
      time: '16 giờ',
    },
    {
      id: '2',
      type: 'group',
      name: 'Nhóm 9 CNPM',
      avatar: 'https://haycafe.vn/wp-content/uploads/2021/11/Anh-avatar-dep-chat-lam-hinh-dai-dien.jpg',
      lastMessage: 'Nguyễn Tấn Minh: với mấy lượng đồ tôi thêm...',
      time: '16 giờ',
    },
  ];

  const renderChatItem = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate(ROUTING.CHAT_SCREEN, { item })}
      >
        <View style={styles.avatarContainer}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
        </View>

        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>{item.name}</Text>
            <Text style={styles.chatTime}>{item.time}</Text>
          </View>

          <View style={styles.chatPreview}>
            {item.isCallLog && <Ionicons name="call" size={14} color="gray" style={styles.messageIcon} />}
            <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
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
  };

  return (

    <FlatList
      data={chatData}
      renderItem={renderChatItem}
      keyExtractor={item => item.id}
      style={styles.chatList}
    />

  );
};

export default ChatListScreen;
