// import React, { useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import styles from './css';
// import RootLayout from '@/layout/RootLayout';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { ROUTING } from '@/utils/constant';
// import { LinearGradient } from 'expo-linear-gradient';
// import theme from '@/theme';

// const Login = () => {
//   const navigation = useNavigation<NavigationProp<ParamListBase>>();
//   const [passwordVisible, setPasswordVisible] = useState(false); // Trạng thái hiển thị mật khẩu

//   return (
//     <RootLayout>
//       <LinearGradient
//         colors={[theme.colors.primary, theme.colors.primaryContainer]}
//         start={{ x: 0, y: 0 }} // Bắt đầu từ bên trái
//         end={{ x: 1, y: 0 }}   // Kết thúc bên phải
//         style={styles.header}
//       >
//         <TouchableOpacity onPress={() => navigation.navigate(ROUTING.HOME)} style={styles.backButton}>
//           <AntDesign name="left" size={24} color="white" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Đăng nhập</Text>
//       </LinearGradient>

//       <View style={styles.containerText}>
//         <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
//       </View>

//       <View style={styles.inputContainer}>
//         <TextInput style={styles.input} placeholder="Số điện thoại" keyboardType="phone-pad" />
//       </View>
//       <View style={styles.inputContainer}>
//         <TextInput
//           style={[styles.input, styles.passwordInput]}
//           placeholder="Mật khẩu"
//           secureTextEntry={!passwordVisible} // Kiểm soát hiển thị mật khẩu
//         />
//         <TouchableOpacity
//           onPress={() => setPasswordVisible(!passwordVisible)} // Đổi trạng thái hiển thị mật khẩu
//           style={styles.eyeButton}
//         >
//           <AntDesign
//             name={passwordVisible ? "eye" : "eyeo"} // Biểu tượng mắt
//             size={24}
//             color="gray"
//           />
//         </TouchableOpacity>
//       </View>

//       <View style={styles.container}>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Đăng nhập</Text>
//         </TouchableOpacity>
//         <View style={styles.forgotPassword}>
//           <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
//         </View>
//       </View>
//     </RootLayout>
//   );
// };

// export default Login;


import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';

const Login = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [phoneFocused, setPhoneFocused] = useState(false); // Trạng thái focus của ô số điện thoại
  const [passwordFocused, setPasswordFocused] = useState(false); // Trạng thái focus của ô mật khẩu

  return (
    <RootLayout>
      {/* <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => navigation.navigate(ROUTING.HOME)} style={styles.backButton}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Đăng nhập</Text>
      </LinearGradient> */}

      <View style={styles.containerText}>
        <Text style={styles.text}>Vui lòng nhập số điện thoại và mật khẩu để đăng nhập</Text>
      </View>

      {/* Ô nhập số điện thoại */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' }, // Đổi màu viền khi focus
        ]}
      >
        <TextInput
          style={styles.input}
          placeholder="Số điện thoại"
          keyboardType="phone-pad"
          onFocus={() => setPhoneFocused(true)}
          onBlur={() => setPhoneFocused(false)}
        />
      </View>

      {/* Ô nhập mật khẩu */}
      <View
        style={[
          styles.inputContainer,
          { borderColor: passwordFocused ? theme.colors.primaryContainer : '#ccc' }, // Đổi màu viền khi focus
        ]}
      >
        <TextInput
          style={[styles.input, styles.passwordInput]}
          placeholder="Mật khẩu"
          secureTextEntry={!passwordVisible}
          onFocus={() => setPasswordFocused(true)}
          onBlur={() => setPasswordFocused(false)}
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
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION)}>
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
