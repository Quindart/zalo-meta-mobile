import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

const Login = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [passwordVisible, setPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu

  return (
    <RootLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTING.HOME)} style={styles.backButton}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitile}>Đăng nhập</Text>
      </View>
      <View style={styles.containerText}>
        <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
      </View>

      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" />
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Mật khẩu"
          secureTextEntry={!passwordVisible} // Kiểm soát hiển thị mật khẩu
        />
        <TouchableOpacity
          onPress={() => setPasswordVisible(!passwordVisible)} // Đổi trạng thái hiển thị mật khẩu
          style={styles.eyeButton}
        >
          <AntDesign
            name={passwordVisible ? "eye" : "eyeo"} // Biểu tượng mắt
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </View>
      </View>
    </RootLayout>
  );
};

export default Login;
