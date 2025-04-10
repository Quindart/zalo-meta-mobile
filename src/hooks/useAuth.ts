// import { Alert } from 'react-native';
// import { useDispatch } from 'react-redux';
// import axiosConfig from '@/services/axios.config';
// import { setMe, clearUser } from '@/redux/userSlice';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { ROUTING } from '@/utils/constant';
// import { setTokens, clearTokens } from '@/utils/tokenManager'; // Import từ tokenManager
// import { login, register, changePassword } from '@/services/auth.service';
// import { getAccessToken } from '@/utils/tokenManager';

// const useAuth = () => {
//     const navigation = useNavigation<NavigationProp<ParamListBase>>();
//     const dispatch = useDispatch();

//     const toJSON = (response: any) => {
//         return JSON.parse(JSON.stringify(response));
//     };

//     const handleLogin = async (phone: string, password: string) => {
//         try {
//             const loginResponse = await login({ phone, password });
//             const jsonLoginResponse = toJSON(loginResponse);
//             if (jsonLoginResponse.success) {
//                 // console.log('Đăng nhập thành công', loginResponse);
//                 setTokens(
//                     loginResponse.data.tokens.accessToken,
//                     loginResponse.data.tokens.refreshToken
//                 );

//                 const userId = loginResponse.data.user.id;
//                 const userResponse = await axiosConfig.get(`/api/v1/users/${userId}`);
//                 const jsonUserResponse = toJSON(userResponse);

//                 if (jsonUserResponse.success) {
//                     dispatch(setMe(jsonUserResponse.user));
//                     navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
//                     Alert.alert('Đăng nhập thành công');
//                 } else {
//                     Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng');
//                 }
//             } else {
//                 Alert.alert('Lỗi', jsonLoginResponse.message);
//             }
//         } catch (error) {
//             Alert.alert('Lỗi', error instanceof Error ? error.message : String(error));
//         }
//     };

//     const handleLogout = () => {
//         clearTokens();
//         dispatch(clearUser());
//         navigation.navigate(ROUTING.HOME);
//         Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công');
//     };

//     const handleRegister = async (userData: { phone: string; password: string; email: string; avatar: string; firstName: string; lastName: string; dateOfBirth: string }) => {
//         try {
//             const registerResponse = await register(userData)
//             const jsonRegisterResponse = toJSON(registerResponse);

//             if (jsonRegisterResponse.success) {
//                 console.log('Đăng ký thành công', registerResponse);
//                 navigation.navigate(ROUTING.HOME);
//                 Alert.alert('Đăng ký thành công');
//             } else {
//                 // console.error('Đăng ký thất bại');
//                 Alert.alert('Lỗi', 'Đăng ký thất bại');
//             }
//         } catch (error) {
//             // console.error('Đăng ký thất bại', error);
//             Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký');
//         }
//     };

//     const handleChangePassword = async (password: string, newPassword: string) => {
//         try {
//             const changePasswordResponse = await changePassword({ password, newPassword });
//             const jsonChangePasswordResponse = toJSON(changePasswordResponse);
//             if (jsonChangePasswordResponse.success) {
//                 navigation.goBack();
//             } else {
//                 return changePasswordResponse?.data.message;
//             }
//         } catch (error: any) {
//             // console.error('Đổi mật khẩu thất bại', error);
//             Alert.alert('Lỗi', 'Có lỗi xảy ra khi đổi mật khẩu: ' + (error.response?.data?.message || error.message));
//         }
//     };


//     return { handleLogin, handleLogout, handleRegister, handleChangePassword };
// };

// export default useAuth;

import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe, clearUser } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { setTokens, clearTokens } from '@/utils/tokenManager'; // Import từ tokenManager
import { login, register, changePassword } from '@/services/auth.service';
import { getAccessToken } from '@/utils/tokenManager';


const useAuth = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const toJSON = (response: any) => {
        return JSON.parse(JSON.stringify(response));
    };

    const handleLogin = async (phone: string, password: string) => {
        try {
            const loginResponse = await login({ phone, password });
            const jsonLoginResponse = toJSON(loginResponse);
            if (jsonLoginResponse.success) {
                // console.log('Đăng nhập thành công', loginResponse);
                setTokens(
                    loginResponse.data.tokens.accessToken,
                    loginResponse.data.tokens.refreshToken
                );

                const userId = loginResponse.data.user.id;
                const userResponse = await axiosConfig.get(`/api/v1/users/${userId}`);
                const jsonUserResponse = toJSON(userResponse);

                if (jsonUserResponse.success) {
                    dispatch(setMe(jsonUserResponse.user));
                    navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
                    return jsonUserResponse.message;
                } else {
                    return jsonUserResponse.message;
                }
            } else {
                Alert.alert('Lỗi', jsonLoginResponse.message);
            }
        } catch (error) {
            // console.error('Đăng nhập thất bại', error);
            const err = error as any;
            return (err.response?.data?.message || err.message)
        }
    };

    const handleLogout = () => {
        clearTokens();
        dispatch(clearUser());
        navigation.navigate(ROUTING.HOME);
        Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công');
    };

    const handleRegister = async (userData: { phone: string; password: string; email: string; avatar: string; firstName: string; lastName: string; dateOfBirth: string }) => {
        try {
            const registerResponse = await register(userData)
            const jsonRegisterResponse = toJSON(registerResponse);

            if (jsonRegisterResponse.success) {
                Alert.alert('Đăng ký thành công');
                navigation.navigate(ROUTING.HOME);
            } else {
                Alert.alert('Lỗi', 'Đăng ký thất bại');
            }
        } catch (error) {
            //Xảy ra lỗi khi gọi API
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký');
        }
    };

    const handleChangePassword = async (password: string, newPassword: string) => {
        try {
            // Lấy accessToken
            const accessToken = getAccessToken();
            if (!accessToken) {
                console.error('B1: Không tìm thấy accessToken');
                Alert.alert('Lỗi', 'Không tìm thấy token. Vui lòng đăng nhập lại.');
                navigation.navigate(ROUTING.HOME);
                return;
            }

            // Tạo dữ liệu gửi lên server
            const passwordData = {
                password, // Mật khẩu hiện tại
                newPassword, // Mật khẩu mới
            };

            console.log('B2: Password data', passwordData);
            console.log('B3: accessToken', accessToken);

            // Gửi yêu cầu thay đổi mật khẩu
            const changeResponse = await axiosConfig.put('/api/v1/me/change-password', passwordData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });

            const jsonChangeResponse = toJSON(changeResponse);

            if (jsonChangeResponse.success) {
                // Hiển thị thông báo thành công
                // console.log('Thay đổi mật khẩu thành công', jsonChangeResponse);
                Alert.alert('Thành công', 'Thay đổi mật khẩu thành công');

                // Điều hướng về màn hình trước đó
                navigation.goBack();
            } else {
                // console.error('B4: Thay đổi mật khẩu thất bại - Response không thành công', jsonChangeResponse);
                Alert.alert('Lỗi', 'Thay đổi mật khẩu thất bại');
            }
        } catch (error: any) {
            // console.error('B5: Thay đổi mật khẩu thất bại', error.message);
            // console.error('B5: Error response', error.response?.data);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi thay đổi mật khẩu: ' + (error.response?.data?.message || error.message));
        }
    };

    return { handleLogin, handleLogout, handleRegister, handleChangePassword };
};

export default useAuth;

