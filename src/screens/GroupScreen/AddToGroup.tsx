import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { useFriend } from '@/hooks/useFriend';
import { useChat } from '@/hooks/useChat';
import { RootState } from '@/redux/store';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '@/redux/userSlice';

interface Friend {
    id: string;
    name: string;
    phone?: string;
    avatar?: string;
}

const AddToGroupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);
    const { getListFriends, listFriends, } = useFriend(user?.id || '');
    const { addMember, channel, loadChannel } = useChat(user?.id || '');
    const route = useRoute();
    const { itemGroup } = route.params as { itemGroup: any };
    const currentChannel = useSelector((state: RootState) => state.user.currentChannel);

    const [selected, setSelected] = useState<string[]>([]);
    const [query, setQuery] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        getListFriends();
    }, []);

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };



    const filteredFriends = useMemo(() => {
        const memberIds = currentChannel?.members.map((m: any) => m.userId) || [];
        return listFriends
            .filter(f => !memberIds.includes(f.id) && f.id !== user?.id)
            .filter(f =>
                f.name.toLowerCase().includes(query.toLowerCase()) ||
                f.phone?.includes(query)
            );
    }, [listFriends, currentChannel?.members, query, user?.id]);

    // const handleAddMembers = useCallback(() => {
    //     selected.forEach(userId => {
    //         addMember(currentChannel.id, userId);
    //     });
    //     navigation.goBack();
    // }, [selected, addMember, currentChannel?.id]);
    const handleAddMembers = useCallback(async () => {
        for (const userId of selected) {
            addMember(currentChannel.id, userId);
        }
        // 🔁 Load lại channel để lấy danh sách thành viên mới
        loadChannel(currentChannel.id);
        if (channel) {
            dispatch(setCurrentChannel(channel));
        }
        navigation.goBack();
    }, [selected, addMember, currentChannel?.id]);

    const renderItem = ({ item }: { item: Friend }) => (
        <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.id)}>
            <Image source={{ uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.avatar} />
            <View style={{ flex: 1 }}>
                <Text style={styles.name}>{item.name}</Text>
            </View>
            <View style={styles.radio}>
                {selected.includes(item.id) && <View style={styles.dot} />}
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="#333" />
                </TouchableOpacity>
                <View>
                    <Text style={styles.title}>Thêm vào nhóm</Text>
                    <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
                </View>
            </View>

            <View style={styles.searchBar}>
                <Ionicons name="search" size={20} color="#aaa" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Tìm tên hoặc số điện thoại"
                    value={query}
                    onChangeText={setQuery}
                />
                <Text style={styles.counter}>{filteredFriends.length}</Text>
            </View>

            <FlatList
                data={filteredFriends}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Không có bạn bè phù hợp</Text>}
            />

            {selected.length > 0 && (
                <TouchableOpacity style={styles.addButton} onPress={handleAddMembers}>
                    <Text style={styles.addButtonText}>Thêm vào nhóm</Text>
                </TouchableOpacity>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderColor: '#eee',
        backgroundColor: '#f9f9f9'
    },
    title: { fontSize: 16, fontWeight: 'bold' },
    subtitle: { fontSize: 13, color: '#888' },
    searchBar: {
        flexDirection: 'row', alignItems: 'center',
        margin: 12, borderRadius: 8, backgroundColor: '#f2f2f2',
        paddingHorizontal: 12, height: 40
    },
    searchInput: { flex: 1, fontSize: 14, marginHorizontal: 8 },
    counter: {
        fontSize: 12, color: '#333',
        backgroundColor: '#ddd', borderRadius: 6, paddingHorizontal: 6,
    },
    item: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10,
        borderBottomWidth: 1, borderColor: '#eee'
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    name: { fontSize: 15 },
    radio: {
        width: 20, height: 20, borderRadius: 10,
        borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center'
    },
    dot: {
        width: 12, height: 12, borderRadius: 6, backgroundColor: '#2b7bff'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#2b7bff',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default AddToGroupScreen;
