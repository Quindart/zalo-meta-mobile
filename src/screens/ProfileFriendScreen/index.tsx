import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUser from '@/hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
import { User } from '@/models/user';
import { useFriend } from '@/hooks/useFriend';
import { useSelector } from 'react-redux';



const ProfileUserScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    type ProfileUserRouteProp = RouteProp<RootStackParamList, typeof ROUTING.PROFILE_FRIEND_SCREEN>;
    const route = useRoute<ProfileUserRouteProp>();
    const userFriendId = route.params as { itemFriend: any };
    const [userFriend, setUserFriend] = useState<any | null>(null);
    const user: User | null = useSelector((state: any) => state.user.user);
    const { inviteFriend, removeFriend, revokeInviteFriend, getSendListFriends, sendFriends } = useFriend(user?.id || '');
    const inviteFriendHandler = () => {
        if (userFriendId.itemFriend._id) {
            inviteFriend(userFriendId.itemFriend._id);
            Alert.alert('Thành công', 'Đã gửi lời mời kết bạn');
        }
    }

    const isSentRequest = sendFriends?.some(
        (f: any) => f.phone === userFriend?.phone
    );

    const removeFriendHandler = () => {
        console.log('userFriendId.userId', userFriendId.itemFriend._id);
        if (userFriendId.itemFriend._id) {
            Alert.alert(
                'Xác nhận',
                'Bạn có chắc chắn muốn xóa bạn bè này không?',
                [
                    { text: 'Hủy', style: 'cancel' },
                    { text: 'Xóa', onPress: () => revokeInviteFriend(userFriendId.itemFriend._id) },
                ],
                { cancelable: false }
            );

        }
    }

    // const fetchUser = async () => {
    //     const userData = await handleGetUserById(userId.userId);
    //     setUser(userData);
    // };
    useEffect(() => {
        setUserFriend(userFriendId.itemFriend);
        getSendListFriends();
        console.log('userFriendId.itemFriend', userFriendId.itemFriend);
    }, []);

    useEffect(() => {
        if (userFriend) {
            console.log('userFriend :', userFriend);
            console.log('Danh sach nguoi da gui yeu cau ket ban', sendFriends);
        }
    }, [userFriend]);


    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <View style={styles.headerRight}>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="call-outline" size={24} color="white" />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.iconButton}>
                        <Ionicons name="ellipsis-horizontal" size={24} color="white" />
                    </TouchableOpacity>
                </View>
            </View>

            {/* Profile Image and Info */}
            <View style={styles.profileContainer}>
                <View style={styles.mainImageContainer}>
                    <Image
                        source={{ uri: 'https://media.fmplus.com.vn/uploads/tin-tuc-thoi-trang/mau-xanh-nuoc-bien/mau-xanh-nuoc-bien-la-gi-theo-vat-ly.jpg' }}
                        style={styles.mainImage}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.profileAvatarContainer}>
                    <Image
                        source={{ uri: userFriend?.avatar }}
                        style={styles.profileAvatar}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.profileInfo}>
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>{userFriend?.firstName} {userFriend?.lastName}</Text>
                        <TouchableOpacity>
                            <Ionicons name="pencil-outline" size={20} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.profileDescription}>
                        Bạn chưa thể xem nhật ký của Trà Sữa 1112 khi chưa là bạn bè
                    </Text>
                </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
                <TouchableOpacity style={styles.messageButton}>
                    <Ionicons name="chatbubble-outline" size={20} color="#3B82F6" />
                    <Text style={styles.messageButtonText}>Nhắn tin</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.addFriendButton,
                        (userFriend?.isFriend || isSentRequest) && { backgroundColor: '#d3d3d3' }
                    ]}
                    onPress={inviteFriendHandler}
                    disabled={userFriend?.isFriend || isSentRequest}
                >
                    {userFriend?.isFriend ? (
                        <Ionicons name="checkmark-circle-outline" size={20} color="#888" />
                    ) : isSentRequest ? (
                        <Ionicons name="hourglass-outline" size={20} color="#999" />
                    ) : (
                        <Ionicons name="person-add-outline" size={20} color="#333" />
                    )}
                </TouchableOpacity>


            </View>
            {userFriend?.isFriend && (
                <TouchableOpacity
                    style={{
                        height: 50,
                        backgroundColor: 'white',
                        marginTop: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginHorizontal: 40,
                        borderRadius: 30,
                        flexDirection: 'row',
                    }}
                    onPress={removeFriendHandler}
                >
                    <Text style={{ color: 'red', fontSize: 15 }}>Xóa bạn</Text>
                </TouchableOpacity>
            )}

            {/* Empty Space (rest of the screen) */}
            <View style={styles.emptySpace} />
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
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(95, 95, 95, 0.5)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 10,
    },
    backButton: {
        padding: 8,
    },
    headerRight: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        marginLeft: 12,
    },
    profileContainer: {
        alignItems: 'center',
        paddingBottom: 20,
        backgroundColor: 'white',
    },
    mainImageContainer: {
        width: '100%',
        height: 220,
        overflow: 'hidden',
    },
    mainImage: {
        width: '100%',
        height: '100%',
    },
    profileAvatarContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'white',
        overflow: 'hidden',
        marginTop: -50,
        backgroundColor: '#ccc',
    },
    profileAvatar: {
        width: '100%',
        height: '100%',
    },
    profileInfo: {
        width: '100%',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    profileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    profileName: {
        fontSize: 24,
        fontWeight: 'bold',
        marginRight: 6,
    },
    profileDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 20,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'white',
        marginTop: 1,
    },
    messageButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#e6f2ff',
        paddingVertical: 12,
        borderRadius: 20,
        marginRight: 8,
    },
    messageButtonText: {
        fontSize: 16,
        color: '#3B82F6',
        marginLeft: 6,
    },
    addFriendButton: {
        width: 60,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#f2f2f2',
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptySpace: {
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
});

export default ProfileUserScreen;