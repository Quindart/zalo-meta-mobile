import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

const Profile = () => {
    const navigation = useNavigation();
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
                            source={{ uri: 'https://cdnv2.tgdd.vn/mwg-static/common/News/1569295/tho-7-mau-1-2-0.jpg' }} // Placeholder cho avatar
                            style={styles.avatar}
                        />
                        <Text style={styles.profileName}>Đào Tạo Hiệu</Text>
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
                    <Text style={styles.infoLabel}>Giới tính</Text>
                    <Text style={styles.infoValue}>Nam</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Ngày sinh</Text>
                    <Text style={styles.infoValue}>11/12/2000</Text>
                </View>

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Điện thoại</Text>
                    <View>
                        <Text style={styles.infoValue}>+84 961 074 946</Text>
                    </View>
                </View>

                {/* Nút Chỉnh sửa */}
                <TouchableOpacity style={styles.editButton}>
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
});

export default Profile;