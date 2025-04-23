import React, { useEffect, useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import { RouteProp, useRoute } from '@react-navigation/native';
import useUser from '@/hooks/useUser';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const TABS = ['Tất cả', 'Trưởng và phó nhóm', 'Đã mời', 'Đã chặn'];

const MemberManagementScreen = () => {
    const { handleGetUserById } = useUser();
    const members = useSelector((state: RootState) => state.user.members);

    const [selectedTab, setSelectedTab] = useState('Tất cả');
    const [selectedMember, setSelectedMember] = useState<any | null>(null);
    const [showOptions, setShowOptions] = useState(false);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const route = useRoute<RouteProp<RootStackParamList, typeof ROUTING.MEMBER_MANAGEMENT_SCREEN>>();
    const itemGroup = route.params as { itemGroup: any };
    const [listMemberGroup, setListMemberGroup] = useState<any[]>([]);

    useEffect(() => {
        console.log('List member:', itemGroup.itemGroup.members);
        const fetchUserData = async () => {
            try {
                for (const member of itemGroup.itemGroup.members) {
                    const user = await handleGetUserById(member.userId);
                    if (user) {
                        const memberWithInfo = { ...member, user };
                        setListMemberGroup(prev => [...prev, memberWithInfo]);
                    }
                }
            } catch (error) {
                console.error('❌ Error fetching user data:', error);
            }
        };
        fetchUserData();
        console.log('Member Store:', members);
    }, []);

    const handleOpenOptions = (member: any): void => {
        if (member.role === 'captain') {
            return;
        }
        setSelectedMember(member);
        setShowOptions(true);
    };

    const renderMember = ({ item }: any) => (
        <Pressable style={styles.memberItem} onPress={() => handleOpenOptions(item)}>
            <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{`${item.user.lastName} ${item.user.firstName}`}</Text>
                <Text style={styles.role}>{item.role}</Text>
            </View>
        </Pressable>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
                        <Ionicons name="arrow-back" size={24} color="#fff" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Quản lý thành viên</Text>
                </View>
                <View style={styles.headerIcons}>
                    <TouchableOpacity onPress={() => navigation.navigate(ROUTING.ADD_TO_GROUP, itemGroup)}>
                        <Ionicons name="person-add" size={22} color="#fff" style={{ marginRight: 16 }} />
                    </TouchableOpacity>
                    <Ionicons name="search" size={22} color="#fff" />
                </View>
            </View>

            <View style={styles.tabs}>
                {TABS.map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setSelectedTab(tab)}
                        style={[styles.tabItem, selectedTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, selectedTab === tab && styles.activeTabText]}>{tab}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <TouchableOpacity style={styles.approveContainer}>
                <Ionicons name="person-circle-outline" size={32} color="#888" />
                <Text style={styles.approveText}>Duyệt thành viên</Text>
            </TouchableOpacity>

            <Text style={styles.memberCount}>Thành viên ({listMemberGroup.length})</Text>

            <FlatList
                data={members}
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
                <Pressable style={styles.modalOverlay} onPress={() => setShowOptions(false)}>
                    <Pressable style={styles.modalContent} onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.modalTitle}>Thông tin thành viên</Text>
                        <View style={styles.modalProfileRow}>
                            <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                <Image source={{ uri: selectedMember?.user?.avatar }} style={styles.modalAvatar} />
                                <Text style={styles.modalName}>
                                    {selectedMember ? `${selectedMember.user?.lastName} ${selectedMember.user?.firstName}` : ''}
                                </Text>
                            </View>
                            <View style={styles.modalActions}>
                                <Ionicons name="call-outline" size={20} color="#555" style={styles.modalIcon} />
                                <Ionicons name="chatbubble-ellipses-outline" size={20} color="#555" style={styles.modalIcon} />
                            </View>
                        </View>

                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Xem trang cá nhân</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Bổ nhiệm làm phó nhóm</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={styles.modalOptionText}>Chặn thành viên</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption}>
                            <Text style={[styles.modalOptionText, { color: 'red' }]}>Xoá khỏi nhóm</Text>
                        </TouchableOpacity>
                    </Pressable>
                </Pressable>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        backgroundColor: '#108BE3',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 10 },
    headerIcons: { flexDirection: 'row', alignItems: 'center' },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#F0F0F0',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    tabItem: {
        flex: 1,
        paddingVertical: 12,
        alignItems: 'center',
    },
    tabText: { fontSize: 14, color: '#555', textAlign: 'center' },
    activeTab: { borderBottomWidth: 2, borderBottomColor: '#108BE3' },
    activeTabText: { color: '#108BE3', fontWeight: 'bold' },
    approveContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    approveText: { marginLeft: 12, fontSize: 16, color: '#333' },
    memberCount: {
        paddingHorizontal: 16,
        paddingTop: 8,
        fontSize: 14,
        color: '#108BE3',
        fontWeight: 'bold',
    },
    memberItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#f0f0f0',
    },
    avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
    name: { fontSize: 16, fontWeight: '500' },
    role: { fontSize: 13, color: '#666', marginTop: 2 },
    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    modalProfileRow: {
        alignItems: 'center',
        marginBottom: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
    },
    modalAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginBottom: 6,
        marginRight: 16,
    },
    modalName: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 8,
    },
    modalActions: {
        flexDirection: 'row',
        gap: 16,
        marginTop: 4,
    },
    modalIcon: {
        padding: 6,
        backgroundColor: '#eee',
        borderRadius: 24,
    },
    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default MemberManagementScreen;
