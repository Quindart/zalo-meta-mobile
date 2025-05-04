import React, { useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons'; // Using Ionicons for icons
import Header from '@/components/ui/Header';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import { RouteProp, useRoute } from '@react-navigation/native';
import useUser from '@/hooks/useUser';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { useChat } from '@/hooks/useChat';




const OptionGroup = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    type OptionGroupProp = RouteProp<RootStackParamList, typeof ROUTING.OPTION_GROUP>;
    const route = useRoute<OptionGroupProp>();
    const itemGroup = route.params as { itemGroup: any };
    const { handleGetUserById } = useUser();
    const user = useSelector((state: RootState) => state.user.user);
    const currentChannel = useSelector((state: RootState) => state.user.currentChannel);
    const { leaveRoom, dissolveGroup, channel, loadChannel } = useChat(user?.id || '');

    // Sample data for menu options
    const menuOptions = [
        { id: '1', title: 'Lịch nhóm', icon: 'calendar' },
        // { id: '3', title: 'Tin nhắn đã ghim', icon: 'pushpino' },
        { id: '4', title: 'Bình chọn', icon: 'barschart' },
    ];


    // kiểm tra user có trong danh sách thành viên không
    const isCaptain = () => {
        return itemGroup.itemGroup.members.some((member: any) => member.userId === user?.id && member.role === 'captain');
    }

    const dispatch = useDispatch();


    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const membersWithInfo: any[] = [];

                for (const member of itemGroup.itemGroup.members) {
                    const user = await handleGetUserById(member.userId);
                    if (user) {
                        membersWithInfo.push({ ...member, user });
                    }
                }
            } catch (error) {
                console.error('❌ Error fetching user data:', error);
            }
        };

        fetchUserData();
        // console.log("Members hehe: ", itemGroup.itemGroup.members);
        // console.log("Members: ", currentChannel.members);
    }, []);


    return (
        <View style={{ flex: 1 }}>
            <Header title='Tùy chọn'></Header>
            <ScrollView style={styles.container}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: currentChannel.avatar }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>{currentChannel.name}</Text>
                    <View style={styles.navIcons}>
                        <TouchableOpacity style={styles.navIcon}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="search" size={24} color="#818181" />
                            </View>
                            <Text style={styles.navText}>Tìm tin nhắn</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navIcon}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="person" size={24} color="#818181" />
                            </View>
                            <Text style={styles.navText}>Trang cá nhân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navIcon}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="color-palette" size={24} color="#818181" />
                            </View>
                            <Text style={styles.navText}>Đổi hình nền</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.navIcon}>
                            <View style={styles.iconContainer}>
                                <Ionicons name="notifications-off" size={24} color="#818181" />
                            </View>
                            <Text style={styles.navText}>Tắt thông báo</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Menu Options */}
                <View style={styles.menuSection}>
                    <FlatList
                        data={menuOptions}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.menuItem}>
                                <AntDesign name={item.icon} size={24} color="gray" style={styles.menuIcon} />
                                <Text style={styles.menuText}>{item.title}</Text>
                            </TouchableOpacity>
                        )}
                        scrollEnabled={false}
                    />
                </View>


                {/* Group Actions */}
                <View style={styles.groupSection}>
                    <TouchableOpacity style={styles.groupItem} onPress={() => navigation.navigate(ROUTING.MEMBER_MANAGEMENT_SCREEN, itemGroup)}>
                        <Ionicons name="people" size={24} color="gray" style={styles.groupIcon} />
                        <Text style={styles.groupText}>Xem thành viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupItem}>
                        <Ionicons name="person-add" size={24} color="gray" style={styles.groupIcon} />
                        <Text style={styles.groupText}>Duyệt thành viên</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupItem}>
                        <MaterialCommunityIcons name="link-variant" size={24} color="gray" style={styles.groupIcon} />
                        <Text style={styles.groupText}>Link nhóm</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.groupSection}>
                    <TouchableOpacity style={[styles.groupItem]}>
                        <MaterialIcons name="delete-outline" size={24} color="red" style={styles.groupIcon} />
                        <Text style={[styles.groupText, { color: 'red' }]}>Xóa lịch sử trò chuyện</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.groupItem]} onPress={() => { leaveRoom(itemGroup.itemGroup.id), navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION) }}>
                        <Entypo name="log-out" size={24} color="red" style={styles.groupIcon} />
                        <Text style={[styles.groupText, { color: 'red' }]}>Rời nhóm</Text>
                    </TouchableOpacity>
                    {isCaptain() && (
                        <TouchableOpacity style={[styles.groupItem]} onPress={() => { dissolveGroup(itemGroup.itemGroup.id), navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION) }}>
                            <Ionicons name="alert-circle-outline" size={24} color="red" style={styles.groupIcon} />
                            <Text style={[styles.groupText, { color: 'red' }]}>Giải tán nhóm</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',

    },
    profileSection: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    profileImage: {
        width: 90,
        height: 90,
        borderRadius: 50,
        marginBottom: 10,
    },
    profileName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 30,
    },
    navIcons: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
    },
    iconContainer: {
        borderRadius: 50, backgroundColor: '#F0F0F0', padding: 8
    },
    navIcon: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 13,
        color: 'black',
        marginTop: 5,
        width: 72,
        textAlign: 'center',
    },
    menuSection: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    menuIcon: {
        marginRight: 10,
    },
    menuText: {
        flex: 1,
        fontSize: 16,
    },
    toggleIcon: {
        marginLeft: 10,
    },
    mediaSection: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        paddingLeft: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    mediaItem: {
        width: 100,
        height: 100,
        marginRight: 10,
        borderRadius: 5,
    },
    mediaArrow: {
        padding: 10,
    },
    groupSection: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    groupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE',
    },
    groupIcon: {
        marginRight: 10,
    },
    groupText: {
        fontSize: 16,
    },
    sharedGroupsSection: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingHorizontal: 15,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        paddingVertical: 10,
    },
    sharedGroupItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
});

export default OptionGroup;

