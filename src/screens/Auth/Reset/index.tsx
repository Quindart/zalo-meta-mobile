import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { verifyOTP, resetPassword } from '@/services/auth.service';
import { ROUTING } from '@/utils/constant';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/type';
import Toast from 'react-native-toast-message';
import { OtpInput } from "react-native-otp-entry";
import styles from './css';
const ResetPasswordTemplate = () => {
    const route = useRoute();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [otp, setOtp] = useState('');
    const [newPass, setNewPass] = useState('');
    const [resetToken, setResetToken] = useState('');
    const [newPassConfirm, setNewPassConfirm] = useState('');
    const [isOtpVerified, setIsOtpVerified] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { email } = route.params as { email: string };

    const handleOtpChange = (newValue: any) => {
        setOtp(newValue);
        setErrorMessage('');
    };

    const handlePasswordChange = (text: string) => {
        setNewPass(text);
    };

    const handlePasswordConfirmChange = (text: string) => {
        setNewPassConfirm(text);
    };

    const handleVerifyOtp = async () => {
        if (otp.length !== 6) {
            setErrorMessage('OTP phải có 6 ký tự');
            return;
        }
        const result = await verifyOTP(otp, email);

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }
        setResetToken(result.reset_token);
        setIsOtpVerified(true);
        setErrorMessage('');
    };

    const handleResetPassword = async () => {
        if (!isOtpVerified) {
            setErrorMessage('Vui lòng xác thực OTP trước');
            return;
        }

        if (!newPass) {
            setErrorMessage('Vui lòng nhập mật khẩu mới');
            return;
        }

        if (newPass !== newPassConfirm) {
            setErrorMessage('Mật khẩu xác nhận không khớp');
            return;
        }

        if (newPass.length < 8) {
            setErrorMessage('Mật khẩu phải có ít nhất 8 ký tự');
            return;
        }

        setIsSubmitting(true);
        try {
            const responseReset = await resetPassword(email, newPass, resetToken);
            if (responseReset.success) {
                Toast.show({
                    position: 'bottom',
                    visibilityTime: 2000,
                    type: 'success',
                    text1: 'Thành công',
                    text2: 'Mật khẩu đã được đặt lại'
                });
                navigation.navigate(ROUTING.LOGIN);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'bottom',
                    visibilityTime: 2000,
                    text1: 'Lỗi',
                    text2: 'Đặt lại mật khẩu thất bại'
                });
            }
        } catch (error) {
            Toast.show({
                type: 'error',
                position: 'bottom',
                visibilityTime: 2000,
                text1: 'Lỗi',
                text2: 'Có lỗi xảy ra khi đặt lại mật khẩu'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {isOtpVerified ? 'Đặt mật khẩu mới' : 'Nhập mã OTP'}
            </Text>

            {!isOtpVerified && (
                <>
                    <OtpInput numberOfDigits={6}
                        onTextChange={handleOtpChange}
                    />
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleVerifyOtp}
                    >
                        <Text style={styles.buttonText}>Xác thực OTP</Text>
                    </TouchableOpacity>
                </>
            )}

            {isOtpVerified && (
                <View style={styles.passwordContainer}>
                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={newPass}
                            onChangeText={handlePasswordChange}
                            secureTextEntry
                            placeholder="Mật khẩu mới"
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Icon name="lock" size={24} color="#666" style={styles.icon} />
                        <TextInput
                            style={styles.input}
                            value={newPassConfirm}
                            onChangeText={handlePasswordConfirmChange}
                            secureTextEntry
                            placeholder="Nhập lại mật khẩu"
                        />
                    </View>

                    <TouchableOpacity
                        style={[styles.button, isSubmitting && styles.buttonDisabled]}
                        onPress={handleResetPassword}
                        disabled={isSubmitting}
                    >
                        <Text style={styles.buttonText}>
                            {isSubmitting ? 'Đang xử lý...' : 'Đặt lại mật khẩu'}
                        </Text>
                    </TouchableOpacity>
                </View>
            )}

            {errorMessage && (
                <Text style={styles.errorText}>{errorMessage}</Text>
            )}
        </View>
    );
};



export default ResetPasswordTemplate;