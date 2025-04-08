
// import React from 'react';
// import { View, Text, StyleSheet, Button } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { RootState } from '@/redux/store';
// import useAuth from '@/hooks/useAuth';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { ROUTING } from '@/utils/constant';

// const Login = () => {
//   const navigation = useNavigation<NavigationProp<ParamListBase>>();
//   const { handleLogout } = useAuth();
//   const user = useSelector((state: RootState) => state.user.user);

//   if (!user) {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.error}>Bạn chưa đăng nhập!</Text>
//         <Button
//           title="Đi đến màn hình đăng nhập"
//           onPress={() => navigation.navigate(ROUTING.HOME)}
//         />
//       </View>
//     );
//   }


//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Thông tin người dùng</Text>
//       <Text style={styles.info}>Họ: {user.lastName}</Text>
//       <Text style={styles.info}>Tên: {user.firstName}</Text>
//       <Text style={styles.info}>Email: {user.email}</Text>
//       <Text style={styles.info}>Số điện thoại: {user.phone}</Text>
//       <Text style={styles.info}>Ngày sinh: {new Date(user.dateOfBirth).toLocaleDateString()}</Text>
//       <Text style={styles.info}>Xác thực 2 bước: {user.isTwoFactorAuthenticationEnabled ? 'Bật' : 'Tắt'}</Text>
//       <Text style={styles.info}>Email đã xác minh: {user.isVerifiedMail ? 'Có' : 'Không'}</Text>
//       <Text style={styles.info}>Ngày tạo: {new Date(user.createdAt).toLocaleString()}</Text>
//       <Text style={styles.info}>Cập nhật lần cuối: {new Date(user.updatedAt).toLocaleString()}</Text>
//       <Button title="Đăng xuất" onPress={() => handleLogout()} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#f5f5f5',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   info: {
//     fontSize: 16,
//     marginBottom: 10,
//   },
//   error: {
//     fontSize: 18,
//     color: 'red',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
// });

// export default Login;



import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome, Entypo, Octicons } from '@expo/vector-icons';
import { ROUTING } from '@/utils/constant';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import Profile from './profile';





const App = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const menuItems = [
    { icon: 'icloud' as const, title: 'Cloud của tôi', description: 'Lưu trữ các tin nhắn quan trọng' },
    { icon: 'star-outlined' as const, title: 'ZStyle - Nổi bật trên Zalo', description: 'Hình nền và nhạc cho cuộc gọi Zalo' },
    { icon: 'cycle' as const, title: 'Dữ liệu trên máy', description: 'Quản lý dữ liệu Zalo của bạn' },
    { icon: 'code' as const, title: 'Ví QR', description: 'Lưu trữ và xuất trình các mã QR quan trọng' },
  ];

  const menuItemss = [
    { icon: 'shield' as const, title: 'Tài khoản và bảo mật' },
    { icon: 'lock' as const, title: 'Quyền riêng tư' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Phần thông tin cá nhân */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: 'https://cdnv2.tgdd.vn/mwg-static/common/News/1569295/tho-7-mau-1-2-0.jpg' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={() => navigation.navigate(ROUTING.PROFILE)}>
          <Text style={styles.profileName}>Đào Tạo Hiệu</Text>
          <Text style={styles.profileLink}>Xem thông tin cá nhân</Text>
        </TouchableOpacity>
      </View>

      {/* Danh sách các mục menu */}
      {menuItems.map((item, index) => (
        <TouchableOpacity key={index} style={styles.menuItem}>
          <Entypo style={{ marginRight: 20 }} name={item.icon} size={24} color="#1962DE" />
          {/* <Entypo name="icloud" size={24} color="black" /> */}
          <View style={styles.menuContent}>
            <Text style={styles.menuTitle}>{item.title}</Text>
            {item.description && <Text style={styles.menuDescription}>{item.description}</Text>}
          </View>
          <FontAwesome name="chevron-right" size={16} color="#999" />
        </TouchableOpacity>
      ))}

      <View style={{ marginTop: 10 }} >
        {menuItemss.map((item, index) => (
          <TouchableOpacity key={index} style={styles.menuItem}>
            <Entypo style={{ marginRight: 20 }} name={item.icon} size={24} color="#1962DE" />
            {/* <Entypo name="icloud" size={24} color="black" /> */}
            <View style={styles.menuContent}>
              <Text style={styles.menuTitle}>{item.title}</Text>
            </View>
            <FontAwesome name="chevron-right" size={16} color="#999" />
          </TouchableOpacity>
        ))}
      </View>

      <View style={{ marginTop: 15, alignItems: 'center' }}>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', width: '90%', height: 50, borderRadius: 25, flexDirection: 'row', padding: 13, backgroundColor: '#e0e0e0', borderWidth: 1, borderColor: '#e0e0e0' }}>
          <Text style={{ fontSize: 16, marginRight: 15, fontWeight: 500 }}>Đăng xuất</Text>
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
    color: '#007bff',
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
  icon: {
    marginRight: 15,
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
});

export default App;