// import React, { useState, useEffect } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     FlatList,
//     StatusBar,
//     SafeAreaView,
//     Modal,
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/navigation/type';
// import { useFriend } from '@/hooks/useFriend';
// import { useChat } from '@/hooks/useChat';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';





// const AVATAR_OPTIONS = [
//     'https://cdn-icons-png.flaticon.com/512/149/149071.png',
//     'https://cdn-icons-png.flaticon.com/512/847/847969.png',
//     'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
//     'https://cdn-icons-png.flaticon.com/512/921/921347.png',
//     'https://cdn-icons-png.flaticon.com/512/4086/4086679.png',
// ];

// const CreateGroupScreen = () => {
//     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//     const user = useSelector((state: RootState) => state.user.user);
//     const { createGroup } = useChat(user?.id || '');
//     const { getListFriends, listFriends } = useFriend(user?.id || '');
//     const [selected, setSelected] = useState<string[]>([]);
//     const [groupName, setGroupName] = useState('');
//     const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
//     const [showModal, setShowModal] = useState(false);
//     const [friends, setFriends] = useState<any[]>([]);

//     useEffect(() => {
//         if (user?.id) {
//             getListFriends();
//         }
//     }, [user?.id]);

//     useEffect(() => {
//         if (listFriends) {
//             setFriends(listFriends);
//         }
//     }, [listFriends]);


//     const toggleSelect = (id: string) => {
//         setSelected(prev =>
//             prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
//         );
//     };

//     const renderItem = ({ item }: any) => (
//         <TouchableOpacity style={styles.contactItem} onPress={() => toggleSelect(item.id)}>
//             <View style={styles.leftSection}>
//                 <Image
//                     source={{ uri: item.avatar }}
//                     style={styles.avatar}
//                 />
//                 <View style={styles.contactInfo}>
//                     <Text style={styles.name}>{item.name}</Text>
//                     <Text style={styles.time}>{item.phone}</Text>
//                 </View>
//             </View>
//             <View style={styles.radioCircle}>
//                 {selected.includes(item.id) && <View style={styles.selectedDot} />}
//             </View>
//         </TouchableOpacity>
//     );

//     const renderAvatarItem = ({ item }: { item: string }) => (
//         <TouchableOpacity
//             onPress={() => {
//                 setGroupAvatar(item);
//                 setShowModal(false);
//             }}
//         >
//             <Image source={{ uri: item }} style={styles.optionIcon} />
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <StatusBar barStyle="dark-content" backgroundColor="#fff" />

//             {/* Header */}
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Ionicons name="arrow-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <View>
//                     <Text style={styles.headerTitle}>Nhóm mới</Text>
//                     <Text style={styles.selectedCount}>Đã chọn: {selected.length}</Text>
//                 </View>
//             </View>

//             {/* Nhập tên nhóm + ảnh đại diện */}
//             <View style={styles.groupNameContainer}>
//                 <TouchableOpacity onPress={() => setShowModal(true)} style={styles.avatarPicker}>
//                     {groupAvatar ? (
//                         <Image source={{ uri: groupAvatar }} style={styles.avatarPickerImage} />
//                     ) : (
//                         <Ionicons name="camera-outline" size={22} color="#aaa" />
//                     )}
//                 </TouchableOpacity>
//                 <TextInput
//                     style={styles.groupNameInput}
//                     placeholder="Đặt tên nhóm"
//                     value={groupName}
//                     onChangeText={setGroupName}
//                 />
//             </View>

//             {/* Thanh tìm kiếm */}
//             <View style={styles.searchBar}>
//                 <Ionicons name="search" size={20} color="#aaa" />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Tìm tên hoặc số điện thoại"
//                 />
//                 <Text style={styles.countTag}>123</Text>
//             </View>

//             {/* Tabs */}
//             <View style={styles.tabs}>
//                 <Text style={[styles.tabItem, styles.activeTab]}>GẦN ĐÂY</Text>
//                 <Text style={styles.tabItem}>DANH BẠ</Text>
//             </View>

//             {/* Danh sách liên hệ gần đây */}
//             <FlatList
//                 data={friends}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//                 contentContainerStyle={{ paddingBottom: 40 }}
//             />

//             {/* Modal chọn ảnh đại diện */}
//             <Modal
//                 visible={showModal}
//                 animationType="slide"
//                 transparent
//                 onRequestClose={() => setShowModal(false)}
//             >
//                 <View style={styles.modalOverlay}>
//                     <View style={styles.modalContent}>
//                         <Text style={styles.modalTitle}>Cập nhật hình đại diện</Text>

