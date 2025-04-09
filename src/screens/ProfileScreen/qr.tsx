import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';

const MyQRCodeScreen = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    return (
        <SafeAreaView style={styles.container}>
            <Header title='Mã QR của tôi'></Header>

            {/* Nội dung chính */}
            <View style={styles.content}>
                {/* Mã QR */}
                <Image
                    source={{ uri: 'https://khangnguyenco.vn/pub/media/magefan_blog/ma-qr-code.jpg' }}
                    style={styles.qrCode}
                />

                {/* Văn bản mô tả */}
                <Text style={styles.description}>
                    Bạn bè có thể tìm và kết nối với bạn khi quét mã QR này. Chia sẻ để có nhiều bạn hơn.
                </Text>

                {/* Nút hành động */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>CHIA SẺ MÃ QR</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>LƯU VÀO THƯ VIỆN</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff', // Màu nền trắng
    },
    content: {
        // flex: 1,
        marginTop: 110,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    qrCode: {
        width: 300,
        height: 300,
        marginBottom: 40,
    },
    description: {
        fontSize: 14,
        color: '#666', // Màu xám cho văn bản mô tả
        textAlign: 'center',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: '#E6F0FA', // Màu nền xanh nhạt cho nút
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderRadius: 25,
        marginHorizontal: 5,
        width: '50%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#00A4E4', // Màu chữ xanh đậm
    },
});

export default MyQRCodeScreen;