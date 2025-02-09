import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

const SearchBar = ({ placeholder = 'Tìm kiếm...' }) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(ROUTING.SEARCH_SCREEN)}
      activeOpacity={1}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        height: 40,
        width: '85%',
      }}
    >
      <AntDesign name="search1" size={20} color="white" style={{ marginRight: 15 }} />
      <TextInput
        style={{ fontSize: 16, color: 'white', flex: 1 }}
        placeholder={placeholder}
        placeholderTextColor="white"
        editable={false} // Chặn nhập liệu, chỉ dùng để mở màn hình tìm kiếm
      />
    </TouchableOpacity>
  );
};

export default SearchBar;
