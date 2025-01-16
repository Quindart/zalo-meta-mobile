import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, FlatList, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import styles from './css';
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

const Register = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedCode, setSelectedCode] = useState('+84'); // Mặc định là mã vùng Việt Nam
  const [modalVisible, setModalVisible] = useState(false); // Trạng thái hiển thị modal

  // Danh sách mã vùng
  const countryCodes = [
    { label: 'Việt Nam (+84)', value: '+84' },
    { label: 'Mỹ (+1)', value: '+1' },
    { label: 'Nhật Bản (+81)', value: '+81' },
    { label: 'Hàn Quốc (+82)', value: '+82' },
    { label: 'Ấn Độ (+91)', value: '+91' },
  ];

  return (
    <RootLayout>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate(ROUTING.HOME)} style={styles.backButton}>
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitile}>Tạo tài khoản</Text>
      </View>

      <View style={styles.container}>
        <Text style={styles.title}>Nhập số điện thoại</Text>
        <View style={styles.phoneInputWrapper}>
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
          />
        </View>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Tiếp theo</Text>
        </TouchableOpacity>
      </View>
    </RootLayout>
  );
};

export default Register;
