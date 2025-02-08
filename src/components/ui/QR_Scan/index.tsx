import React, { useState } from 'react';
import { View } from 'react-native';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const QR_Scan = () => {
  return (
    <View>
      <MaterialCommunityIcons name="qrcode-scan" size={22} color='white' />
    </View>
  );
};

export default QR_Scan;
