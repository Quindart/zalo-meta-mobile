import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { AntDesign, Feather, FontAwesome5, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { useFriend } from '@/hooks/useFriend';
import { User } from '@/models/user';
import useUser from '@/hooks/useUser';


const ContactsScreen = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { handleSearchUserByPhone } = useUser();
  const [activeTab, setActiveTab] = useState('Bạn bè');

  const user: User | null = useSelector((state: any) => state.user.user);
  const { getListFriends, listFriends } = useFriend(user?.id || '');


  const handleGetFriends = async (phone: string) => {
    const data = await handleSearchUserByPhone(phone);
    // lấy ra phần từ đầu tiên trong mảng
    const item = data[0];
    console.log('Kết quả tìm kiếm:', data);
    navigation.navigate(ROUTING.PROFILE_FRIEND_SCREEN, { itemFriend: item })
  }

  useEffect(() => {
    if (user?.id) {
      getListFriends();
    }
  }, [user]);

  if (!user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Đang tải người dùng...</Text>
      </View>
    );
  }



  const renderItemContact = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity onPress={() => handleGetFriends(item.phone)} >
        <View style={styles.contactItem}>
          <Image source={{ uri: item.avatar }} style={styles.avatar} />
          <View style={styles.contactInfo}>
            <Text style={styles.name}>{item.name}</Text>
          </View>
          <Text style={styles.date}>{item.date}</Text>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.actionButton}>
              <Feather name="phone" size={20} color="black" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton}>
              <AntDesign name="videocamera" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      {/* Tabs */}
      <View style={styles.tabs}>
        {['Bạn bè', 'Nhóm', 'OA'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === tab && styles.tabActive]}
            onPress={() => setActiveTab(tab)} // Thêm onPress để chuyển tab
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.specialItem} onPress={() => navigation.navigate(ROUTING.FRIEND_REQUEST_SCREEN)}>
        <View style={styles.specialIconContainer}>
          <FontAwesome5 style={styles.specialIcon} name="user-friends" />
        </View>
        <View style={styles.specialInfo}>
          <Text style={styles.specialName}>Lời mời kết bạn</Text>
        </View>
      </TouchableOpacity>
      <View style={styles.specialItem}>
        <View style={styles.specialIconContainer}>
          <AntDesign style={styles.specialIcon} name="contacts" />
        </View>
        <View style={styles.specialInfo}>
          <Text style={styles.specialName}>Danh bạ máy</Text>
        </View>
      </View>
      <View style={styles.specialItem}>
        <View style={styles.specialIconContainer}>
          <FontAwesome style={styles.specialIcon} name="birthday-cake" size={24} color="black" />
        </View>
        <View style={styles.specialInfo}>
          <Text style={styles.specialName}>Sinh nhật</Text>
        </View>
      </View>

      {/* FlatList cho contacts */}
      <View style={[styles.specialItem, { marginTop: 15, height: 50, }]}>
        <View style={{ paddingVertical: 6, paddingHorizontal: 15, backgroundColor: '#F0F0F0', borderRadius: 20, }}>
          <Text>Tất cả</Text>
        </View>
      </View>
      <FlatList
        data={listFriends}
        renderItem={renderItemContact}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 3,
    borderBottomColor: '#007bff',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  tabTextActive: {
    color: '#007bff',
    fontWeight: 'bold',
  },
  flatListContent: {
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  avatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#000',
  },
  date: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    padding: 8,
  },
  specialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: '#fff',
  },
  specialIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  specialIcon: {
    fontSize: 18,
    color: '#fff',
  },
  specialInfo: {
    flex: 1,
  },
  specialName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  specialDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
});

export default ContactsScreen;