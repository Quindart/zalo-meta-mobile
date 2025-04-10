import React, { useState, useEffect } from 'react';
import { FlatList, TouchableOpacity, Image, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './css';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { useChat } from '@/hooks/useChat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const ChatListScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {

  // const [chatData, setChatData] = useState([]);
  // const { getChatListService } = useChat();
  // const chatFromRedux = useSelector((state: RootState) => state.chat.chats);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await getChatListService();
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (chatFromRedux) {
  //     setChatData(chatFromRedux);
  //   }
  // }, [chatFromRedux]);

  // const renderChatItem = ({ item }: { item: any }) => (
  //   <TouchableOpacity
  //     style={styles.chatItem}
  //     onPress={() => navigation.navigate(ROUTING.CHAT_SCREEN, { item })}
  //   >
  //     <View style={styles.avatarContainer}>
  //       <Image
  //         source={{
  //           uri: item.secondUser?.avatar || 'https://via.placeholder.com/150'
  //         }}
  //         style={styles.avatar}
  //       />
  //     </View>
  //     <View style={styles.chatInfo}>
  //       <View style={styles.chatHeader}>
  //         <Text style={styles.chatName} numberOfLines={1}>
  //           {item.secondUser ? `${item.secondUser.firstName} ${item.secondUser.lastName}` : 'Unknown User'}
  //         </Text>
  //         <Text style={styles.chatTime}>
  //           {(() => {
  //             const now = new Date();
  //             const msgDate = new Date(item.lastMessageTime);
  //             const diffMs = now.getTime() - msgDate.getTime();
  //             const diffMins = Math.floor(diffMs / 60000);
  //             const diffHrs = Math.floor(diffMins / 60);
  //             const diffDays = Math.floor(diffHrs / 24);

  //             if (diffMins < 1) return 'mới đây';
  //             if (diffMins < 60) return `${diffMins} phút`;
  //             if (diffHrs < 24) return `${diffHrs} giờ`;
  //             if (diffDays < 7) return `${diffDays} ngày`;

  //             return msgDate.toLocaleDateString();
  //           })()}
  //         </Text>
  //       </View>
  //       <View style={styles.chatPreview}>
  //         {item.isCallLog && <Ionicons name="call" size={14} color="gray" style={styles.messageIcon} />}
  //         <Text style={styles.chatMessage} numberOfLines={1}>{item.lastMessage}</Text>
  //         {item.hasNotification && <View style={styles.notificationDot} />}
  //         {item.userCount && (
  //           <View style={styles.userCountContainer}>
  //             <Text style={styles.userCountText}>{item.userCount}</Text>
  //           </View>
  //         )}
  //       </View>
  //     </View>
  //   </TouchableOpacity>
  // );
  // return (
  //   <FlatList
  //     data={chatData}
  //     renderItem={renderChatItem}
  //     keyExtractor={item => item._id}
  //     style={styles.chatList}
  //   />
  // );
  return (
    <View style={styles.container}>
      <Text>Xin chao</Text>
    </View>
  )
};

export default ChatListScreen;