//                         <FlatList
//                             data={AVATAR_OPTIONS}
//                             keyExtractor={(item, index) => index.toString()}
//                             renderItem={renderAvatarItem}
//                             horizontal
//                             showsHorizontalScrollIndicator={false}
//                             contentContainerStyle={{ paddingVertical: 12, paddingBottom: 30 }}
//                         />
//                         <View style={{ borderWidth: 1, borderColor: '#f2f2f2', marginBottom: 15 }}></View>
//                         <View style={{ alignItems: 'center', marginBottom: 5 }}>
//                             <TouchableOpacity onPress={() => { }} style={styles.modalOption}>
//                                 <Text style={styles.modalOptionText}>Chụp ảnh mới</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => { }} style={styles.modalOption}>
//                                 <Text style={styles.modalOptionText}>Chọn ảnh từ điện thoại</Text>
//                             </TouchableOpacity>
//                             <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalOption}>
//                                 <Text style={[styles.modalOptionText, { color: 'red' }]}>Hủy</Text>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                 </View>
//             </Modal>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#fff' },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         height: 50,
//         gap: 12,
//         borderBottomWidth: 1,
//         borderColor: '#eee',
//         backgroundColor: '#EFEFEF',
//         paddingHorizontal: 16,
//     },
//     headerTitle: { fontSize: 16, fontWeight: '600' },
//     selectedCount: { fontSize: 14, color: '#888' },

//     groupNameContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingHorizontal: 16,
//         borderBottomWidth: 1,
//         borderColor: '#eee',
//         paddingVertical: 12,
//     },
//     avatarPicker: {
//         width: 45,
//         height: 45,
//         borderRadius: 25,
//         backgroundColor: '#f2f2f2',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     avatarPickerImage: {
//         width: 45,
//         height: 45,
//         borderRadius: 25,
//     },
//     groupNameInput: {
//         marginLeft: 12,
//         fontSize: 16,
//         flex: 1,
//     },

//     searchBar: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         margin: 12,
//         borderRadius: 8,
//         backgroundColor: '#f2f2f2',
//         paddingHorizontal: 12,
//         height: 40,
//     },
//     searchInput: {
//         flex: 1,
//         fontSize: 14,
//         marginHorizontal: 8,
//     },
//     countTag: {
//         fontSize: 12,
//         color: '#333',
//         backgroundColor: '#ddd',
//         borderRadius: 6,
//         paddingHorizontal: 6,
//     },

//     tabs: {
//         flexDirection: 'row',
//         justifyContent: 'space-around',
//         paddingVertical: 8,
//         borderBottomWidth: 1,
//         borderColor: '#eee',
//     },
//     tabItem: {
//         fontSize: 14,
//         color: '#888',
//     },
//     activeTab: {
//         color: '#000',
//         fontWeight: 'bold',
//         borderBottomWidth: 2,
//         borderColor: '#000',
//     },

