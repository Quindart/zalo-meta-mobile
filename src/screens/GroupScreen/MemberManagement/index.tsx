import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Modal,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "@/navigation/type";
import { ROUTING } from "@/utils/constant";
import useUser from "@/hooks/useUser";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { useChat } from "@/hooks/useChat";
import { setCurrentChannel } from "@/redux/userSlice";
import { useDispatch } from "react-redux";
import { styles } from "./style";

const TABS = ["Tất cả", "Trưởng và phó nhóm", "Đã mời", "Đã chặn"];

const MemberManagementScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const route =
    useRoute<
      RouteProp<RootStackParamList, typeof ROUTING.MEMBER_MANAGEMENT_SCREEN>
    >();

  //TODO: itemGroup lấy từ route params => chính là channel hiện tại
  const params = route.params as { itemGroup: any };
  const { itemGroup } = params;

  //TODO: State
  const currentUser = useSelector((state: RootState) => state.user.user);
  const { handleGetUserById } = useUser();
  const { assignRole, removeMember, loadChannel, channel } = useChat(
    currentUser?.id || ""
  );
  const [selectedTab, setSelectedTab] = useState("Tất cả");
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [showOptions, setShowOptions] = useState(false);
  const [listMemberGroup, setListMemberGroup] = useState<any[]>([]);

  const currentUserRole = useMemo(() => {
    if (!itemGroup || !currentUser || !itemGroup.members) return null;
    const member = itemGroup.members.find(
      (m: any) => m.userId === currentUser.id
    );
    return member?.role || null;
  }, [itemGroup, currentUser]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!channel && currentUser?.id) {
      loadChannel(currentUser.id);
    }

    if (channel && channel.members) {
      dispatch(setCurrentChannel(channel));
    }
  }, [channel, currentUser?.id]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const updatedMembers = await Promise.all(
          itemGroup.members.map(async (member: any) => {
            const user = await handleGetUserById(member.userId);
            return user ? { ...member, user } : null;
          })
        );
        updatedMembers.map((mem) => {
          return setListMemberGroup((pre) => [...pre, mem]);
        });
      } catch (error) {
        console.error("Error fetching member data:", error);
      }
    };
    fetchUserData();
  }, [itemGroup]);

  const handleOpenOptions = (member: any) => {
    if (member.userId === currentUser?.id || member.role === "captain") return;
    setSelectedMember(member);
    setShowOptions(true);
  };

  const handleAssignRole = (newRole: "sub_captain" | "captain") => {
    if (selectedMember) {
      assignRole({
        channelId: itemGroup.id,
        userId: currentUser?.id || "",
        targetUserId: selectedMember.userId,
        newRole,
      });
      setShowOptions(false);
    }
  };

  const handleRemoveMember = () => {
    if (selectedMember) {
      Alert.alert("Xác nhận", "Bạn có chắc muốn xoá người này khỏi nhóm?", [
        { text: "Huỷ", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: () => {
            removeMember(
              itemGroup.id,
              currentUser?.id || "",
              selectedMember.userId
            );
            setShowOptions(false);
            navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
          },
        },
      ]);
    }
  };

  const renderMember = ({ item }: any) => {
    return (
      <Pressable
        style={styles.memberItem}
        onPress={() => handleOpenOptions(item)}
      >
        <Image
          source={{ uri: item?.user?.avatar ?? "" }}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Text
            style={styles.name}
          >{`${item?.user.lastName} ${item?.user?.firstName}`}</Text>
          <Text style={styles.role}>{item.role}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quản lý thành viên</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate(ROUTING.ADD_TO_GROUP, { itemGroup })
            }
          >
            <Ionicons
              name="person-add"
              size={22}
              color="#fff"
              style={{ marginRight: 16 }}
            />
          </TouchableOpacity>
          <Ionicons name="search" size={22} color="#fff" />
        </View>
      </View>

      <FlatList
        data={listMemberGroup}
        keyExtractor={(item) => item.userId}
        renderItem={renderMember}
        contentContainerStyle={{ paddingBottom: 20 }}
      />

      <Modal
        visible={showOptions}
        transparent
        animationType="slide"
        onRequestClose={() => setShowOptions(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setShowOptions(false)}
        >
          <Pressable
            style={styles.modalContent}
            onPress={(e) => e.stopPropagation()}
          >
            <Text style={styles.modalTitle}>Thông tin thành viên</Text>
            <View style={styles.modalProfileRow}>
              <Image
                source={{ uri: selectedMember?.user?.avatar }}
                style={styles.modalAvatar}
              />
              <Text style={styles.modalName}>{`${
                selectedMember?.user?.lastName || ""
              } ${selectedMember?.user?.firstName || ""}`}</Text>
            </View>
            <TouchableOpacity style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Xem trang cá nhân</Text>
            </TouchableOpacity>
            {currentUserRole === "captain" && (
              <>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleAssignRole("captain")}
                >
                  <Text style={styles.modalOptionText}>
                    Bổ nhiệm làm trưởng nhóm
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalOption}
                  onPress={() => handleAssignRole("sub_captain")}
                >
                  <Text style={styles.modalOptionText}>
                    Bổ nhiệm làm phó nhóm
                  </Text>
                </TouchableOpacity>
              </>
            )}
            {(currentUserRole === "captain" ||
              currentUserRole === "sub_captain") && (
              <TouchableOpacity
                style={styles.modalOption}
                onPress={handleRemoveMember}
              >
                <Text style={[styles.modalOptionText, { color: "red" }]}>
                  Xóa khỏi nhóm
                </Text>
              </TouchableOpacity>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
};

export default MemberManagementScreen;
