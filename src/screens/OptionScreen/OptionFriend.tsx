import React from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ScrollView, StyleSheet, StatusBar } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';

const OptionFriend = () => {
    const menuOptions = [
        { id: '1', title: 'Đổi tên gợi nhớ', icon: 'pencil' },
        { id: '3', title: 'Nhật ký chung', icon: 'time' },
        { id: '4', title: 'Ảnh, file, link', icon: 'images' },
    ];

    const mediaItems = [
        { id: '1', uri: 'https://via.placeholder.com/100' },
        { id: '2', uri: 'https://via.placeholder.com/100' },
        { id: '3', uri: 'https://via.placeholder.com/100' },
    ];

    const sharedGroups = [
        { id: '1', name: 'Nhóm chung 1' },
        { id: '2', name: 'Nhóm chung 2' },
    ];

    return (
        <View style={{ flex: 1 }}>
            <Header title='Tùy chọn'></Header>
            <ScrollView style={styles.container}>
                {/* Profile Section */}
                <View style={styles.profileSection}>
                    <Image
                        source={{ uri: 'https://i1.sndcdn.com/artworks-ebqbJNoRi9lD4ySF-49rsMw-t500x500.jpg' }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.profileName}>Vũ Quốc Huy</Text>
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
                    {menuOptions.map((item) => (
                        <TouchableOpacity key={item.id} style={styles.menuItem}>
                            <Ionicons name={item.icon} size={24} color="gray" style={styles.menuIcon} />
                            <Text style={styles.menuText}>{item.title}</Text>
                            <Ionicons name="chevron-forward" size={24} color="gray" style={styles.toggleIcon} />
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Group Actions */}
                <View style={styles.groupSection}>
                    <TouchableOpacity style={styles.groupItem}>
                        <Ionicons name="people" size={24} color="gray" style={styles.groupIcon} />
                        <Text style={styles.groupText}>Tạo nhóm với Vũ Quốc Huy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.groupItem}>
                        <Ionicons name="person-add" size={24} color="gray" style={styles.groupIcon} />
                        <Text style={styles.groupText}>Thêm vào nhóm</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.groupSection}>
                    <TouchableOpacity style={[styles.groupItem]}>
                        <MaterialIcons name="delete-outline" size={24} color="red" style={styles.groupIcon} />
                        <Text style={[styles.groupText, { color: 'red' }]}>Xóa lịch sử trò chuyện</Text>
                    </TouchableOpacity>

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
        width: 80,
        height: 80,
        borderRadius: 40,
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

export default OptionFriend;