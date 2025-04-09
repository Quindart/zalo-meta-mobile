import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';


const Profile = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const user = useSelector((state: RootState) => state.user.user);

    const formatDate = (isoDate: string) => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    if (!user) {
        return (
            <View style={styles.container}>
                <Text style={styles.error}>Bạn chưa đăng nhập!</Text>
                <Button
                    title="Đi đến màn hình đăng nhập"
                    onPress={() => navigation.navigate(ROUTING.HOME)}
                />
            </View>
        );
    }
    return (
        <SafeAreaView style={styles.container}>
            {/* Phần ảnh nền và thông tin cá nhân */}
            <View>
                <View style={styles.headerSection}>
                    <Image
                        source={{ uri: 'https://media.fmplus.com.vn/uploads/tin-tuc-thoi-trang/mau-xanh-nuoc-bien/mau-xanh-nuoc-bien-la-gi-theo-vat-ly.jpg' }} // Placeholder cho ảnh nền
                        style={styles.backgroundImage}
                    />
                    <View style={styles.avatarContainer}>
                        <Image
                            source={{ uri: user.avatar }}
                            style={styles.avatar}
                        />
                        <Text style={styles.profileName}>{user.firstName} {user.lastName}</Text>
                    </View>
                    <TouchableOpacity style={{ position: 'absolute', top: 10, left: 10 }} onPress={() => navigation.goBack()} >
                        <AntDesign name="arrowleft" size={26} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Phần thông tin chi tiết */}
            <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>THÔNG TIN CÁ NHÂN</Text>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày sinh</Text>
                    <Text style={styles.infoValue}>{formatDate(user.dateOfBirth)}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Email</Text>
                    <Text style={styles.infoValue}>{user.email}</Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Điện thoại</Text>
                    <View>
                        <Text style={styles.infoValue}>{user.phone}</Text>
                    </View>
                </View>

                {/* Nút Chỉnh sửa */}
                <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate(ROUTING.UPDATE_PROFILE)}>
                    <FontAwesome name="pencil" size={16} color="#333" style={styles.editIcon} />
                    <Text style={styles.editButtonText}>Chỉnh sửa</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    headerSection: {
        position: 'relative',
        height: 200,
        backgroundColor: '#0D7DC9',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        opacity: 0.5, // Làm mờ ảnh nền
    },
    avatarContainer: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        alignItems: 'center',
        flexDirection: 'row',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#fff',
        marginRight: 15,
    },
    profileName: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: '700',
        color: '#fff',
        textShadowColor: 'rgba(0, 0, 0, 0.5)', // Tạo bóng chữ để dễ đọc trên ảnh nền
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    infoSection: {
        // marginTop: 50,
        padding: 20,
        backgroundColor: '#fff',
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    infoRow: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    infoLabel: {
        width: 100,
        fontSize: 14,
        color: '#666',
    },
    infoValue: {
        flex: 1,
        fontSize: 14,
        color: '#333',
    },
    infoNote: {
        fontSize: 12,
        color: '#999',
        marginTop: 5,
    },
    editButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f0f0f0',
        paddingVertical: 10,
        borderRadius: 20,
        marginTop: 20,
    },
    editIcon: {
        marginRight: 5,
    },
    editButtonText: {
        fontSize: 14,
        color: '#333',
    },
    error: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default Profile;