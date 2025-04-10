// import React, { useState, useEffect } from 'react';
// import { RootStackParamList } from '@/navigation/type';
// import { View, Text, TextInput, TouchableOpacity } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import styles from './css';
// import RootLayout from '@/layout/RootLayout';
// import theme from '@/theme';
// import useAuth from '@/hooks/useAuth';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ROUTING } from '@/utils/constant';
// const Login = () => {
//   const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//   const { handleLogin } = useAuth();

//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [phoneFocused, setPhoneFocused] = useState(false);
//   const [passwordFocused, setPasswordFocused] = useState(false);

//   const [phone, setPhone] = useState('');
//   const [password, setPassword] = useState('');

//   const onSubmit = async () => {
//     await handleLogin(phone, password);
//   }

//   //Tự động chạy onSubmit khi mới khởi tạo
//   useEffect(() => {
//     setPhone('0123456789');
//     setPassword('12345678');
//   }, []);

//   return (
//     <RootLayout>
//       <View style={styles.containerText}>
//         <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
//       </View>

//       {/* Ô nhập số điện thoại */}
//       <View
//         style={[
//           styles.inputContainer,
//           { borderColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' },
//         ]}
//       >
//         <TextInput
//           style={styles.input}
//           placeholder="Số điện thoại"
//           keyboardType="phone-pad"
//           onFocus={() => setPhoneFocused(true)}
//           onBlur={() => setPhoneFocused(false)}
//           onChangeText={setPhone}
//         />
//       </View>

//       {/* Ô nhập mật khẩu */}
//       <View
//         style={[
//           styles.inputContainer,
//           { borderColor: passwordFocused ? theme.colors.primaryContainer : '#ccc' },
//         ]}
//       >
//         <TextInput
//           style={[styles.input, styles.passwordInput]}
//           placeholder="Mật khẩu"
//           secureTextEntry={!passwordVisible}
//           onFocus={() => setPasswordFocused(true)}
//           onBlur={() => setPasswordFocused(false)}
//           onChangeText={setPassword}
//         />
//         <TouchableOpacity
//           onPress={() => setPasswordVisible(!passwordVisible)}
//           style={styles.eyeButton}
//         >
//           <AntDesign
//             name={passwordVisible ? 'eye' : 'eyeo'}
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button} onPress={onSubmit}>
//           <Text style={styles.buttonText}>Đăng nhập</Text>
//         </TouchableOpacity>
//         <View style={styles.forgotPassword}>
//           <TouchableOpacity onPress={() => navigation.navigate(ROUTING.FORGOT_PASSWORD)}>
//             <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </RootLayout>
//   );
// };

// export default Login;


import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth';
import Header from '@/components/ui/Header';

const Login = () => {
  const { handleLogin } = useAuth();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState<string | null>(null);

  const onSubmit = async () => {
    const response = await handleLogin(phone, password);
    if (typeof response === 'string') {
      setError(response);
    } else {
      setError(null);
    }
  };

  // Tự động chạy onSubmit khi mới khởi tạo (nếu muốn test tự động login)
  useEffect(() => {
    setPhone('0123456789');
    setPassword('12345678');
  }, []);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
      <Header title="Đăng nhập" />
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
          value={phone}
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
          value={password}
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

      {/* ⚠️ Thông báo lỗi nếu có */}
      {error && (
        <Text style={{ color: 'red', textAlign: 'center', marginVertical: 10 }}>
          {error}
        </Text>
      )}

      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={onSubmit}>
          <Text style={styles.buttonText}>Đăng nhập</Text>
        </TouchableOpacity>
        <View style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
        </View>
      </View>
    </View>
  );
};

export default Login;
