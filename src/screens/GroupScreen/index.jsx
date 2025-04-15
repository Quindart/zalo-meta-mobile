import React from 'react';
import { View, Text, FlatList, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons for icons

// Sample data for the conversation list
const conversations = [
    { id: '1', name: 'Tiền Hoang', time: '11 giờ trước', avatar: 'https://via.placeholder.com/50' },
    { id: '2', name: 'Nguyễn Ngọc Lân', time: '11 giờ trước', avatar: 'https://via.placeholder.com/50' },
    { id: '3', name: 'Vũ Quốc Huy - Công nghệ mới', time: '1 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '4', name: 'Lê Minh Quang - Công nghệ mới', time: '1 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '5', name: 'Nguyễn Hoàng Khôi', time: '2 ngày trước', avatar: 'https://via.placeholder.com/50', initial: 'NK' },
    { id: '6', name: 'Minh Dương', time: '2 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '7', name: 'Tân Mật Thít', time: '2 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '8', name: 'Võ Văn Vĩ', time: '3 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '9', name: 'Bà Hậu', time: '3 ngày trước', avatar: 'https://via.placeholder.com/50' },
    { id: '10', name: 'BNN', time: '08/04', avatar: 'https://via.placeholder.com/50', initial: 'BNN' },
];

const GroupScreen = () => {

    const renderItem = ({ item }) => (
        <View style={styles.conversationItem}>
            {item.initial ? (
                <View style={[styles.avatar, { backgroundColor: item.initial === 'NK' ? '#d946ef' : '#f97316' }]}>
                    <Text style={styles.initialText}>{item.initial}</Text>
                </View>
            ) : (
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
            )}
            <View style={styles.conversationInfo}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.unreadIndicator} />
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Nhóm mới</Text>
                <Text style={styles.selectedCount}>Đã chọn: 0</Text>
            </View>

            {/* Group Creation Button */}
            <TouchableOpacity style={styles.createGroupButton}>
                <Text style={styles.createGroupText}>Đặt tên nhóm</Text>
            </TouchableOpacity>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm tên học số điện thoại"
                    placeholderTextColor="#999"
                />
                <Text style={styles.searchCount}>123</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
                <Text style={styles.tabActive}>GẦN ĐÂY</Text>
                <Text style={styles.tab}>DANH BẠ</Text>
            </View>

            {/* Conversation List */}
            <FlatList
                data={conversations}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    backArrow: {
        fontSize: 24,
        marginRight: 10,
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 10,
    },
    selectedCount: {
        fontSize: 14,
        color: '#666',
    },
    createGroupButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    createGroupText: {
        fontSize: 16,
        color: '#000',
        marginLeft: 10,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        backgroundColor: '#f0f0f0',
        margin: 10,
        borderRadius: 20,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#000',
    },
    searchCount: {
        fontSize: 14,
        color: '#666',
        backgroundColor: '#ddd',
        paddingHorizontal: 8,
        paddingVertical: 2,
        borderRadius: 10,
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    tab: {
        fontSize: 14,
        color: '#666',
    },
    tabActive: {
        fontSize: 14,
        color: '#000',
        fontWeight: 'bold',
    },
    list: {
        flex: 1,
    },
    conversationItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    initialText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
    },
    conversationInfo: {
        flex: 1,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    time: {
        fontSize: 12,
        color: '#666',
        marginRight: 10,
    },
    unreadIndicator: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#666',
    },
});


export default GroupScreen;
