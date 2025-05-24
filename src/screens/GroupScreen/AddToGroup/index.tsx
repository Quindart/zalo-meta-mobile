import React, { useEffect, useMemo, useState, useCallback } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/type";
import { useFriend } from "@/hooks/useFriend";
import { useChat } from "@/hooks/useChat";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { styles } from "./style";
import { ROUTING } from "@/utils/constant";

interface Friend {
  id: string;
  name: string;
  phone?: string;
  avatar?: string;
}

const AddToGroupScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<RouteProp<RootStackParamList, typeof ROUTING.ADD_TO_GROUP>>();
  const itemGroup = (route.params as { itemGroup: any })?.itemGroup;

  const user = useSelector((state: RootState) => state.user.user);
  const currentChannel = useSelector(
    (state: RootState) => state.user.currentChannel
  );

  const { getListFriends, listFriends } = useFriend(user?.id || "");
  const { addMember, loadChannel } = useChat(user?.id || "");

  const [selected, setSelected] = useState<string[]>([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getListFriends();
  }, []);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const filteredFriends = useMemo(() => {
    const memberIds = currentChannel?.members?.map((m: any) => m.userId) || [];
    return listFriends
      .filter((f) => !memberIds.includes(f.id) && f.id !== user?.id)
      .filter(
        (f) =>
          f.name.toLowerCase().includes(query.toLowerCase()) ||
          f.phone?.includes(query)
      );
  }, [listFriends, currentChannel?.members, query, user?.id]);

  const handleAddMembers = useCallback(async () => {
    for (const userId of selected) {
      addMember(currentChannel.id, userId);
    }
    loadChannel(currentChannel.id); // cập nhật lại channel
    navigation.goBack();
  }, [selected, currentChannel?.id]);

  const renderItem = ({ item }: { item: Friend }) => (
    <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.id)}>
      <Image
        source={{
          uri:
            item.avatar ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png",
        }}
        style={styles.avatar}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      <View style={styles.radio}>
        {selected.includes(item.id) && <View style={styles.dot} />}
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>Thêm vào nhóm</Text>
          <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
        </View>
      </View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#aaa" />
        <TextInput
          style={styles.searchInput}
          placeholder="Tìm tên hoặc số điện thoại"
          value={query}
          onChangeText={setQuery}
        />
        <Text style={styles.counter}>{filteredFriends.length}</Text>
      </View>

      <FlatList
        data={filteredFriends}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Không có bạn bè phù hợp
          </Text>
        }
      />

      {selected.length > 0 && (
        <TouchableOpacity style={styles.addButton} onPress={handleAddMembers}>
          <Text style={styles.addButtonText}>Thêm vào nhóm</Text>
        </TouchableOpacity>
      )}
    </SafeAreaView>
  );
};

export default AddToGroupScreen;
