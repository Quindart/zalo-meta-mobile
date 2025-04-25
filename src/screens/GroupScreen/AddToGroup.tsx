// // // import React, { useEffect, useState } from 'react';
// // // import {
// // //     View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView
// // // } from 'react-native';
// // // import { Ionicons } from '@expo/vector-icons';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // // import { RootStackParamList } from '@/navigation/type';
// // // import { useFriend } from '@/hooks/useFriend';
// // // import { useChat } from '@/hooks/useChat';
// // // import { useSelector } from 'react-redux';
// // // import { RootState } from '@/redux/store';
// // // import { RouteProp, useRoute } from '@react-navigation/native';



// // // interface Friend {
// // //     id: string;
// // //     name: string;
// // //     phone?: string;
// // //     avatar: string;
// // // }

// // // const MOCK_CONTACTS: Friend[] = [
// // //     { id: '1', name: '20/7', avatar: 'https://i.imgur.com/UYiroysl.jpg' },
// // //     { id: '2', name: 'A Mạnh', avatar: 'https://i.imgur.com/2nCt3Sb.jpg' },
// // //     { id: '3', name: 'A Tún', avatar: 'https://i.imgur.com/jPpBv.jpg' },
// // //     { id: '4', name: 'A Việt', avatar: 'https://i.imgur.com/yA9nDvw.jpg' },
// // //     { id: '5', name: 'A Vương', avatar: 'https://i.imgur.com/TkIrScD.jpg' },
// // //     { id: '6', name: 'Anh Tiến', avatar: '' },
// // //     { id: '7', name: 'Ánhhh', avatar: '' },
// // //     { id: '8', name: 'Ba', avatar: 'https://i.imgur.com/GqKKZNF.jpg' },
// // //     { id: '9', name: 'Bá Hậu', avatar: 'https://i.imgur.com/3pYYMEn.jpg' },
// // // ];

// // // const AddToGroupScreen = () => {
// // //     const [selected, setSelected] = useState<string[]>([]);
// // //     const [query, setQuery] = useState('');
// // //     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// // //     const user = useSelector((state: RootState) => state.user.user);
// // //     const { getListFriends, listFriends } = useFriend(user?.id || '');
// // //     const { } = useChat(user?.id || '');

// // //     const route = useRoute<RouteProp<RootStackParamList, 'AddToGroup'>>();
// // //     const itemGroup = route.params as { itemGroup: any };




// // //     useEffect(() => {
// // //         getListFriends();
// // //         console.log('List listMember:', itemGroup);
// // //         console.log('List member:', itemGroup.itemGroup.members);

// // //     }, [getListFriends]);

// // //     useEffect(() => {
// // //         console.log('List friends:', listFriends);
// // //     }, [query]);

// // //     const toggleSelect = (id: string) => {
// // //         setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
// // //     };

// // //     const renderItem = ({ item }: { item: Friend }) => (
// // //         <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.id)}>
// // //             <Image source={{ uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.avatar} />
// // //             <View style={{ flex: 1 }}>
// // //                 <Text style={styles.name}>{item.name}</Text>
// // //             </View>
// // //             <View style={styles.radio}>
// // //                 {selected.includes(item.id) && <View style={styles.dot} />}
// // //             </View>
// // //         </TouchableOpacity>
// // //     );

// // //     return (
// // //         <SafeAreaView style={styles.container}>
// // //             <View style={styles.header}>
// // //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// // //                     <Ionicons name="arrow-back" size={24} color="#333" />
// // //                 </TouchableOpacity>
// // //                 <View>
// // //                     <Text style={styles.title}>Thêm vào nhóm</Text>
// // //                     <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
// // //                 </View>
// // //             </View>

// // //             <View style={styles.searchBar}>
// // //                 <Ionicons name="search" size={20} color="#aaa" />
// // //                 <TextInput
// // //                     style={styles.searchInput}
// // //                     placeholder="Tìm tên hoặc số điện thoại"
// // //                     value={query}
// // //                     onChangeText={setQuery}
// // //                 />
// // //                 <Text style={styles.counter}>123</Text>
// // //             </View>

// // //             <TouchableOpacity style={styles.linkInvite}>
// // //                 <Ionicons name="link-outline" size={24} color="#2b7bff" />
// // //                 <Text style={styles.linkText}>Mời vào nhóm bằng link</Text>
// // //             </TouchableOpacity>

// // //             <FlatList
// // //                 data={listFriends}
// // //                 keyExtractor={(item) => item.id}
// // //                 renderItem={renderItem}
// // //             />
// // //         </SafeAreaView>
// // //     );
// // // };

