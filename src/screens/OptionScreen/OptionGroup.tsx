import React, { useEffect, useCallback } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import {
  Ionicons,
  MaterialIcons,
  AntDesign,
  MaterialCommunityIcons,
  Entypo,
} from "@expo/vector-icons";
import Header from "@/components/ui/Header";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "@/navigation/type";
import { ROUTING } from "@/utils/constant";
import useUser from "@/hooks/useUser";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useChat } from "@/hooks/useChat";
import { optionGroupStyles } from "./style";

const OptionGroup = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const user = useSelector((state: RootState) => state.user.user);
  const currentChannel = useSelector(
    (state: RootState) => state.user.currentChannel
  );
  const { leaveRoom, dissolveGroup, loadChannel } = useChat(user?.id || "");
  const { handleGetUserById } = useUser();

  // Sample data for menu options
  const menuOptions = [
    { id: "1", title: "Lịch nhóm", icon: "calendar" },
    { id: "4", title: "Bình chọn", icon: "barschart" },
  ];

  // Check if current user is captain
  const isCaptain = () => {
    return currentChannel?.members?.some(
      (member: any) => member.userId === user?.id && member.role === "captain"
    );
  };

  useFocusEffect(
    useCallback(() => {
      if (currentChannel?.id) {
        loadChannel(currentChannel.id);
      }
    }, [currentChannel?.id])
  );

  return (
    <View style={{ flex: 1 }}>
      <Header title="Tùy chọn"></Header>
      <ScrollView style={optionGroupStyles.container}>
        {/* Profile Section */}
        <View style={optionGroupStyles.profileSection}>
          <Image
            source={{ uri: currentChannel?.avatar }}
            style={optionGroupStyles.profileImage}
          />
          <Text style={optionGroupStyles.profileName}>{currentChannel?.name}</Text>
          <View style={optionGroupStyles.navIcons}>
            <TouchableOpacity style={optionGroupStyles.navIcon}>
              <View style={optionGroupStyles.iconContainer}>
                <Ionicons name="search" size={24} color="#818181" />
              </View>
              <Text style={optionGroupStyles.navText}>Tìm tin nhắn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={optionGroupStyles.navIcon}>
              <View style={optionGroupStyles.iconContainer}>
                <Ionicons name="person" size={24} color="#818181" />
              </View>
              <Text style={optionGroupStyles.navText}>Trang cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity style={optionGroupStyles.navIcon}>
              <View style={optionGroupStyles.iconContainer}>
                <Ionicons name="color-palette" size={24} color="#818181" />
              </View>
              <Text style={optionGroupStyles.navText}>Đổi hình nền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={optionGroupStyles.navIcon}>
              <View style={optionGroupStyles.iconContainer}>
                <Ionicons name="notifications-off" size={24} color="#818181" />
              </View>
              <Text style={optionGroupStyles.navText}>Tắt thông báo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options */}
        <View style={optionGroupStyles.menuSection}>
          <FlatList
            data={menuOptions}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={optionGroupStyles.menuItem}>
                <AntDesign
                  name={item.icon}
                  size={24}
                  color="gray"
                  style={optionGroupStyles.menuIcon}
                />
                <Text style={optionGroupStyles.menuText}>{item.title}</Text>
              </TouchableOpacity>
            )}
            scrollEnabled={false}
          />
        </View>

        {/* Group Actions */}
        <View style={optionGroupStyles.groupSection}>
          <TouchableOpacity
            style={optionGroupStyles.groupItem}
            onPress={() =>
              navigation.navigate(ROUTING.MEMBER_MANAGEMENT_SCREEN, {
                itemGroup: currentChannel,
              })
            }
          >
            <Ionicons
              name="people"
              size={24}
              color="gray"
              style={optionGroupStyles.groupIcon}
            />
            <Text style={optionGroupStyles.groupText}>Xem thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity style={optionGroupStyles.groupItem}>
            <Ionicons
              name="person-add"
              size={24}
              color="gray"
              style={optionGroupStyles.groupIcon}
            />
            <Text style={optionGroupStyles.groupText}>Duyệt thành viên</Text>
          </TouchableOpacity>
          <TouchableOpacity style={optionGroupStyles.groupItem}>
            <MaterialCommunityIcons
              name="link-variant"
              size={24}
              color="gray"
              style={optionGroupStyles.groupIcon}
            />
            <Text style={optionGroupStyles.groupText}>Link nhóm</Text>
          </TouchableOpacity>
        </View>

        <View style={optionGroupStyles.groupSection}>
          <TouchableOpacity style={[optionGroupStyles.groupItem]}>
            <MaterialIcons
              name="delete-outline"
              size={24}
              color="red"
              style={optionGroupStyles.groupIcon}
            />
            <Text style={[optionGroupStyles.groupText, { color: "red" }]}>Xóa lịch sử trò chuyện</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[optionGroupStyles.groupItem]}
            onPress={() => {
              leaveRoom(currentChannel.id);
              navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
            }}
          >
            <Entypo
              name="log-out"
              size={24}
              color="red"
              style={optionGroupStyles.groupIcon}
            />
            <Text style={[optionGroupStyles.groupText, { color: "red" }]}>Rời nhóm</Text>
          </TouchableOpacity>
          {isCaptain() && (
            <TouchableOpacity
              style={[optionGroupStyles.groupItem]}
              onPress={() => {
                dissolveGroup(currentChannel.id);
                navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
              }}
            >
              <Ionicons
                name="alert-circle-outline"
                size={24}
                color="red"
                style={optionGroupStyles.groupIcon}
              />
              <Text style={[optionGroupStyles.groupText, { color: "red" }]}>Giải tán nhóm</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OptionGroup;