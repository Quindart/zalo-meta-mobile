// import React, { useState } from 'react';
// import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import { NavigationProp } from '@react-navigation/native';
// import { ParamListBase } from '@react-navigation/native';
// import { Ionicons } from '@expo/vector-icons';
// import Header from '@/components/ui/Header';

// const ChangePasswordScreen = () => {
//     const navigation = useNavigation<NavigationProp<ParamListBase>>();
//     const [currentPassword, setCurrentPassword] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [confirmPassword, setConfirmPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [showNewPassword, setShowNewPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//     const isFormValid = currentPassword && newPassword && confirmPassword;


//     return (
//         <SafeAreaView style={styles.container}>
//             <Header title='Đổi mật khẩu'></Header>
//             <View style={{
//                 height: 70, backgroundColor: '#EDEDEF', alignItems: 'center', justifyContent: 'center'
//             }}>
//                 < Text style={styles.description} >
//                     Mật khẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của bạn.
//                 </Text>
//             </View >
//             {/* Nội dung chính */}
//             < View style={styles.content} >
//                 {/* Văn bản mô tả */}



//                 {/* Trường nhập liệu */}
//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Mật khẩu hiện tại:</Text>
//                     <View style={styles.inputWrapper}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nhập mật khẩu hiện tại"
//                             secureTextEntry={!showPassword}
//                             value={currentPassword}
//                             onChangeText={setCurrentPassword}
//                             placeholderTextColor="#999"
//                         />
//                         <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
//                             <Text style={styles.showText}>{showPassword ? 'ẨN' : 'HIỆN'}</Text>
//                         </TouchableOpacity>
//                     </View>
//                 </View>

//                 <View style={styles.inputContainer}>
//                     <Text style={styles.label}>Mật khẩu mới:</Text>
//                     <View style={styles.inputWrapper}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nhập mật khẩu mới"
//                             value={newPassword}
//                             onChangeText={setNewPassword}
//                             placeholderTextColor="#999"
//                             secureTextEntry={!showNewPassword}
//                         />
//                     </View>
//                 </View>
//                 <View style={styles.inputContainer}>
//                     <View style={styles.inputWrapper}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Nhập lại mật khẩu mới"
//                             value={confirmPassword}
//                             onChangeText={setConfirmPassword}
//                             placeholderTextColor="#999"
//                             secureTextEntry={!showConfirmPassword}
//                         />
//                     </View>
//                 </View>

//                 {/* Nút CẬP NHẬT */}
//                 <TouchableOpacity style={[
//                     styles.updateButton,
//                     { backgroundColor: isFormValid ? '#00A4E4' : '#e0e0e0' }
//                 ]}
//                     disabled={!isFormValid}>
//                     <Text style={styles.updateButtonText}>CẬP NHẬT</Text>
//                 </TouchableOpacity>
//             </View >
//         </SafeAreaView >
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff', // Màu nền trắng
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',
//         backgroundColor: '#00A4E4', // Màu xanh của Zalo
//         paddingVertical: 10,
//         paddingHorizontal: 15,
//     },
//     headerTitle: {
//         fontSize: 18,
//         fontWeight: 'bold',
//         color: '#fff',
//     },
//     content: {
//         flex: 1,
//         padding: 20,
//     },
//     description: {
//         fontSize: 14,
//         color: '#666',
//         textAlign: 'center',
//     },
//     inputContainer: {
//         marginBottom: 20,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 600,
//         color: '#333',
//         marginBottom: 5,
//     },
//     inputWrapper: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         borderBottomWidth: 1,
//         borderBottomColor: '#e0e0e0',
//     },
//     input: {
//         flex: 1,
//         fontSize: 16,
//         color: '#333',
//         paddingVertical: 10,
//     },
//     showText: {
//         fontSize: 14,
//         color: '#00A4E4', // Màu xanh cho nút HIỆN/ẨN
//         paddingLeft: 10,
//     },
//     updateButton: {
//         backgroundColor: '#e0e0e0', // Màu nền xám nhạt cho nút
//         paddingVertical: 12,
//         borderRadius: 25,
//         alignItems: 'center',
//         marginTop: 20,
//     },
//     updateButtonText: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         color: '#fff', // Màu chữ trắng
//     },
// });