// // // const styles = StyleSheet.create({
// // //     container: { flex: 1, backgroundColor: '#fff' },
// // //     header: {
// // //         flexDirection: 'row', alignItems: 'center', gap: 12,
// // //         paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderColor: '#eee',
// // //         backgroundColor: '#f9f9f9'
// // //     },
// // //     title: { fontSize: 16, fontWeight: 'bold' },
// // //     subtitle: { fontSize: 13, color: '#888' },
// // //     searchBar: {
// // //         flexDirection: 'row', alignItems: 'center',
// // //         margin: 12, borderRadius: 8, backgroundColor: '#f2f2f2',
// // //         paddingHorizontal: 12, height: 40
// // //     },
// // //     searchInput: { flex: 1, fontSize: 14, marginHorizontal: 8 },
// // //     counter: {
// // //         fontSize: 12, color: '#333',
// // //         backgroundColor: '#ddd', borderRadius: 6, paddingHorizontal: 6,
// // //     },
// // //     linkInvite: {
// // //         flexDirection: 'row', alignItems: 'center',
// // //         padding: 12, gap: 10
// // //     },
// // //     linkText: { color: '#2b7bff', fontSize: 15 },
// // //     item: {
// // //         flexDirection: 'row', alignItems: 'center',
// // //         paddingHorizontal: 16, paddingVertical: 10,
// // //         borderBottomWidth: 1, borderColor: '#eee'
// // //     },
// // //     avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
// // //     name: { fontSize: 15 },
// // //     radio: {
// // //         width: 20, height: 20, borderRadius: 10,
// // //         borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center'
// // //     },
// // //     dot: {
// // //         width: 12, height: 12, borderRadius: 6, backgroundColor: '#2b7bff'
// // //     }
// // // });

// // // export default AddToGroupScreen;


// // import React, { useEffect, useMemo, useState } from 'react';
// // import {
// //     View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView
// // } from 'react-native';
// // import { Ionicons } from '@expo/vector-icons';
// // import { useNavigation, useRoute } from '@react-navigation/native';
// // import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// // import { RootStackParamList } from '@/navigation/type';
// // import { useFriend } from '@/hooks/useFriend';
// // import { useChat } from '@/hooks/useChat';
// // import { useSelector } from 'react-redux';
// // import { RootState } from '@/redux/store';


// // const AddToGroupScreen = () => {
// //     const [selected, setSelected] = useState<string[]>([]);
// //     const [query, setQuery] = useState('');
// //     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
// //     const user = useSelector((state: RootState) => state.user.user);
// //     const { getListFriends, listFriends } = useFriend(user?.id || '');
// //     const { addMember } = useChat(user?.id || '');
// //     const route = useRoute();
// //     const { itemGroup } = route.params as { itemGroup: any };

// //     useEffect(() => {
// //         getListFriends();
// //         console.log('List listMember:', itemGroup);
// //         console.log('List member:', itemGroup.members);
// //     }, [getListFriends]);

// //     const toggleSelect = (id: string) => {
// //         setSelected(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
// //     };

// //     const filteredFriends = useMemo(() => {
// //         return listFriends
// //             .filter(friend =>
// //                 !itemGroup.members.some((member: any) => member.userId === friend.id)
// //             )
// //             .filter(friend =>
// //                 friend.name.toLowerCase().includes(query.toLowerCase()) ||
// //                 friend.phone?.includes(query)
// //             );
// //     }, [listFriends, itemGroup, query]);

// //     const renderItem = ({ item }: { item: any }) => (
// //         <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.id)}>
// //             <Image source={{ uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.avatar} />
// //             <View style={{ flex: 1 }}>
// //                 <Text style={styles.name}>{item.name}</Text>
// //             </View>
// //             <View style={styles.radio}>
// //                 {selected.includes(item.id) && <View style={styles.dot} />}
// //             </View>
// //         </TouchableOpacity>
// //     );

// //     return (
// //         <SafeAreaView style={styles.container}>
// //             <View style={styles.header}>
// //                 <TouchableOpacity onPress={() => navigation.goBack()}>
// //                     <Ionicons name="arrow-back" size={24} color="#333" />
// //                 </TouchableOpacity>
// //                 <View>
// //                     <Text style={styles.title}>Thêm vào nhóm</Text>
// //                     <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
// //                 </View>
// //             </View>

// //             <View style={styles.searchBar}>
// //                 <Ionicons name="search" size={20} color="#aaa" />
// //                 <TextInput
// //                     style={styles.searchInput}
// //                     placeholder="Tìm tên hoặc số điện thoại"
// //                     value={query}
// //                     onChangeText={setQuery}
// //                 />
// //                 <Text style={styles.counter}>{filteredFriends.length}</Text>
// //             </View>

