
import React, { useEffect, useState } from 'react';
import {
    View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Image, FlatList, Alert
} from 'react-native';
import Header from '@/components/ui/Header';
import { useSelector } from 'react-redux';
import { useFriend } from '@/hooks/useFriend';
import { User } from '@/models/user';


const FriendRequestScreen = () => {
    const [activeTab, setActiveTab] = useState<'received' | 'sent'>('received');
    const user: User | null = useSelector((state: any) => state.user.user);
    const { getReceviedInviteFriends, receiveFriends, getSendListFriends, sendFriends, revokeInviteFriend, accpetFriend, rejectInviteFriend } = useFriend(user?.id || '');
    const [receviedInviteFriends, setReceviedInviteFriends] = useState<any[]>([]);
    const [sentInviteFriends, setSentInviteFriends] = useState<any[]>([]);

    useEffect(() => {
        if (activeTab === 'received') {
            getReceviedInviteFriends();
        }
        if (activeTab === 'sent') {
            getSendListFriends();
        }
    }, [activeTab]);

    useEffect(() => {
        setReceviedInviteFriends(receiveFriends);
        setSentInviteFriends(sendFriends);
    }, [receiveFriends, sendFriends, activeTab]);


    const renderReceivedItem = ({ item }: any) => (
        <View style={styles.requestCard}>
            <View style={styles.requestHeader}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.requestName}>{item.name}</Text>
            </View>
            <View style={styles.requestMessageContainer}>
                <Text style={styles.requestMessage}>Xin chào, mình là {item.name}. Mình tìm thấy bạn bằng số điện thoại.</Text>
            </View>
            <View style={styles.requestButtons}>
                <TouchableOpacity style={[styles.button, styles.declineButton]} onPress={() => rejectInviteFriend(item.id)}>
                    <Text style={styles.buttonText}>TỪ CHỐI</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.acceptButton]} onPress={() => accpetFriend(item.id)}>
                    <Text style={[styles.buttonText, { color: 'white' }]}>ĐỒNG Ý</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderSentItem = ({ item }: any) => (
        <View style={styles.sentCard}>
            <Image source={{ uri: item.avatar }} style={styles.avatar} />
            <View style={styles.sentInfo}>
                <Text style={styles.sentName}>{item.name}</Text>
                <Text style={styles.sentSubtitle}>Tìm kiếm số điện thoại</Text>
                <Text style={styles.sentTime}> </Text>
            </View>
            <TouchableOpacity style={styles.withdrawButton} onPress={() => revokeInviteFriend(item.id)}>
                <Text style={styles.withdrawText}>THU HỒI</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Lời mời kết bạn" />

            <View style={styles.tabs}>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'received' && styles.activeTab]}
                    onPress={() => setActiveTab('received')}
                >
                    <Text style={[styles.tabText, activeTab === 'received' && styles.activeTabText]}>
                        Đã nhận
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.tab, activeTab === 'sent' && styles.activeTab]}
                    onPress={() => setActiveTab('sent')}
                >
                    <Text style={[styles.tabText, activeTab === 'sent' && styles.activeTabText]}>
                        Đã gửi
                    </Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={activeTab === 'received' ? receviedInviteFriends : sentInviteFriends}
                keyExtractor={(item) => item.id}
                renderItem={activeTab === 'received' ? renderReceivedItem : renderSentItem}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f2f5',
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
    requestCard: {
        backgroundColor: '#fff',
        marginHorizontal: 15,
        padding: 15,
        borderRadius: 8,
        elevation: 2,
        marginBottom: 15,
    },
    requestHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    requestName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    requestMessageContainer: {
        backgroundColor: '#f5f5f5',
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
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
    },
    status: {
        fontSize: 13,
        color: '#666',
        marginTop: 5,
        marginLeft: 50,
    },
    sentCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },

    sentInfo: {
        flex: 1,
    },
    sentName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    sentSubtitle: {
        fontSize: 13,
        color: '#888',
    },
    sentTime: {
        fontSize: 12,
        color: '#aaa',
    },
    withdrawButton: {
        backgroundColor: '#f0f0f0',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    withdrawText: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#333',
    },

});

export default FriendRequestScreen;