// export default ChangePasswordScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Header from '@/components/ui/Header';
import useAuth from '@/hooks/useAuth';

const ChangePasswordScreen = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const { handleChangePassword } = useAuth();
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState('');

    // Kiểm tra các trường có rỗng không
    const isFormFilled = currentPassword && newPassword && confirmPassword;

    // Hàm kiểm tra mật khẩu
    const validatePassword = () => {
        // Kiểm tra mật khẩu hiện tại không được để trống
        if (!currentPassword) {
            setError('Vui lòng nhập mật khẩu hiện tại');
            return 1;
        }

        // Kiểm tra mật khẩu mới không được để trống
        if (!newPassword) {
            setError('Vui lòng nhập mật khẩu mới');
            return 1;
        }

        // Kiểm tra độ dài mật khẩu mới (ít nhất 8 ký tự)
        if (newPassword.length < 8) {
            setError('Mật khẩu mới phải có ít nhất 8 ký tự');
            return 1;
        }

        // Kiểm tra mật khẩu mới có chứa cả chữ và số
        if (!/[a-zA-Z]/.test(newPassword) || !/[0-9]/.test(newPassword)) {
            setError('Mật khẩu mới phải chứa cả chữ và số');
            return 1;
        }

        // Kiểm tra mật khẩu mới không trùng với mật khẩu hiện tại
        if (newPassword === currentPassword) {
            setError('Mật khẩu mới không được trùng với mật khẩu hiện tại');
            return 1;
        }

        // Kiểm tra xác nhận mật khẩu
        if (newPassword !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp');
            return 1;
        }
        return 0;
    };

    const handleUpdatePassword = async () => {
        if (validatePassword() === 1) {
            return;
        }
        await handleChangePassword(currentPassword, newPassword);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Đổi mật khẩu" />
            <View style={styles.headerDescription}>
                <Text style={styles.description}>
                    Mật khẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của bạn.
                </Text>
            </View>
            {/* Nội dung chính */}
            <View style={styles.content}>
                {error ? (
                    <Text style={styles.errorText}>{error}</Text>
                ) : null}

                {/* Trường nhập liệu */}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mật khẩu hiện tại:</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu hiện tại"
                            secureTextEntry={!showPassword}
                            value={currentPassword}
                            onChangeText={setCurrentPassword}
                            placeholderTextColor="#999"
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Text style={styles.showText}>{showPassword ? 'ẨN' : 'HIỆN'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Mật khẩu mới:</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập mật khẩu mới"
                            value={newPassword}
                            onChangeText={setNewPassword}
                            placeholderTextColor="#999"
                            secureTextEntry={!showNewPassword}
                        />
                        <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                            <Text style={styles.showText}>{showNewPassword ? 'ẨN' : 'HIỆN'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
                    <View style={styles.inputWrapper}>
                        <TextInput
                            style={styles.input}
                            placeholder="Nhập lại mật khẩu mới"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            placeholderTextColor="#999"
                            secureTextEntry={!showConfirmPassword}
                        />
                        <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                            <Text style={styles.showText}>{showConfirmPassword ? 'ẨN' : 'HIỆN'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Nút CẬP NHẬT */}
                <TouchableOpacity
                    style={[
                        styles.updateButton,
                        { backgroundColor: isFormFilled ? '#00A4E4' : '#e0e0e0' }
                    ]}
                    disabled={!isFormFilled}
                    onPress={handleUpdatePassword}
                >
                    <Text style={styles.updateButtonText}>CẬP NHẬT</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerDescription: {
        height: 70,
        backgroundColor: '#EDEDEF',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    description: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
    },
    content: {
        flex: 1,
        padding: 20,
    },
    errorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
        paddingVertical: 10,
    },
    showText: {
        fontSize: 14,
        color: '#00A4E4',
        paddingLeft: 10,
    },
    updateButton: {
        paddingVertical: 12,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 20,
    },
    updateButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
    },
});

export default ChangePasswordScreen;