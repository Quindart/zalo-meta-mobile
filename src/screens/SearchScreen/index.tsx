import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import QR_Scan from '@/components/ui/QR_Scan';

import HeaderSearch from './HeaderSearch';

const SearchScreen = () => {


    return (
        <View>
            <HeaderSearch />
        </View>
    );
};



export default SearchScreen;
