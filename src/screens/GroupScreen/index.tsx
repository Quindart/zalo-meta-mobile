
import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Image,
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
import { styles } from './style';

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



export default CreateGroupScreen;
