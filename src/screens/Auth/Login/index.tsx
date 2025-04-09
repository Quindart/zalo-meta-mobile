import { RootStackParamList } from '@/navigation/type';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleLogin } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async () => {
    await handleLogin(phone, password);
  }
  return (
    <RootLayout>
      <View style={styles.containerText}>
        <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
      </View>

      {/* Ô nhập số điện thoại */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' },
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
          onChangeText={setPhone}
        />
      </View>

      {/* Ô nhập mật khẩu */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: passwordFocused ? theme.colors.primaryContainer : '#ccc' },
        ]}
      >
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Mật khẩu"
          secureTextEntry={!passwordVisible}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)}
          style={styles.eyeButton}
        >
          <AntDesign
            name={passwordVisible ? 'eye' : 'eyeo'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.forgotPassword}>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTING.FORGOT_PASSWORD)}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RootLayout>
  );
};

export default Login;
