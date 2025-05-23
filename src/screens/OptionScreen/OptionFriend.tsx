import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import Header from "@/components/ui/Header";

import { friendStyles } from "./style";
const menuOptions = [
  { id: "1", title: "Đổi tên gợi nhớ", icon: "pencil" },
  { id: "3", title: "Nhật ký chung", icon: "time" },
  { id: "4", title: "Ảnh, file, link", icon: "images" },
];

const mediaItems = [
  { id: "1", uri: "https://via.placeholder.com/100" },
  { id: "2", uri: "https://via.placeholder.com/100" },
  { id: "3", uri: "https://via.placeholder.com/100" },
];

const sharedGroups = [
  { id: "1", name: "Nhóm chung 1" },
  { id: "2", name: "Nhóm chung 2" },
];

const OptionFriend = () => {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Tùy chọn"></Header>
      <ScrollView style={friendStyles.container}>
        {/* Profile Section */}
        <View style={friendStyles.profileSection}>
          <Image
            source={{
              uri: "https://i1.sndcdn.com/artworks-ebqbJNoRi9lD4ySF-49rsMw-t500x500.jpg",
            }}
            style={friendStyles.profileImage}
          />
          <Text style={friendStyles.profileName}>Vũ Quốc Huy</Text>
          <View style={friendStyles.navIcons}>
            <TouchableOpacity style={friendStyles.navIcon}>
              <View style={friendStyles.iconContainer}>
                <Ionicons name="search" size={24} color="#818181" />
              </View>
              <Text style={friendStyles.navText}>Tìm tin nhắn</Text>
            </TouchableOpacity>
            <TouchableOpacity style={friendStyles.navIcon}>
              <View style={friendStyles.iconContainer}>
                <Ionicons name="person" size={24} color="#818181" />
              </View>
              <Text style={friendStyles.navText}>Trang cá nhân</Text>
            </TouchableOpacity>
            <TouchableOpacity style={friendStyles.navIcon}>
              <View style={friendStyles.iconContainer}>
                <Ionicons name="color-palette" size={24} color="#818181" />
              </View>
              <Text style={friendStyles.navText}>Đổi hình nền</Text>
            </TouchableOpacity>
            <TouchableOpacity style={friendStyles.navIcon}>
              <View style={friendStyles.iconContainer}>
                <Ionicons name="notifications-off" size={24} color="#818181" />
              </View>
              <Text style={friendStyles.navText}>Tắt thông báo</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Options */}
        <View style={friendStyles.menuSection}>
          {menuOptions.map((item) => (
            <TouchableOpacity key={item.id} style={friendStyles.menuItem}>
              <Ionicons
                name={item.icon}
                size={24}
                color="gray"
                style={friendStyles.menuIcon}
              />
              <Text style={friendStyles.menuText}>{item.title}</Text>
              <Ionicons
                name="chevron-forward"
                size={24}
                color="gray"
                style={friendStyles.toggleIcon}
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Group Actions */}
        <View style={friendStyles.groupSection}>
          <TouchableOpacity style={friendStyles.groupItem}>
            <Ionicons
              name="people"
              size={24}
              color="gray"
              style={friendStyles.groupIcon}
            />
            <Text style={friendStyles.groupText}>Tạo nhóm với Vũ Quốc Huy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={friendStyles.groupItem}>
            <Ionicons
              name="person-add"
              size={24}
              color="gray"
              style={friendStyles.groupIcon}
            />
            <Text style={friendStyles.groupText}>Thêm vào nhóm</Text>
          </TouchableOpacity>
        </View>

        <View style={friendStyles.groupSection}>
          <TouchableOpacity style={[friendStyles.groupItem]}>
            <MaterialIcons
              name="delete-outline"
              size={24}
              color="red"
              style={friendStyles.groupIcon}
            />
            <Text style={[friendStyles.groupText, { color: "red" }]}>
              Xóa lịch sử trò chuyện
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default OptionFriend;
