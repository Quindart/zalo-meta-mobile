import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Formik } from 'formik';
import * as Yup from 'yup';
import styles from './css';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth';
import Header from '@/components/ui/Header';

const Register = () => {
  const { handleRegister } = useAuth();
  const [avatar, setAvatar] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [titleDate, setTitleDate] = useState('Chọn ngày sinh');

  useEffect(() => {
    setAvatar('hh'); // Avatar mặc định
  }, []);

  // Schema validation với Yup
  const validationSchema = Yup.object().shape({
    phone: Yup.string()
      .matches(/^0\d{9}$/, 'Số điện thoại phải bắt đầu bằng 0 và có 10 số')
      .required('Vui lòng nhập số điện thoại'),
    password: Yup.string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .required('Vui lòng nhập mật khẩu'),
    email: Yup.string()
      .email('Email phải có định dạng @gmail.com')
      .matches(/@gmail\.com$/, 'Email phải có đuôi @gmail.com')
      .required('Vui lòng nhập email'),
    firstName: Yup.string()
      .trim()
      .required('Vui lòng nhập họ'),
    lastName: Yup.string()
      .trim()
      .required('Vui lòng nhập tên'),
  });

  const onSubmitForm = async (values: any, { setSubmitting }: any) => {
    const { phone, password, email, firstName, lastName } = values;

    try {
      await handleRegister({
        phone,
        password,
        email,
        avatar,
        firstName,
        lastName,
        dateOfBirth: dateOfBirth.toISOString(),
      });
    } catch (error) {
      Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký');
    } finally {
      setSubmitting(false);
    }
  };

  // Style bổ sung cho UI
  const additionalStyles = StyleSheet.create({
    input: {
      width: '90%',
      height: 52,
      borderRadius: 15,
      // backgroundColor: theme.colors.surfaceVariant,
      borderWidth: 1,
      borderColor: theme.colors.surfaceVariant,
      paddingHorizontal: 15,
      marginTop: 10,
    },
    inputError: {
      borderColor: 'red',
    },
    errorText: {
      color: 'red',
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.colors.background }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Header title="Đăng ký" />
        <View style={styles.container}>
          <Text style={styles.title}>Nhập thông tin đăng ký</Text>

          <Formik
            initialValues={{
              phone: '',
              password: '',
              email: '',
              firstName: '',
              lastName: '',
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmitForm}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              isSubmitting,
              setFieldValue,
            }) => (
              <>
                {/* Số điện thoại */}
                {touched.phone && errors.phone && (
                  <Text style={additionalStyles.errorText}>{errors.phone}</Text>
                )}
                <TextInput
                  style={[
                    additionalStyles.input,
                    touched.phone && errors.phone && additionalStyles.inputError,
                  ]}
                  placeholder="Số điện thoại"
                  keyboardType="phone-pad"
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />

                {/* Mật khẩu */}
                {touched.password && errors.password && (
                  <Text style={additionalStyles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  style={[
                    additionalStyles.input,
                    touched.password && errors.password && additionalStyles.inputError,
                  ]}
                  placeholder="Mật khẩu"
                  secureTextEntry
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                />

                {/* Email */}
                {touched.email && errors.email && (
                  <Text style={additionalStyles.errorText}>{errors.email}</Text>
                )}
                <TextInput
                  style={[
                    additionalStyles.input,
                    touched.email && errors.email && additionalStyles.inputError,
                  ]}
                  placeholder="Email"
                  keyboardType="email-address"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />

                {/* Họ */}
                {touched.firstName && errors.firstName && (
                  <Text style={additionalStyles.errorText}>{errors.firstName}</Text>
                )}
                <TextInput
                  style={[
                    additionalStyles.input,
                    touched.firstName && errors.firstName && additionalStyles.inputError,
                  ]}
                  placeholder="Họ"
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                />

                {/* Tên */}
                {touched.lastName && errors.lastName && (
                  <Text style={additionalStyles.errorText}>{errors.lastName}</Text>
                )}
                <TextInput
                  style={[
                    additionalStyles.input,
                    touched.lastName && errors.lastName && additionalStyles.inputError,
                  ]}
                  placeholder="Tên"
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                />

                {/* Chọn ngày sinh */}
                <TouchableOpacity
                  style={styles.buttonDate}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Text style={styles.titleDate}>{titleDate}</Text>
                </TouchableOpacity>

                {showDatePicker && (
                  <DateTimePicker
                    value={dateOfBirth}
                    mode="date"
                    display="default"
                    onChange={(_: any, selectedDate: any) => {
                      setShowDatePicker(false);
                      if (selectedDate) {
                        setDateOfBirth(selectedDate);
                        setTitleDate(selectedDate.toLocaleDateString('vi-VN'));
                      }
                    }}
                  />
                )}

                {/* Nút Đăng ký */}
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => handleSubmit()}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Đăng ký</Text>
                  )}
                </TouchableOpacity>
              </>
            )}
          </Formik>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;