// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
// import { AntDesign } from '@expo/vector-icons';
// import styles from './css';
// import RootLayout from '@/layout/RootLayout';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { ROUTING } from '@/utils/constant';
// import { LinearGradient } from 'expo-linear-gradient';
// import theme from '@/theme';

// const Login = () => {



//   return (
//     <RootLayout>
//       <Text>Cá nhân</Text>
//     </RootLayout>
//   );
// };

// export default Login;


import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store'; // Giả sử bạn đã định nghĩa RootState
import { User } from '@/models/user';
import useAuth from '@/hooks/useAuth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

const Login = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { logout } = useAuth();

  // Lấy thông tin user từ Redux state
  const user = useSelector((state: RootState) => state.user.user);

  // Xử lý trường hợp user chưa đăng nhập
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


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông tin người dùng</Text>
      <Text style={styles.info}>Họ: {user.lastName}</Text>
      <Text style={styles.info}>Tên: {user.firstName}</Text>
      <Text style={styles.info}>Email: {user.email}</Text>
      <Text style={styles.info}>Số điện thoại: {user.phone}</Text>
      <Text style={styles.info}>Ngày sinh: {new Date(user.dateOfBirth).toLocaleDateString()}</Text>
      <Text style={styles.info}>Xác thực 2 bước: {user.isTwoFactorAuthenticationEnabled ? 'Bật' : 'Tắt'}</Text>
      <Text style={styles.info}>Email đã xác minh: {user.isVerifiedMail ? 'Có' : 'Không'}</Text>
      <Text style={styles.info}>Ngày tạo: {new Date(user.createdAt).toLocaleString()}</Text>
      <Text style={styles.info}>Cập nhật lần cuối: {new Date(user.updatedAt).toLocaleString()}</Text>
      <Button title="Đăng xuất" onPress={() => logout()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  info: {
    fontSize: 16,
    marginBottom: 10,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default Login;