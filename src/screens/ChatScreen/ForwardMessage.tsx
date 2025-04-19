
import React, { useState } from 'react';
import {
    SafeAreaView,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    StatusBar,
    ScrollView,
} from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const ForwardMessage = () => {
    const [selected, setSelected] = useState<string[]>([]);

    const recentContacts = [
        { id: '1', name: 'Cloud của tôi', avatar: '', verified: true },
        { id: '2', name: 'Vũ Quốc Huy - Công nghệ mới', avatar: '' },
        { id: '3', name: 'Nhóm 11 Công Nghệ Mới', avatar: '', memberCount: 5 },
        { id: '4', name: 'Lê Minh Quang - Công nghệ mới', avatar: '' },
        { id: '5', name: 'Chị Thùy', avatar: '' },
    ];

    const conversationGroups = [
        { id: '6', name: '12TN1 2020 - 2021', avatar: '' },
        { id: '7', name: '12TN1 Lý', avatar: '', memberCount: 23 },
    ];

    const toggleSelect = (id: string) => {
        setSelected((prev) =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const renderContact = ({ item }) => (
        <TouchableOpacity style={styles.contactItem} onPress={() => toggleSelect(item.id)}>
            <View style={styles.contactInfo}>
                <View style={styles.avatarContainer}>
                    <Image
                        source={{ uri: 'https://cdnv2.tgdd.vn/mwg-static/common/News/1569295/tho-7-mau-1-2-0.jpg' }}
                        style={styles.avatar}
                    />
                    {item.verified && (
                        <View style={styles.verifiedBadge}>
                            <FontAwesome name="check" size={10} color="#fff" />
                        </View>
                    )}
                    {item.memberCount && (
                        <View style={styles.memberCountBadge}>
                            <Text style={styles.memberCountText}>{item.memberCount}</Text>
                        </View>
                    )}
                </View>
                <Text style={styles.contactName}>{item.name}</Text>
            </View>
            <View style={styles.checkCircle}>
                {selected.includes(item.id) && <View style={styles.innerCheck} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#f0f0f0" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Chia sẻ</Text>
                    <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
                </View>
            </View>

            {/* Search bar */}
            <View style={{ backgroundColor: '#fff', height: 70, marginBottom: 8 }}>
                <View style={styles.searchBar}>
                    <Ionicons name="search" size={20} color="#999" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Tìm kiếm"
                        placeholderTextColor="#999"
                    />
                </View>
            </View>

            {/* Quick actions */}
            <View style={styles.quickActions}>
                <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="people" size={24} color="#333" />
                        <View style={styles.addBadge}>
                            <Text style={styles.addText}>+</Text>
                        </View>
                    </View>
                    <Text style={styles.actionText}>Nhóm mới</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="time-outline" size={24} color="#333" />
                    </View>
                    <Text style={styles.actionText}>Nhật ký</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionItem}>
                    <View style={styles.actionIcon}>
                        <Ionicons name="share-outline" size={24} color="#333" />
                    </View>
                    <Text style={styles.actionText}>App khác</Text>
                </TouchableOpacity>
            </View>

            <ScrollView>
                {/* Recent contacts */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Gần đây</Text>
                    <FlatList
                        data={recentContacts}
                        renderItem={renderContact}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                </View>

                {/* Conversation groups */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Nhóm trò chuyện</Text>
                    <FlatList
                        data={conversationGroups}
                        renderItem={renderContact}
                        keyExtractor={(item) => item.id}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60,
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        paddingLeft: 16,
    },
    titleContainer: {
        marginLeft: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 16,
        paddingLeft: 16,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    searchInput: {
        flex: 1,
        marginLeft: 8,
        fontSize: 16,
        color: '#333',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    actionItem: {
        alignItems: 'center',
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    addBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: '#333',
        justifyContent: 'center',
        alignItems: 'center',
    },
    addText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    actionText: {
        marginTop: 8,
        fontSize: 14,
        color: '#333',
    },
    section: {
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: '#fff',
        marginBottom: 8,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 12,
    },
    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    contactInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        position: 'relative',
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberCountBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#888',
        justifyContent: 'center',
        alignItems: 'center',
    },
    memberCountText: {
        color: '#fff',
        fontSize: 10,
        fontWeight: 'bold',
    },
    contactName: {
        marginLeft: 12,
        fontSize: 16,
        color: '#333',
    },
    checkCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCheck: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#0084ff',
    },
});

export default ForwardMessage;
