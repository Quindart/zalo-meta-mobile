import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';

const Login = () => {



  return (
    <RootLayout>
      <Text>Tin nhắn</Text>
    </RootLayout>
  );
};

export default Login;
