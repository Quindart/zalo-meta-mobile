
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import useAuth from '@/hooks/useAuth';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

const Login = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { handleLogout } = useAuth();
  const user = useSelector((state: RootState) => state.user.user);
 
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
      <Button title="Đăng xuất" onPress={() => handleLogout()} />
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