//     contactItem: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         padding: 12,
//         borderBottomWidth: 1,
//         borderColor: '#f0f0f0',
//         justifyContent: 'space-between',
//     },
//     leftSection: {
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     avatar: {
//         width: 48,
//         height: 48,
//         borderRadius: 24,
//         backgroundColor: '#ccc',
//     },
//     contactInfo: {
//         marginLeft: 12,
//     },
//     name: {
//         fontSize: 16,
//         fontWeight: '400',
//     },
//     time: {
//         fontSize: 12,
//         color: '#888',
//     },
//     radioCircle: {
//         height: 20,
//         width: 20,
//         borderRadius: 10,
//         borderWidth: 1,
//         borderColor: '#999',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     selectedDot: {
//         height: 12,
//         width: 12,
//         borderRadius: 6,
//         backgroundColor: '#0084ff',
//     },

//     modalOverlay: {
//         flex: 1,
//         justifyContent: 'flex-end',
//         backgroundColor: 'rgba(0,0,0,0.3)',
//     },
//     modalContent: {
//         backgroundColor: '#fff',
//         padding: 16,
//         borderTopLeftRadius: 12,
//         borderTopRightRadius: 12,
//     },
//     modalTitle: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 16,
//     },
//     optionIcon: {
//         width: 60,
//         height: 60,
//         borderRadius: 25,
//         marginHorizontal: 8,
//     },
//     modalOption: {
//         paddingVertical: 10,
//         alignItems: 'center',

//     },
//     modalOptionText: {
//         fontSize: 16,
//         color: '#333',
//     },
// });

// export default CreateGroupScreen;


import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
    StyleSheet,
    FlatList,
    StatusBar,
    SafeAreaView,
    Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { useFriend } from '@/hooks/useFriend';
import { useChat } from '@/hooks/useChat';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { ROUTING } from '@/utils/constant';

const AVATAR_OPTIONS = [
    'https://cdn-icons-png.flaticon.com/512/149/149071.png',
    'https://cdn-icons-png.flaticon.com/512/847/847969.png',
    'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
    'https://cdn-icons-png.flaticon.com/512/921/921347.png',
    'https://cdn-icons-png.flaticon.com/512/4086/4086679.png',
];

const CreateGroupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);
    const { createGroup } = useChat(user?.id || '');
    const { getListFriends, listFriends } = useFriend(user?.id || '');

    const [selected, setSelected] = useState<string[]>([]);
    const [groupName, setGroupName] = useState('');
    const [groupAvatar, setGroupAvatar] = useState<string | null>(null);
    const [showModal, setShowModal] = useState(false);
    const [friends, setFriends] = useState<any[]>([]);

    useEffect(() => {
        if (user?.id) getListFriends();
    }, [user?.id]);

    useEffect(() => {
        if (listFriends) setFriends(listFriends);
    }, [listFriends]);

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
        );
    };

    const handleCreateGroup = () => {
        if (!groupName.trim()) {
            alert('Vui lòng nhập tên nhóm!');
            return;
        }
        if (selected.length < 2) {
            alert('Phải chọn ít nhất 2 thành viên!');
            return;
        }

        if (!user) {
            alert('Người dùng không hợp lệ!');
            return;
        }
        const memberIds = [...selected]; // Thêm bản thân
        createGroup(groupName.trim(), memberIds);
        navigation.goBack();
    };

    const renderItem = ({ item }: any) => (
        <TouchableOpacity style={styles.contactItem} onPress={() => toggleSelect(item.id)}>
            <View style={styles.leftSection}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <View style={styles.contactInfo}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.time}>{item.phone}</Text>
                </View>
            </View>
            <View style={styles.radioCircle}>
                {selected.includes(item.id) && <View style={styles.selectedDot} />}
            </View>
        </TouchableOpacity>
    );

    const renderAvatarItem = ({ item }: { item: string }) => (
        <TouchableOpacity
            onPress={() => {
                setGroupAvatar(item);
                setShowModal(false);
            }}
        >
            <Image source={{ uri: item }} style={styles.optionIcon} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Tạo nhóm</Text>
            </View>

            {/* Nhập tên nhóm và avatar */}
            <View style={styles.groupNameContainer}>
                <TouchableOpacity onPress={() => setShowModal(true)} style={styles.avatarPicker}>
                    {groupAvatar ? (
                        <Image source={{ uri: groupAvatar }} style={styles.avatarPickerImage} />
                    ) : (
                        <Ionicons name="camera-outline" size={22} color="#aaa" />
                    )}
                </TouchableOpacity>
                <TextInput
                    style={styles.groupNameInput}
                    placeholder="Tên nhóm"
                    value={groupName}
                    onChangeText={setGroupName}
                />
            </View>

            {/* Danh sách bạn bè + nút tạo nhóm */}
            <View style={{ flex: 1 }}>
                <FlatList
                    data={friends}
                    keyExtractor={item => item.id}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 100 }}
                />

                <TouchableOpacity style={styles.createButton} onPress={handleCreateGroup}>
                    <Text style={styles.createButtonText}>Tạo nhóm</Text>
                </TouchableOpacity>
            </View>

            {/* Modal chọn ảnh đại diện */}
            <Modal
                visible={showModal}
                animationType="slide"
                transparent
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Chọn ảnh đại diện</Text>
                        <FlatList
                            data={AVATAR_OPTIONS}
                            horizontal
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderAvatarItem}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 12, paddingBottom: 30 }}
                        />
                        <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalOption}>
                            <Text style={[styles.modalOptionText, { color: 'red' }]}>Hủy</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
    },
    headerTitle: { fontSize: 16, fontWeight: '600', marginLeft: 12 },

    groupNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    avatarPicker: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPickerImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
    groupNameInput: {
        marginLeft: 12,
        fontSize: 16,
        flex: 1,
    },

    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ccc',
    },
    contactInfo: {
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#0084ff',
    },
    createButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#0084ff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    optionIcon: {
        width: 60,
        height: 60,
        borderRadius: 25,
        marginHorizontal: 8,
    },
    modalOption: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333',
    },
});

export default CreateGroupScreen;
