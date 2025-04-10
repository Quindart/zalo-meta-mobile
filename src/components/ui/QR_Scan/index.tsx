import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Camera } from 'expo-camera';
import { ROUTING } from '@/utils/constant';
import { RootStackParamList } from '@/navigation/type';

const QR_Scan = () => {
  const [hasPermission, setHasPermission] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  // Hàm yêu cầu quyền camera
  const requestCameraPermission = async () => {
    try {
      const { status } = await Camera.requestCameraPermissionsAsync(); // Yêu cầu quyền camera từ expo-camera
      if (status === 'granted') {
        console.log('Quyền camera được cấp!');
        setHasPermission(true);
      } else {
        console.log('Quyền camera bị từ chối.');
        setHasPermission(false);
        Alert.alert(
          'Quyền bị từ chối',
          'Ứng dụng cần quyền camera để quét mã QR. Vui lòng cấp quyền trong cài đặt.',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Lỗi khi yêu cầu quyền camera:', error);
      setHasPermission(false);
    }
  };

  // Hàm xử lý khi nhấn nút quét QR
  const handleScan = () => {
    if (hasPermission) {
      navigation.navigate(ROUTING.QR_SCAN);
    } else {
      requestCameraPermission(); // Yêu cầu lại quyền nếu chưa có
    }
  };

  // Yêu cầu quyền khi component được mount
  useEffect(() => {
    requestCameraPermission();
  }, []);

  return (
    <View>
      {/* Icon QR Scan */}
      <TouchableOpacity onPress={handleScan}>
        <MaterialCommunityIcons name="qrcode-scan" size={22} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default QR_Scan;