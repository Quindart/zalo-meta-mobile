import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, StyleSheet } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons, EvilIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import QR_Scan from '@/components/ui/QR_Scan';

const SearchScreen = () => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = (text: string) => {
    setSearchText(text);
    setResults(text ? [`${text} 1`, `${text} 2`, `${text} 3`] : []);
  };

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
            onChangeText={handleSearch}
            autoFocus
          />

          {/* Icon Tìm Kiếm */}
          <AntDesign name="search1" size={18} color="#989BA1" style={{ position: 'absolute', left: '3%' }} />

          {/* Nút Xóa */}
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')} style={[styles.iconButton, { position: 'absolute', right: '15%' }]}>
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
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.resultItem}>
            <Text style={styles.resultText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    height: 50,
  },
  iconButton: {
    padding: 10,

  },

  searchIcon_QR: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    position: 'relative',
  },

  searchInput: {
    width: '83%',
    fontSize: 14,
    color: 'black',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 32,
    height: 32,
    paddingTop: 0,
    paddingBottom: 0,
    marginLeft: 3,
  }
  ,

  rightIcons: {
    marginRight: 12,
  },
  resultItem: {
    padding: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd',
  },
  resultText: {
    fontSize: 16,
  },
});



export default SearchScreen;
