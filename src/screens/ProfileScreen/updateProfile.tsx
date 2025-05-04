import React, { useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    Alert,
    ActivityIndicator,
} from 'react-native';
import { useNavigation, NavigationProp, ParamListBase } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import useUser from '@/hooks/useUser';
import * as ImagePicker from 'expo-image-picker';

const formatDate = (date: Date): string => {
    if (isNaN(date.getTime())) {
        return '';
    }
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
};

const UpdateProfile = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const user = useSelector((state: RootState) => state.user.user);
    const { handleUpdateUser } = useUser();
    const [isLoading, setIsLoading] = useState(false); // Thêm trạng thái loading

    if (!user) {
        return (
            <View style={styles.container}>
                <Text>Bạn chưa đăng nhập!</Text>
                <TouchableOpacity
                    style={styles.saveButton}
                    onPress={() => navigation.navigate(ROUTING.HOME)}
                >
                    <Text style={styles.saveButtonText}>Đi đến màn hình đăng nhập</Text>
                </TouchableOpacity>
            </View>
        );
    }

    // Khởi tạo birthday với giá trị hợp lệ
    const initialBirthday = user.dateOfBirth ? new Date(user.dateOfBirth) : new Date();
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [birthday, setBirthday] = useState(isNaN(initialBirthday.getTime()) ? new Date() : initialBirthday);
    const [avatar, setAvatar] = useState(user.avatar || '');
    const [focusedInput, setFocusedInput] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);

    const onChangeDate = (event: any, selectedDate?: Date) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setBirthday(selectedDate);
        }
    };

    const pickImage = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Lỗi', 'Cần quyền truy cập thư viện ảnh để chọn hình!');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images, // Corrected to use MediaTypeOptions.Images
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
        });

        if (!result.canceled) {
            setAvatar(result.assets[0].uri);
            console.log('Avatar selected:', result.assets[0].uri);
        }
    };

    const handleSave = async () => {
        // Validation
        if (!firstName || !lastName) {
            Alert.alert('Lỗi', 'Vui lòng nhập đầy đủ họ và tên');
            return;
        }

        // Kiểm tra dateOfBirth
        const formattedDate = formatDate(birthday);
        if (!formattedDate || formattedDate.includes('NaN')) {
            Alert.alert('Lỗi', 'Ngày sinh không hợp lệ. Vui lòng chọn lại ngày sinh.');
            return;
        }

        const userData: {
            firstName?: string;
            lastName?: string;
            dateOfBirth?: string;
            avatar?: { uri: string; name: string; type: string };
        } = {
            firstName,
            lastName,
            dateOfBirth: formattedDate,
        };

        // Chỉ gửi avatar nếu người dùng chọn ảnh mới
        if (avatar && avatar !== user.avatar) {
            userData.avatar = {
                uri: avatar,
                name: `avatar-${Date.now()}.jpg`,
                type: 'image/jpeg',
            };
        }

        console.log('Sending userData:', userData);
        setIsLoading(true); // Bật loading
        try {
            await handleUpdateUser(userData);
        } finally {
            setIsLoading(false); // Tắt loading dù thành công hay thất bại
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <Header title="Chỉnh sửa thông tin" showBackButton={true} />
                    <View style={styles.content}>
                        <View style={{ flexDirection: 'row' }}>
                            {/* Ảnh đại diện */}
                            <View style={styles.avatarContainer}>
                                <Image
                                    source={{ uri: avatar || 'null' }}
                                    style={styles.avatar}
                                />
                                <TouchableOpacity style={styles.cameraIcon} onPress={pickImage}>
                                    <Ionicons name="camera" size={20} color="#fff" />
                                </TouchableOpacity>
                            </View>

                            <View style={{ width: '70%', marginLeft: 20 }}>
                                {/* Họ */}
                                <View style={styles.inputContainer}>
                                    <View
                                        style={[
                                            styles.inputWrapper,
                                            focusedInput === 'firstName' && styles.inputWrapperFocused,
                                        ]}
                                    >
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nhập họ của bạn"
                                            value={firstName}
                                            onChangeText={setFirstName}
                                            placeholderTextColor="#999"
                                            onFocus={() => setFocusedInput('firstName')}
                                            onBlur={() => setFocusedInput('')}
                                        />
                                        <TouchableOpacity onPress={() => setFirstName('')}>
                                            <Ionicons name="pencil" size={20} color="#666" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Tên */}
                                <View style={styles.inputContainer}>
                                    <View
                                        style={[
                                            styles.inputWrapper,
                                            focusedInput === 'lastName' && styles.inputWrapperFocused,
                                        ]}
                                    >
                                        <TextInput
                                            style={styles.input}
                                            placeholder="Nhập tên của bạn"
                                            value={lastName}
                                            onChangeText={setLastName}
                                            placeholderTextColor="#999"
                                            onFocus={() => setFocusedInput('lastName')}
                                            onBlur={() => setFocusedInput('')}
                                        />
                                        <TouchableOpacity onPress={() => setLastName('')}>
                                            <Ionicons name="pencil" size={20} color="#666" />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                                {/* Ngày sinh */}
                                <View style={styles.inputContainer}>
                                    <TouchableOpacity
                                        style={styles.inputWrapper}
                                        onPress={() => setShowDatePicker(true)}
                                    >
                                        <TextInput
                                            editable={false}
                                            style={styles.input}
                                            value={formatDate(birthday)}
                                            placeholder="Chọn ngày sinh"
                                            placeholderTextColor="#999"
                                        />
                                        <View>
                                            <Ionicons name="pencil" size={20} color="#666" />
                                        </View>
                                    </TouchableOpacity>
                                    {showDatePicker && (
                                        <DateTimePicker
                                            value={birthday}
                                            mode="date"
                                            display="default"
                                            onChange={onChangeDate}
                                        />
                                    )}
                                </View>
                            </View>
                        </View>

                        {/* Nút lưu */}
                        <TouchableOpacity
                            style={[styles.saveButton, isLoading && styles.saveButtonDisabled]}
                            onPress={handleSave}
                            disabled={isLoading}
                        >
                            <Text style={styles.saveButtonText}>LƯU</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>

                {/* Lớp phủ mờ khi loading */}
                {isLoading && (
                    <View style={styles.loadingOverlay}>
                        <ActivityIndicator size="large" color="#00A4E4" />
                    </View>
                )}
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    content: {
        flex: 1,
        padding: 20,
    },
    avatarContainer: {
        alignItems: 'center',
        marginBottom: 20,
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
    },
    cameraIcon: {
        position: 'absolute',
        top: 50,
        right: -4,
        backgroundColor: '#00A4E4',
        borderRadius: 15,
        padding: 5,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    inputWrapperFocused: {
        borderBottomColor: '#00A4E4',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    saveButton: {
        backgroundColor: '#00A4E4',
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: 30,
    },
    saveButtonDisabled: {
        backgroundColor: '#99CFFF',
        opacity: 0.6,
    },
    saveButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
    loadingOverlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Mờ với độ trong suốt
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000, // Đảm bảo lớp phủ ở trên cùng
    },
});

export default UpdateProfile;