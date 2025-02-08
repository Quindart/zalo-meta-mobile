import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({ placeholder = 'Tìm kiếm...', onSearch }: { placeholder?: string, onSearch?: (text: string) => void }) => {
  const [searchText, setSearchText] = useState('');

  const handleClear = () => {
    setSearchText('');
    onSearch?.('');
  };

  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      // backgroundColor: 'yellow',
      paddingHorizontal: 15,
      height: 40,
      width: '85%',
    }}>
      {/* Icon Kính Lúp */}
      <AntDesign name="search1" size={20} color="white" style={{ marginRight: 15 }} />

      {/* Ô Nhập Tìm Kiếm */}
      <TextInput
        style={{ fontSize: 16, color: 'white', flex: 1 }}
        placeholder={placeholder}
        // placeholder="Tìm kiếm"
        placeholderTextColor="white"
        value={searchText}
        onChangeText={(text) => {
          setSearchText(text);
          onSearch?.(text);
        }}
      />

      {/* Nút Xóa (×) */}
      {searchText.length > 0 && (
        <TouchableOpacity onPress={handleClear}>
          <AntDesign name="close" size={18} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
