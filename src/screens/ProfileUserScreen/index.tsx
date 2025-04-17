import React from 'react';
import { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import useUser from '@/hooks/useUser';
import { useNavigation } from '@react-navigation/native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';
import { User } from '@/models/user';


const ProfileUserScreen = () => {
    const navigation = useNavigation();
    type ProfileUserRouteProp = RouteProp<RootStackParamList, typeof ROUTING.PROFILE_USER_SCREEN>;
    const route = useRoute<ProfileUserRouteProp>();
    const userId = route.params as { userId: string };
    const { handleGetUserById } = useUser();
    const [user, setUser] = useState<User | null>(null);

    const fetchUser = async () => {
        const userData = await handleGetUserById(userId.userId);
        setUser(userData);
    };
    useEffect(() => {
        fetchUser();
        console.log('user ', user);
    }, []);


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
                        source={{ uri: user?.avatar || '' }}
                        style={styles.profileAvatar}
                        resizeMode="cover"
                    />
                </View>

                <View style={styles.profileInfo}>
                    <View style={styles.profileNameContainer}>
                        <Text style={styles.profileName}>{user?.firstName} {user?.lastName}</Text>
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

                <TouchableOpacity style={styles.addFriendButton}>
                    <Ionicons name="person-add-outline" size={20} color="#333" />
                </TouchableOpacity>
            </View>

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