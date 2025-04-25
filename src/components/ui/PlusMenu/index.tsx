import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AntDesign, Feather, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import { ROUTING } from '@/utils/constant';

interface PlusMenuProps {
    visible: boolean;
    onClose: () => void;
}

const PlusMenu = ({ visible, onClose }: PlusMenuProps) => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <Modal transparent visible={visible} animationType="fade">
            <TouchableOpacity style={styles.overlay} onPress={onClose}>
                <View style={styles.menuContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <AntDesign name="adduser" size={20} />
                        <Text style={styles.menuText}>Thêm bạn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate(ROUTING.GROUP_SCREEN)}>
                        <AntDesign name="addusergroup" size={20} />
                        <Text style={styles.menuText}>Tạo nhóm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Feather name="cloud" size={20} />
                        <Text style={styles.menuText}>Cloud của tôi</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <AntDesign name="calendar" size={20} />
                        <Text style={styles.menuText}>Lịch Zalo</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <MaterialCommunityIcons name="video-plus" size={20} />
                        <Text style={styles.menuText}>Tạo cuộc gọi nhóm</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Feather name="monitor" size={20} />
                        <Text style={styles.menuText}>Thiết bị đăng nhập</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#00000044',
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
        padding: 10,
    },
    menuContainer: {
        backgroundColor: 'white',
        borderRadius: 8,
        padding: 10,
        width: 200,
        elevation: 5,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    menuText: {
        marginLeft: 10,
        fontSize: 14,
    },
});

export default PlusMenu;
