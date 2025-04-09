import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    TextInput
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PhoneInputBase from 'react-native-phone-number-input';
import { ROUTING } from '@/utils/constant';
import { findUserByPhone } from '@/services/user.service';
import { sendOTP } from '@/services/auth.service';
import { RootStackParamList } from '@/navigation/type';
import styles from './css';
const PhoneInputWrapper = ({
    value,
    onChangeFormattedText,
    ...props
}: {
    value: string;
    onChangeFormattedText: (text: string) => void;
    [key: string]: any
}) => {
    return (
        <PhoneInputBase
            defaultCode="VN"
            value={value}
            onChangeFormattedText={onChangeFormattedText}
            containerStyle={styles.phoneInputContainer}
            textContainerStyle={styles.phoneTextContainer}
            textInputStyle={styles.phoneTextInput}
            codeTextStyle={styles.phoneCodeText}
            {...props}
        />
    );
};
function ForgotPasswordTemplate() {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errMessage, setErrMessage] = useState('');

    const verifyPhone = async (phone: string) => {
        phone = phone.replace('+84', '0');
        if (!phone) {
            setErrMessage('Vui lòng nhập số điện thoại!');
            return;
        }
        else if (phone.length < 10) {
            setErrMessage('Số điện thoại không hợp lệ!');
            return;
        }
        const response = await findUserByPhone(phone);
        console.log('Check data: ', response);
        if (response && response.status === 200 && response.user) {
            const email = response.user?.email;
            const otpResult = await sendOTP(email);
            console.log('check result:', otpResult);
            setIsSubmitted(true);
            navigation.navigate(ROUTING.RESET_PASSWORD, { email });
        } else {
            setErrMessage(response.message);
            setIsSubmitted(!isSubmitted);
        }
    };
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>
                Nhập số điện thoại của bạn
            </Text>

            <View style={styles.formGroup}>
                <View style={styles.inputContainer}>
                    <Icon name="smartphone" size={15} color="#424242" />
                    <PhoneInputWrapper
                        value={phoneNumber}
                        onChangeFormattedText={(text) => setPhoneNumber(text)}
                    />
                </View>

                {isSubmitted ? (
                    <Text style={styles.errorText}>
                        {errMessage}
                    </Text>
                ) : null}

                <TouchableOpacity
                    onPress={() => verifyPhone(phoneNumber)}
                    style={styles.continueButton}
                >
                    <Text style={styles.buttonText}>Tiếp tục</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTING.LOGIN)}
                    style={styles.backButton}
                >
                    <Text style={styles.backButtonText}>« Quay lại</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default ForgotPasswordTemplate;