import { useState } from 'react';
import * as React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Formik } from 'formik';
import * as Yup from 'yup';

import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import RootLayout from '@/layout/RootLayout';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth';
import Header from '@/components/ui/Header';
import styles from './css';
// Validation schema using Yup
const LoginSchema = Yup.object().shape({
  phone: Yup.string()
    .matches(/^0\d{9}$/, 'Số điện thoại phải bắt đầu bằng 0 và có 10 chữ số')
    .required('Vui lòng nhập số điện thoại'),
  password: Yup.string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { handleLogin } = useAuth();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  return (
    <RootLayout>
      <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
        <Header title="Đăng nhập" route={ROUTING.HOME} />

        <View style={styles.containerText}>
          <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
        </View>

        <Formik
          initialValues={{ phone: '0329347499', password: '12345678' }}
          validationSchema={LoginSchema}
          validateOnBlur={false} // Disable automatic validation on blur to control it manually
          onSubmit={async (values, { setSubmitting, setErrors }) => {
            const response = await handleLogin(values.phone, values.password);
            if (typeof response === 'string') {
              setErrors({ phone: response });
            }
            setSubmitting(false);
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            validateField,
            setFieldTouched,
          }) => (
            <>
              {/* Phone input */}
              <View
                style={[
                  styles.inputContainer,
                  { borderBottomColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' },
                ]}
              >
                <TextInput
                  style={styles.input}
                  placeholder="Số điện thoại"
                  keyboardType="phone-pad"
                  value={values.phone}
                  onChangeText={handleChange('phone')}
                  onFocus={() => setPhoneFocused(true)}
                  onBlur={() => {
                    setPhoneFocused(false);
                    handleBlur('phone'); // Mark the field as touched
                    validateField('phone'); // Trigger validation
                    setFieldTouched('phone', true, false); // Explicitly mark field as touched
                  }}
                />
              </View>
              {touched.phone && errors.phone && (
                <Text style={{ color: theme.colors.error, marginLeft: 15, marginBottom: 10 }}>
                  {errors.phone}
                </Text>
              )}

              {/* Password input */}
              <View
                style={[
                  styles.inputContainer,
                  { borderBottomColor: passwordFocused ? theme.colors.primaryContainer : '#ccc' },
                ]}
              >
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  placeholder="Mật khẩu"
                  secureTextEntry={!passwordVisible}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => {
                    setPasswordFocused(false);
                    handleBlur('password'); // Mark the field as touched
                    validateField('password'); // Trigger validation
                    setFieldTouched('password', true, false); // Explicitly mark field as touched
                  }}
                />
                <TouchableOpacity
                  onPress={() => setPasswordVisible(!passwordVisible)}
                  style={styles.eyeButton}
                >
                  <AntDesign name={passwordVisible ? 'eye' : 'eyeo'} size={24} color="gray" />
                </TouchableOpacity>
              </View>
              {touched.password && errors.password && (
                <Text style={{ color: theme.colors.error, marginLeft: 15, marginBottom: 10 }}>
                  {errors.password}
                </Text>
              )}

              <View style={styles.container}>
                <TouchableOpacity
                  style={[styles.button, isSubmitting && { opacity: 0.6 }]}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  <Text style={styles.buttonText}>
                    {isSubmitting ? 'Đang đăng nhập...' : 'Đăng nhập'}
                  </Text>
                </TouchableOpacity>
                <View style={styles.forgotPassword}>
                  <TouchableOpacity onPress={() => navigation.navigate(ROUTING.FORGOT_PASSWORD)}>
                    <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </>
          )}
        </Formik>
      </View>
    </RootLayout>
  );
};

export default Login;