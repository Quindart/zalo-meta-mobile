// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet } from 'react-native';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import styles from './css';
// import RootLayout from '@/layout/RootLayout';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { ROUTING } from '@/utils/constant';
// import { LinearGradient } from 'expo-linear-gradient';
// import theme from '@/theme';

// const Register = () => {
//   const navigation = useNavigation<NavigationProp<ParamListBase>>();
//   const [selectedCode, setSelectedCode] = useState('+84'); // Mặc định là mã vùng Việt Nam
//   const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal
//   const [phoneFocused, setPhoneFocused] = useState(false); // Trạng thái focus của ô số điện thoại


//   // Danh sách mã vùng
//   const countryCodes = [
//     { label: 'Việt Nam (+84)', value: '+84' },

//   ];

//   return (
//     <RootLayout>

//       <View style={styles.container}>
//         <Text style={styles.title}>Nhập số điện thoại</Text>
//         <View style={[styles.phoneInputWrapper, { borderColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' },]}>
//           {/* Button to open the country code modal */}
//           <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerWrapper}>
//             <Text style={styles.selectedCode}>{selectedCode}</Text>
//             <AntDesign name="down" size={24} color="black" />
//           </TouchableOpacity>

//           {/* Modal to select country code */}
//           <Modal
//             visible={modalVisible}
//             transparent={true}
//             animationType="slide"
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <View style={styles.modalOverlay}>
//               <View style={styles.modalContent}>
//                 <FlatList
//                   data={countryCodes}
//                   keyExtractor={(item) => item.value}
//                   renderItem={({ item }) => (
//                     <TouchableOpacity
//                       style={styles.modalItem}
//                       onPress={() => {
//                         setSelectedCode(item.value);
//                         setModalVisible(false);
//                       }}
//                     >
//                       <Text style={styles.modalItemText}>{item.label}</Text>
//                     </TouchableOpacity>
//                   )}
//                 />
//               </View>
//             </View>
//           </Modal>

//           {/* TextInput for phone number */}
//           <TextInput
//             style={styles.phoneInput}
//             placeholder="Số điện thoại"
//             keyboardType="phone-pad"
//             onFocus={() => setPhoneFocused(true)}
//             onBlur={() => setPhoneFocused(false)}
//           />
//         </View>
//         <TouchableOpacity style={styles.button}>
//           <Text style={styles.buttonText}>Tiếp theo</Text>
//         </TouchableOpacity>
//       </View>
//     </RootLayout>
//   );
// };
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth'; // Import the useAuth hook

const Register = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { register } = useAuth(); // Use the register function from the useAuth hook
  const [selectedCode, setSelectedCode] = useState('+84'); // Default to Vietnam country code
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  const [phoneFocused, setPhoneFocused] = useState(false); // State for phone input focus
  const [phone, setPhone] = useState(''); // State for phone number input
  const [password, setPassword] = useState(''); // State for password input
  const [email, setEmail] = useState(''); // State for email input
  const [avatar, setAvatar] = useState(''); // State for avatar input
  const [firstName, setFirstName] = useState(''); // State for first name input
  const [lastName, setLastName] = useState(''); // State for last name input
  const [dateOfBirth, setDateOfBirth] = useState(new Date()); // State for date of birth input
  const [showDatePicker, setShowDatePicker] = useState(false); // State for date picker visibility
  const [loading, setLoading] = useState(false); // State for loading indicator
  const [titleDate, setTitleDate] = useState('Chọn ngày sinh'); // State for date picker title

  // Country code list
  const countryCodes = [
    { label: 'Việt Nam (+84)', value: '+84' },
  ];

  const handleRegister = async () => {
    if (!phone || !password || !email || !firstName || !lastName || !avatar) {
      Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ thông tin');
      return;
    }

    setLoading(true);
    try {
      await register({
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

  return (
    <RootLayout>
      <View style={styles.container}>
        <Text style={styles.title}>Nhập thông tin đăng ký</Text>
        <View style={[styles.phoneInputWrapper, { borderColor: phoneFocused ? theme.colors.primaryContainer : '#ccc' }]}>
          {/* Button to open the country code modal */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.pickerWrapper}>
            <Text style={styles.selectedCode}>{selectedCode}</Text>
            <AntDesign name="down" size={24} color="black" />
          </TouchableOpacity>

          {/* Modal to select country code */}
          <Modal
            visible={modalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <FlatList
                  data={countryCodes}
                  keyExtractor={(item) => item.value}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.modalItem}
                      onPress={() => {
                        setSelectedCode(item.value);
                        setModalVisible(false);
                      }}
                    >
                      <Text style={styles.modalItemText}>{item.label}</Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </View>
          </Modal>

          {/* TextInput for phone number */}
          <TextInput
            style={styles.phoneInput}
            placeholder="Số điện thoại"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            onFocus={() => setPhoneFocused(true)}
            onBlur={() => setPhoneFocused(false)}
          />
        </View>
        <TextInput
          style={styles.input}
          placeholder="Mật khẩu"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Avatar URL"
          value={avatar}
          onChangeText={setAvatar}
        />
        <TextInput
          style={styles.input}
          placeholder="Họ"
          value={firstName}
          onChangeText={setFirstName}
        />
        <TextInput
          style={styles.input}
          placeholder="Tên"
          value={lastName}
          onChangeText={setLastName}
        />
        <TouchableOpacity style={styles.buttonDate} onPress={() => setShowDatePicker(true)} >
          <Text style={styles.titleDate}>{titleDate}</Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={dateOfBirth}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowDatePicker(false);
              if (selectedDate) {
                setDateOfBirth(selectedDate);
                setTitleDate(selectedDate.toLocaleDateString('vi-VN'));
              }
            }}
          />
        )}
        <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={loading}>
          {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Đăng ký</Text>}
        </TouchableOpacity>
      </View>
    </RootLayout>
  );
};

export default Register;