// //             <TouchableOpacity style={styles.linkInvite}>
// //                 <Ionicons name="link-outline" size={24} color="#2b7bff" />
// //                 <Text style={styles.linkText}>Mời vào nhóm bằng link</Text>
// //             </TouchableOpacity>

// //             <FlatList
// //                 data={filteredFriends}
// //                 keyExtractor={(item) => item.id}
// //                 renderItem={renderItem}
// //             />
// //         </SafeAreaView>
// //     );
// // };

// // const styles = StyleSheet.create({
// //     container: { flex: 1, backgroundColor: '#fff' },
// //     header: {
// //         flexDirection: 'row', alignItems: 'center', gap: 12,
// //         paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderColor: '#eee',
// //         backgroundColor: '#f9f9f9'
// //     },
// //     title: { fontSize: 16, fontWeight: 'bold' },
// //     subtitle: { fontSize: 13, color: '#888' },
// //     searchBar: {
// //         flexDirection: 'row', alignItems: 'center',
// //         margin: 12, borderRadius: 8, backgroundColor: '#f2f2f2',
// //         paddingHorizontal: 12, height: 40
// //     },
// //     searchInput: { flex: 1, fontSize: 14, marginHorizontal: 8 },
// //     counter: {
// //         fontSize: 12, color: '#333',
// //         backgroundColor: '#ddd', borderRadius: 6, paddingHorizontal: 6,
// //     },
// //     linkInvite: {
// //         flexDirection: 'row', alignItems: 'center',
// //         padding: 12, gap: 10
// //     },
// //     linkText: { color: '#2b7bff', fontSize: 15 },
// //     item: {
// //         flexDirection: 'row', alignItems: 'center',
// //         paddingHorizontal: 16, paddingVertical: 10,
// //         borderBottomWidth: 1, borderColor: '#eee'
// //     },
// //     avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
// //     name: { fontSize: 15 },
// //     radio: {
// //         width: 20, height: 20, borderRadius: 10,
// //         borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center'
// //     },
// //     dot: {
// //         width: 12, height: 12, borderRadius: 6, backgroundColor: '#2b7bff'
// //     }
// // });

// // export default AddToGroupScreen;


// import React, { useEffect, useMemo, useState } from 'react';
// import {
//     View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView
// } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import { useNavigation, useRoute } from '@react-navigation/native';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { RootStackParamList } from '@/navigation/type';
// import { useFriend } from '@/hooks/useFriend';
// import { useChat } from '@/hooks/useChat';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';

// interface Friend {
//     id: string;
//     name: string;
//     phone?: string;
//     avatar?: string;
// }

// const AddToGroupScreen = () => {
//     const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
//     const user = useSelector((state: RootState) => state.user.user);
//     const { getListFriends, listFriends } = useFriend(user?.id || '');
//     const { addMember } = useChat(user?.id || '');
//     const route = useRoute();
//     const { itemGroup } = route.params as { itemGroup?: any };

//     if (!itemGroup) {
//         return (
//             <SafeAreaView style={styles.container}>
//                 <Text style={{ textAlign: 'center', marginTop: 40 }}>Không có dữ liệu nhóm</Text>
//             </SafeAreaView>
//         );
//     }

//     const [selected, setSelected] = useState<string[]>([]);
//     const [query, setQuery] = useState('');

//     useEffect(() => {
//         getListFriends();
//     }, [getListFriends]);

//     const toggleSelect = (id: string) => {
//         setSelected(prev =>
//             prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
//         );
//     };

//     const filteredFriends = useMemo(() => {
//         const memberIds = itemGroup.members.map((m: any) => m.userId);
//         return listFriends
//             .filter(f => !memberIds.includes(f.id) && f.id !== user?.id)
//             .filter(f =>
//                 f.name.toLowerCase().includes(query.toLowerCase()) ||
//                 f.phone?.includes(query)
//             );
//     }, [listFriends, itemGroup.members, query, user?.id]);

//     const renderItem = ({ item }: { item: Friend }) => (
//         <TouchableOpacity style={styles.item} onPress={() => toggleSelect(item.id)}>
//             <Image source={{ uri: item.avatar || 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }} style={styles.avatar} />
//             <View style={{ flex: 1 }}>
//                 <Text style={styles.name}>{item.name}</Text>
//             </View>
//             <View style={styles.radio}>
//                 {selected.includes(item.id) && <View style={styles.dot} />}
//             </View>
//         </TouchableOpacity>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity onPress={() => navigation.goBack()}>
//                     <Ionicons name="arrow-back" size={24} color="#333" />
//                 </TouchableOpacity>
//                 <View>
//                     <Text style={styles.title}>Thêm vào nhóm</Text>
//                     <Text style={styles.subtitle}>Đã chọn: {selected.length}</Text>
//                 </View>
//             </View>

