
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Header from '@/components/ui/Header';
import useUser from '@/hooks/useUser';

const ChangePasswordScreen = () => {
    const { handleChangePassword } = useUser();
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Yup validation schema
    const validationSchema = Yup.object().shape({
        currentPassword: Yup.string()
            .min(8, 'Mật khẩu hiện tại phải có ít nhất 8 ký tự')
            .required('Vui lòng nhập mật khẩu hiện tại'),
        newPassword: Yup.string()
            .min(8, 'Mật khẩu mới phải có ít nhất 8 ký tự')
            .notOneOf([Yup.ref('currentPassword')], 'Mật khẩu mới không được trùng với mật khẩu hiện tại')
            .required('Vui lòng nhập mật khẩu mới'),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref('newPassword')], 'Mật khẩu xác nhận không khớp')
            .required('Vui lòng nhập lại mật khẩu mới'),
    });

    const handleUpdatePassword = async (values: any, { setSubmitting, setErrors }: any) => {
        try {
            await handleChangePassword(values.currentPassword, values.newPassword);
        } catch (error: any) {
            setErrors({ apiError: error.message });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Đổi mật khẩu" />
            <View style={styles.headerDescription}>
                <Text style={styles.description}>
                    Mật khẩu phải gồm chữ và số, không được chứa năm sinh, username và tên Zalo của bạn.
                </Text>
            </View>
            <Formik
                initialValues={{
                    currentPassword: '',
                    newPassword: '',
                    confirmPassword: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleUpdatePassword}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isSubmitting,
                }) => (
                    <View style={styles.content}>

                        {/* Current Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu hiện tại:</Text>
                            {touched.currentPassword && errors.currentPassword && (
                                <Text style={styles.errorText}>{errors.currentPassword}</Text>
                            )}
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập mật khẩu hiện tại"
                                    secureTextEntry={!showPassword}
                                    value={values.currentPassword}
                                    onChangeText={handleChange('currentPassword')}
                                    onBlur={handleBlur('currentPassword')}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    <Text style={styles.showText}>{showPassword ? 'ẨN' : 'HIỆN'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* New Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Mật khẩu mới:</Text>
                            {touched.newPassword && errors.newPassword && (
                                <Text style={styles.errorText}>{errors.newPassword}</Text>
                            )}
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập mật khẩu mới"
                                    secureTextEntry={!showNewPassword}
                                    value={values.newPassword}
                                    onChangeText={handleChange('newPassword')}
                                    onBlur={handleBlur('newPassword')}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)}>
                                    <Text style={styles.showText}>{showNewPassword ? 'ẨN' : 'HIỆN'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Confirm Password */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Xác nhận mật khẩu mới:</Text>
                            {touched.confirmPassword && errors.confirmPassword && (
                                <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                            )}
                            <View style={styles.inputWrapper}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Nhập lại mật khẩu mới"
                                    secureTextEntry={!showConfirmPassword}
                                    value={values.confirmPassword}
                                    onChangeText={handleChange('confirmPassword')}
                                    onBlur={handleBlur('confirmPassword')}
                                    placeholderTextColor="#999"
                                />
                                <TouchableOpacity
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                >
                                    <Text style={styles.showText}>{showConfirmPassword ? 'ẨN' : 'HIỆN'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        {/* Update Button */}
                        <TouchableOpacity
                            style={[
                                styles.updateButton,
                                { backgroundColor: isSubmitting ? '#e0e0e0' : '#00A4E4' },
                            ]}
                            onPress={() => handleSubmit()}
                            disabled={isSubmitting}
                        >
                            <Text style={styles.updateButtonText}>
                                {isSubmitting ? 'Đang cập nhật...' : 'CẬP NHẬT'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            </Formik>
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
    apiErrorText: {
        fontSize: 14,
        color: 'red',
        marginBottom: 10,
        textAlign: 'center',
    },
    errorText: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
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