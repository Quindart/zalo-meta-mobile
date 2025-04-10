// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   Modal,
//   FlatList,
//   StyleSheet,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform
// } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import DateTimePicker from '@react-native-community/datetimepicker';
// import styles from './css';
// import theme from '@/theme';
// import useAuth from '@/hooks/useAuth';
// import Header from '@/components/ui/Header';

// const Register = () => {
//   const { handleRegister } = useAuth();
//   const [selectedCode, setSelectedCode] = useState('+84');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');
//   const [avatar, setAvatar] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [dateOfBirth, setDateOfBirth] = useState(new Date());
//   const [showDatePicker, setShowDatePicker] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [titleDate, setTitleDate] = useState('Chọn ngày sinh');

//   useEffect(() => {
//     setAvatar('hh'); // Avatar mặc định
//   }, []);

//   const onSubmit = async () => {
//     if (!phone || !password || !email || !firstName || !lastName || !avatar) {
//       Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
//       return;
//     }
//     setLoading(true);
//     try {
//       await handleRegister({
//         phone: phone,
//         password,
//         email,
//         avatar,
//         firstName,
//         lastName,
//         dateOfBirth: dateOfBirth.toISOString(),
//       });
//     } catch (error) {
//       Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1, backgroundColor: theme.colors.background }}
//       behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//     >
//       <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
//         <Header title="Đăng ký" />
//         <View style={styles.container}>
//           <Text style={styles.title}>Nhập thông tin đăng ký</Text>

//           <View style={styles.input}>
//             <TextInput
//               style={styles.phoneInput}
//               placeholder="Số điện thoại"
//               keyboardType="phone-pad"
//               value={phone}
//               onChangeText={setPhone}
//               onFocus={() => setPhoneFocused(true)}
//               onBlur={() => setPhoneFocused(false)}
//             />
//           </View>

//           <TextInput
//             style={styles.input}
//             placeholder="Mật khẩu"
//             secureTextEntry
//             value={password}
//             onChangeText={setPassword}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Email"
//             keyboardType="email-address"
//             value={email}
//             onChangeText={setEmail}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Họ"
//             value={firstName}
//             onChangeText={setFirstName}
//           />
//           <TextInput
//             style={styles.input}
//             placeholder="Tên"
//             value={lastName}
//             onChangeText={setLastName}
//           />

//           <TouchableOpacity style={styles.buttonDate} onPress={() => setShowDatePicker(true)}>
//             <Text style={styles.titleDate}>{titleDate}</Text>
//           </TouchableOpacity>

//           {showDatePicker && (
//             <DateTimePicker
//               value={dateOfBirth}
//               mode="date"
//               display="default"
//               onChange={(_: any, selectedDate: any) => {
//                 setShowDatePicker(false);
//                 if (selectedDate) {
//                   setDateOfBirth(selectedDate);
//                   setTitleDate(selectedDate.toLocaleDateString('vi-VN'));
//                 }
//               }}
//             />
//           )}

//           <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
//             {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đăng ký</Text>}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Register;


import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Modal,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './css';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth';
import Header from '@/components/ui/Header';

