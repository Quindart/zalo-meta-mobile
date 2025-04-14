import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import Header from '@/components/ui/Header';
import { white } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';


const FriendRequestScreen = () => {

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Lời mời kết bạn'></Header>

            {/* Tabs */}
            <View style={styles.tabs}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={[styles.tabText, styles.activeTabText]}>Đã nhận</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Đã gửi</Text>
                </TouchableOpacity>
            </View>

            {/* Timestamp */}
            <Text style={styles.timestamp}>Tháng 04, 2025</Text>

            {/* Friend Request Item */}
            <View style={styles.requestCard}>
                <View style={styles.requestHeader}>
                    {/* Avatar */}
                    <Image
                        source={{ uri: 'https://i.pinimg.com/736x/34/31/56/343156de11f1fc645ae708e5b40e57d4.jpg' }} // Placeholder image
                        style={styles.avatar}
                    />
                    <View style={styles.requestInfo}>
                        <Text style={styles.requestName}>Anh Hồ Trọng Viễn</Text>
                        <Text style={styles.requestCategory}>Business</Text>
                    </View>
                </View>
                <Text style={styles.requestSource}>STUDY4 1 ngày trước • Tìm kiếm số điện thoại</Text>
                <View style={styles.requestMessageContainer}>
                    <Text style={styles.requestMessage}>
                        Xin chào, mình là Anh Hồ Trọng Viễn. Minh tìm thấy bạn bằng số ... Xem thêm
                    </Text>
                </View>
                <View style={styles.requestButtons}>
                    <TouchableOpacity style={[styles.button, styles.declineButton]}>
                        <Text style={styles.buttonText}>TỪ CHỐI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.acceptButton]}>
                        <Text style={[styles.buttonText, { color: 'white' }]}>ĐỒNG Ý</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1e90ff',
        padding: 10,
    },
    headerTitle: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabs: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#1e90ff',
    },
    tabText: {
        fontSize: 16,
        color: '#666',
    },
    activeTabText: {
        color: '#1e90ff',
        fontWeight: 'bold',
    },
    timestamp: {
        fontSize: 14,
        color: '#666',
        marginVertical: 10,
        marginHorizontal: 15,
    },
    requestCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 8,
        elevation: 2,
    },
    requestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    requestInfo: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    requestName: {
        fontSize: 16,
        fontWeight: 500,
    },
    requestCategory: {
        fontSize: 12,
        color: '#1e90ff',
        backgroundColor: '#e6f0ff',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    requestSource: {
        fontSize: 12,
        color: '#666',
        marginVertical: 5,
        marginLeft: 50, // Align with the name (avatar width + margin)
    },
    requestMessageContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginVertical: 10,
    },
    requestMessage: {
        fontSize: 14,
        color: '#333',
    },
    requestButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        flex: 1,
        paddingVertical: 10,
        borderRadius: 20,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    declineButton: {
        backgroundColor: '#f0f0f0',
    },
    acceptButton: {
        backgroundColor: '#1e90ff',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
    },
});

export default FriendRequestScreen;