//             <View style={styles.searchBar}>
//                 <Ionicons name="search" size={20} color="#aaa" />
//                 <TextInput
//                     style={styles.searchInput}
//                     placeholder="Tìm tên hoặc số điện thoại"
//                     value={query}
//                     onChangeText={setQuery}
//                 />
//                 <Text style={styles.counter}>{filteredFriends.length}</Text>
//             </View>

//             <TouchableOpacity style={styles.linkInvite}>
//                 <Ionicons name="link-outline" size={24} color="#2b7bff" />
//                 <Text style={styles.linkText}>Mời vào nhóm bằng link</Text>
//             </TouchableOpacity>

//             <FlatList
//                 data={filteredFriends}
//                 keyExtractor={(item) => item.id}
//                 renderItem={renderItem}
//             />
//             <TouchableOpacity
//                 style={styles.addButton}
//                 onPress={() => {
//                     selected.forEach((userId) => {
//                         addMember(itemGroup.id, userId);
//                     });
//                     navigation.goBack();
//                 }}
//             >
//                 <Text style={styles.addButtonText}>Thêm vào nhóm</Text>
//             </TouchableOpacity>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: { flex: 1, backgroundColor: '#fff' },
//     header: {
//         flexDirection: 'row', alignItems: 'center', gap: 12,
//         paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderColor: '#eee',
//         backgroundColor: '#f9f9f9'
//     },
//     title: { fontSize: 16, fontWeight: 'bold' },
//     subtitle: { fontSize: 13, color: '#888' },
//     searchBar: {
//         flexDirection: 'row', alignItems: 'center',
//         margin: 12, borderRadius: 8, backgroundColor: '#f2f2f2',
//         paddingHorizontal: 12, height: 40
//     },
//     searchInput: { flex: 1, fontSize: 14, marginHorizontal: 8 },
//     counter: {
//         fontSize: 12, color: '#333',
//         backgroundColor: '#ddd', borderRadius: 6, paddingHorizontal: 6,
//     },
//     linkInvite: {
//         flexDirection: 'row', alignItems: 'center',
//         padding: 12, gap: 10
//     },
//     linkText: { color: '#2b7bff', fontSize: 15 },
//     item: {
//         flexDirection: 'row', alignItems: 'center',
//         paddingHorizontal: 16, paddingVertical: 10,
//         borderBottomWidth: 1, borderColor: '#eee'
//     },
//     avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
//     name: { fontSize: 15 },
//     radio: {
//         width: 20, height: 20, borderRadius: 10,
//         borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center'
//     },
//     dot: {
//         width: 12, height: 12, borderRadius: 6, backgroundColor: '#2b7bff'
//     },
//     addButton: {
//         position: 'absolute',
//         bottom: 20,
//         left: 20,
//         right: 20,
//         backgroundColor: '#2b7bff',
//         paddingVertical: 14,
//         borderRadius: 10,
//         alignItems: 'center',
//     },
//     addButtonText: {
//         color: '#fff',
//         fontSize: 16,
//         fontWeight: 'bold',
//     }

// });

// export default AddToGroupScreen;


import React, { useEffect, useMemo, useState, useCallback } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, FlatList, StyleSheet, SafeAreaView
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useFriend } from '@/hooks/useFriend';
import { useChat } from '@/hooks/useChat';

interface Friend {
    id: string;
    name: string;
    phone?: string;
    avatar?: string;
}

const AddToGroupScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const user = useSelector((state: RootState) => state.user.user);
    const { getListFriends, listFriends } = useFriend(user?.id || '');
    const { addMember } = useChat(user?.id || '');
    const route = useRoute();
    const { itemGroup } = route.params as { itemGroup: any };

    const [selected, setSelected] = useState<string[]>([]);
    const [query, setQuery] = useState('');

    useEffect(() => {
        getListFriends();
    }, []);

    const toggleSelect = (id: string) => {
        setSelected(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const filteredFriends = useMemo(() => {
        const memberIds = itemGroup?.members.map((m: any) => m.userId) || [];
        return listFriends
            .filter(f => !memberIds.includes(f.id) && f.id !== user?.id)
            .filter(f =>
                f.name.toLowerCase().includes(query.toLowerCase()) ||
                f.phone?.includes(query)
            );
    }, [listFriends, itemGroup?.members, query, user?.id]);

    const handleAddMembers = useCallback(() => {
        selected.forEach(userId => {
            addMember(itemGroup.id, userId);
        });
        navigation.goBack();
    }, [selected, addMember, itemGroup?.id]);

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