const Register = () => {
  const { handleRegister } = useAuth();
  const [selectedCode] = useState('+84');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [titleDate, setTitleDate] = useState('Chọn ngày sinh');

  // State để quản lý focus và lỗi
  const [focusedField, setFocusedField] = useState<null | 'phone' | 'password' | 'email' | 'firstName' | 'lastName'>(null);
  const [errors, setErrors] = useState({
    phone: '',
    password: '',
    email: '',
    firstName: '',
    lastName: ''
  });

  useEffect(() => {
    setAvatar('hh'); // Avatar mặc định
  }, []);

  // Hàm kiểm tra dữ liệu
  const validateField = (field: string, value: string) => {
    switch (field) {
      case 'phone':
        if (!value.match(/^0\d{9}$/)) {
          return 'Số điện thoại phải bắt đầu bằng 0 và có 10 số';
        }
        return '';
      case 'password':
        if (value.length < 8) {
          return 'Mật khẩu phải có ít nhất 8 ký tự';
        }
        return '';
      case 'email':
        if (!value.endsWith('@gmail.com')) {
          return 'Email phải có đuôi @gmail.com';
        }
        return '';
      case 'firstName':
        if (!value.trim()) {
          return 'Vui lòng nhập họ';
        }
        return '';
      case 'lastName':
        if (!value.trim()) {
          return 'Vui lòng nhập tên';
        }
        return '';
      default:
        return '';
    }
  };

  // Xử lý khi blur
  //   Khi người dùng rời khỏi trường nhập liệu (input field), hàm này sẽ được gọi để kiểm tra dữ liệu và cập nhật lỗi nếu có.
  const handleBlur = (field: keyof typeof errors) => (value: string) => {
    const error: string = validateField(field, value);
    setErrors((prev: typeof errors) => ({ ...prev, [field]: error }));
    setFocusedField(null);
  };

  const onSubmit = async () => {
    // Kiểm tra tất cả field trước khi submit
    const newErrors = {
      phone: validateField('phone', phone),
      password: validateField('password', password),
      email: validateField('email', email),
      firstName: validateField('firstName', firstName),
      lastName: validateField('lastName', lastName)
    };

    setErrors(newErrors);

    // Kiểm tra nếu có lỗi
    if (Object.values(newErrors).some(error => error !== '')) {
      Alert.alert('Lỗi', 'Vui lòng kiểm tra lại thông tin');
      return;
    }

    if (!phone || !password || !email || !firstName || !lastName || !avatar) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      await handleRegister({
        phone: phone,
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
      setLoading(false);
    }
  };

  // Style bổ sung cho border xanh khi focus và text lỗi đỏ
  const additionalStyles = StyleSheet.create({
    inputFocused: {
      borderColor: '#00f',
      borderWidth: 1,
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

          {errors.phone ? <Text style={additionalStyles.errorText}>{errors.phone}</Text> : null}
          <View style={[styles.input, focusedField === 'phone' && additionalStyles.inputFocused]}>
            <TextInput
              style={styles.phoneInput}
              placeholder="Số điện thoại"
              keyboardType="phone-pad"
              value={phone}
              onChangeText={setPhone}
              onFocus={() => setFocusedField('phone')}
              onBlur={() => handleBlur('phone')(phone)}
            />
          </View>

          {errors.password ? <Text style={additionalStyles.errorText}>{errors.password}</Text> : null}
          <TextInput
            style={[styles.input, focusedField === 'password' && additionalStyles.inputFocused]}
            placeholder="Mật khẩu"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            onFocus={() => setFocusedField('password')}
            onBlur={() => handleBlur('password')(password)}
          />

          {errors.email ? <Text style={additionalStyles.errorText}>{errors.email}</Text> : null}
          <TextInput
            style={[styles.input, focusedField === 'email' && additionalStyles.inputFocused]}
            placeholder="Email"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            onFocus={() => setFocusedField('email')}
            onBlur={() => handleBlur('email')(email)}
          />

          {errors.firstName ? <Text style={additionalStyles.errorText}>{errors.firstName}</Text> : null}
          <TextInput
            style={[styles.input, focusedField === 'firstName' && additionalStyles.inputFocused]}
            placeholder="Họ"
            value={firstName}
            onChangeText={setFirstName}
            onFocus={() => setFocusedField('firstName')}
            onBlur={() => handleBlur('firstName')(firstName)}
          />

          {errors.lastName ? <Text style={additionalStyles.errorText}>{errors.lastName}</Text> : null}
          <TextInput
            style={[styles.input, focusedField === 'lastName' && additionalStyles.inputFocused]}
            placeholder="Tên"
            value={lastName}
            onChangeText={setLastName}
            onFocus={() => setFocusedField('lastName')}
            onBlur={() => handleBlur('lastName')(lastName)}
          />

          <TouchableOpacity style={styles.buttonDate} onPress={() => setShowDatePicker(true)}>
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

          <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đăng ký</Text>}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;