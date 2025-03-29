
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet, ActivityIndicator, Alert, Button } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import theme from '@/theme';
import useAuth from '@/hooks/useAuth'; 

const Register = () => {
  const { handleRegister } = useAuth(); 
  const [selectedCode, setSelectedCode] = useState('+84'); 
  const [modalVisible, setModalVisible] = useState(false); 
  const [phoneFocused, setPhoneFocused] = useState(false); 
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

  
  const countryCodes = [
    { label: 'Việt Nam (+84)', value: '+84' },
  ];

  const onSubmit = async () => {
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
            onChange={(_:any, selectedDate:any) => {
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
    </RootLayout>
  );
};

export default Register;