import React, { useEffect, useCallback, memo } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Platform
} from 'react-native';
import styles from './css';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useChat } from '@/hooks/useChat';
import { registerFCMToken } from '@/services/auth.service'
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { useDispatch } from 'react-redux';
import { setFcmToken } from '@/redux/userSlice';
interface Chat {
  id: string;
  avatar?: string;
  name?: string;
  message?: string;
  time?: string;
  type?: string;
  members?: any[];
}

const ChatItem = memo(
  ({ item, navigation }: { item: Chat; navigation: NavigationProp<ParamListBase> }) => {
    const getTimeDisplay = useCallback((time?: string) => {
      if (!time) return 'mới đây';
      const now = new Date();
      const msgDate = new Date(time);
      const diffMs = now.getTime() - msgDate.getTime();
      const diffMins = Math.floor(diffMs / 60000);
      const diffHrs = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHrs / 24);

      if (diffMins < 1) return 'mới đây';
      if (diffMins < 60) return `${diffMins} phút`;
      if (diffHrs < 24) return `${diffHrs} giờ`;
      if (diffDays < 7) return `${diffDays} ngày`;
      return msgDate.toLocaleDateString();
    }, []);
    console.log("Check item: ", item);
    return (
      <TouchableOpacity
        style={styles.chatItem}
        onPress={() => navigation.navigate(ROUTING.CHAT_SCREEN, { item })}
      >
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: item.avatar || 'https://via.placeholder.com/150',
            }}
            style={styles.avatar}
          />
        </View>
        <View style={styles.chatInfo}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatName} numberOfLines={1}>
              {item.name || 'Unknown User'}
            </Text>
            <Text style={styles.chatTime}>{getTimeDisplay(item.time)}</Text>
          </View>
          <View style={styles.chatPreview}>
            <Text style={styles.chatMessage} numberOfLines={1}>
              {item.message || 'No messages'}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
  (prevProps, nextProps) =>
    prevProps.item.id === nextProps.item.id &&
    prevProps.item.message === nextProps.item.message &&
    prevProps.item.time === nextProps.item.time,
);

const ListChannelScreen = ({ navigation }: { navigation: NavigationProp<ParamListBase> }) => {
  const currentUserId = useSelector((state: RootState) => state.user.user?.id || '');
  const dispatch = useDispatch();
  const getPushToken = async () => {
    try {
      // // Kiểm tra xem thiết bị có hỗ trợ thông báo không
      // if (!Constants.isDevice) {
      //   console.log('Thông báo đẩy yêu cầu thiết bị vật lý (không hoạt động trên máy ảo)');
      //   return null;
      // }

      // Yêu cầu quyền thông báo
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync({
          ios: {
            allowAlert: true,
            allowBadge: true,
            allowSound: true,
            allowDisplayInCarPlay: false,
            allowCriticalAlerts: false,
            provideAppNotificationSettings: false,
            allowProvisional: false,
          },
        });
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Không nhận được quyền thông báo đẩy!');
        return null;
      }

      // Tạo notification channel cho Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }

      const { data: expoPushToken } = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId, // Uncommented projectId line
      });

      console.log('Expo Push Token:', expoPushToken);
      return expoPushToken;
    } catch (error) {
      console.error('Error getting Expo Push Token:', error);
      return null;
    }
  };
  const handleRegisterFCMToken = async () => {
    try {
      const fcmToken = await getPushToken();
      if (fcmToken) {
        const response = await registerFCMToken(fcmToken, currentUserId);
        dispatch(setFcmToken(response.data));
        console.log('FCM Token registered successfully:', response.data);
      } else {
        console.warn('Failed to get FCM token');
      }
    } catch (error) {
      console.error('Error registering FCM Token:', error);
    }
  }
  const { loadChannel, listChannel, error } = useChat(currentUserId);

  // Xử lý lỗi từ useChat
  useEffect(() => {
    if (error) {
      Alert.alert('Lỗi', error);
    }
    handleRegisterFCMToken();
  }, [error]);

  // Tải danh sách channel khi màn hình được focus
  useFocusEffect(
    useCallback(() => {
      if (currentUserId) {
        console.log('Screen focused, calling loadChannel with userId:', currentUserId);
        loadChannel(currentUserId);
      } else {
        console.warn('Missing currentUserId');
        Alert.alert('Lỗi', 'Không thể tải danh sách phòng chat do thiếu thông tin người dùng');
      }
    }, [currentUserId, loadChannel]),
  );

  // Ghi log để debug listChannel
  useEffect(() => {
    console.log('listChannel updated:', listChannel);
  }, [listChannel]);

  // Lọc các item hợp lệ trong listChannel
  const validChannels = useCallback(() => {
    return listChannel.filter(item => item && item.id && typeof item === 'object');
  }, [listChannel]);

  const renderChatItem = useCallback(
    ({ item }: { item: Chat }) => <ChatItem item={item} navigation={navigation} />,
    [navigation],
  );

  const keyExtractor = useCallback((item: Chat) => item.id.toString(), []);

  return (
    <View style={styles.container}>
      <FlatList
        data={validChannels()}
        renderItem={renderChatItem}
        keyExtractor={keyExtractor}
        style={styles.chatList}
      />
    </View>
  );
};

export default ListChannelScreen;