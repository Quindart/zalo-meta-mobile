import React, { useCallback } from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Ionicons, AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { RootStackParamList } from "@/navigation/type";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { ROUTING } from "@/utils/constant";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import styles from './style'

const ChatHeader = React.memo(({ item }: { item: any }) => {


  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const currentUserId = useSelector((state: RootState) => state.user.user?.id);

  const handleOptionsPress = useCallback(() => {
    if (item?.type === "group") {
      navigation.navigate(ROUTING.OPTION_GROUP, { itemGroup: item });
    } else if (item?.type === "direct") {
      const friend = item.members?.find(
        (mem: any) => mem.userId !== currentUserId
      );
      if (friend && friend.user) {
        navigation.navigate(ROUTING.OPTION_FRIEND, { itemFriend: friend.user });
      } else {
        alert("Không tìm thấy thông tin bạn bè");
      }
    }
  }, [item, currentUserId]);

  return (
    <LinearGradient
      colors={["#1E88E5", "#42A5F5"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.header}
    >
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.iconButton}
      >
        <AntDesign name="arrowleft" size={20} color="white" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>{item.name || "Chat"}</Text>
      <View style={styles.headerIcons}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="call-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="videocam-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={handleOptionsPress}
        >
          <AntDesign name="bars" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
});

export default ChatHeader;
