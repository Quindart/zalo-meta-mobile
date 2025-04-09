import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { FontAwesome, Entypo, Octicons, AntDesign } from '@expo/vector-icons';
import { ROUTING } from '@/utils/constant';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { RootState } from '@/redux/store';
import useAuth from '@/hooks/useAuth';
import { useSelector, useDispatch } from 'react-redux';


const App = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { handleLogout } = useAuth();
  const user = useSelector((state: RootState) => state.user.user);
  const [isSecurityExpanded, setIsSecurityExpanded] = useState(false); // State để kiểm soát mở rộng

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Bạn chưa đăng nhập!</Text>
        <Button
          title="Đi đến màn hình đăng nhập"
          onPress={() => navigation.navigate(ROUTING.HOME)}
        />
      </View>
    );
  }

  const menuItems = [
    { icon: 'icloud' as const, title: 'Cloud của tôi', description: 'Lưu trữ các tin nhắn quan trọng' },
    { icon: 'star-outlined' as const, title: 'ZStyle - Nổi bật trên Zalo', description: 'Hình nền và nhạc cho cuộc gọi Zalo' },
    { icon: 'cycle' as const, title: 'Dữ liệu trên máy', description: 'Quản lý dữ liệu Zalo của bạn' },
    { icon: 'code' as const, title: 'Ví QR', description: 'Lưu trữ và xuất trình các mã QR quan trọng' },
  ];

  const menuItemss = [
    { icon: 'lock' as const, title: 'Quyền riêng tư' },
    {
      icon: 'shield' as const,
      title: 'Tài khoản và bảo mật',
      subItems: [
        { title: 'Đổi mật khẩu', icon: 'lock1' },
        { title: 'Mã QR của tôi', icon: 'qrcode' },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần thông tin cá nhân */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: user.avatar }}
          style={styles.avatar}
        />
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate(ROUTING.PROFILE)}>
          <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
          <Text style={styles.profileLink}>Xem thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách các mục menu */}
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Entypo style={{ marginRight: 20 }} name={item.icon} size={24} color="#00A4E4" />
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            {item.description && <Text style={styles.menuDescription}>{item.description}</Text>}
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 10 }}>
        {menuItemss.map((item, index) => (
          <View key={index}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => item.title === 'Tài khoản và bảo mật' && setIsSecurityExpanded(!isSecurityExpanded)}
            >
              <Entypo style={{ marginRight: 20 }} name={item.icon} size={24} color="#00A4E4" />
              <View style={styles.menuContent}>
                <Text style={styles.menuTitle}>{item.title}</Text>
              </View>
              <FontAwesome
                name={item.title === 'Tài khoản và bảo mật' && isSecurityExpanded ? 'chevron-down' : 'chevron-right'}
                size={16}
                color="#999"
              />
            </TouchableOpacity>

            {/* Hiển thị subItems khi mở rộng */}
            {item.title === 'Tài khoản và bảo mật' && isSecurityExpanded && (
              <View style={styles.subMenu}>
                {item.subItems?.map((subItem, subIndex) => (
                  <TouchableOpacity onPress={() => {
                    if (subItem.title === 'Đổi mật khẩu') {
                      navigation.navigate(ROUTING.CHANGE_PASSWORD);
                    } else if (subItem.title === 'Mã QR của tôi') {
                      navigation.navigate(ROUTING.QR);
                    }
                  }}
                    key={subIndex} style={[styles.subMenuItem, { flexDirection: 'row', }]}>
                    <AntDesign name={subItem.icon as keyof typeof AntDesign.glyphMap} style={{ marginRight: 20 }} size={24} color="#00A4E4" />
                    <Text style={styles.subMenuText}>{subItem.title}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>

      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '90%',
            height: 50,
            borderRadius: 25,
            flexDirection: 'row',
            padding: 13,
            backgroundColor: '#e0e0e0',
            borderWidth: 1,
            borderColor: '#e0e0e0'
          }}
          onPress={() => handleLogout()}
        >
          <Text style={{ fontSize: 16, marginRight: 15, fontWeight: '500' }}>Đăng xuất</Text>
          <Octicons name="sign-out" size={20} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    marginBottom: 10,
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
    marginRight: 15,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  profileLink: {
    fontSize: 14,
    color: '',
    marginTop: 5,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    color: '#333',
  },
  menuDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  subMenu: {
    backgroundColor: '#fff',
    paddingLeft: 30, // Thụt vào để tạo cảm giác phân cấp
    borderWidth: 0
  },
  subMenuItem: {
    paddingVertical: 12,
    // borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subMenuText: {
    fontSize: 15,
    color: '#333',
  },
});

export default App;