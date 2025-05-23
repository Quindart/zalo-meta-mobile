import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet, Image } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons, EvilIcons, Ionicons, FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import QR_Scan from '@/components/ui/QR_Scan';
import useUser from '@/hooks/useUser';
import { User } from '@/models/user';
import { useFriend } from '@/hooks/useFriend';
import styles from './style'

const SearchScreen = () => {
  const { handleSearchUserByPhone } = useUser();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const handleSearch = async (phone: string) => {
    try {
      const data = await handleSearchUserByPhone(phone);
      if (data) {
        setResults(data); // hoặc data.results tùy vào response
        console.log('Kết quả tìm kiếm:', data);
      } else {
        setResults([]);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
      setResults([]);
    }
  };
  const renderItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.resultItem}>
        <View style={styles.userContainer}>
          <TouchableOpacity onPress={() => {
            navigation.navigate(ROUTING.PROFILE_FRIEND_SCREEN, { itemFriend: item })
          }}
            style={{ flexDirection: 'row', width: '85%', alignItems: 'center' }}>
            <Image
              source={{ uri: item.avatar }}
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text style={styles.userName}>{item.firstName} {item.lastName} </Text>
              <Text style={styles.userPhone}>Số điện thoại: {item.phone}</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header với Gradient */}
      <LinearGradient
        colors={[theme.colors.primary, theme.colors.primaryContainer]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.header}
      >
        {/* Nút Quay Lại */}
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <AntDesign name="arrowleft" size={20} color="white" />
        </TouchableOpacity>
        <View style={styles.searchIcon_QR}>
          {/* Ô nhập tìm kiếm */}
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm kiếm"
            placeholderTextColor="#989BA1"
            value={searchText}
            onChangeText={setSearchText} // Cập nhật searchText bình thường
            onSubmitEditing={() => handleSearch(searchText)} // Gọi khi nhấn "Xong"
            returnKeyType="search" // Hiển thị nút "Tìm" thay vì "Xong"
            autoFocus
          />
          {/* Icon Tìm Kiếm */}
          <AntDesign name="search1" size={18} color="#989BA1" style={{ position: 'absolute', left: '3%' }} />
          {/* Nút Xóa */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => { setResults([]); setSearchText(''); }} style={[styles.iconButton, { position: 'absolute', right: '15%' }]}>
              <AntDesign name="closecircle" size={18} color="#989BA1" />
            </TouchableOpacity>
          )}
          {/* Icon Bên Phải */}
          <View style={styles.rightIcons}>
            <QR_Scan />
          </View>
        </View>
      </LinearGradient>
      {/* Danh sách kết quả tìm kiếm */}
      <FlatList
        data={results}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListEmptyComponent={<View style={styles.resultItem}>
          <Text style={styles.resultText}>Không tìm thấy người dùng nào</Text>
        </View>}
      />
    </View>
  );
};
export default SearchScreen;
