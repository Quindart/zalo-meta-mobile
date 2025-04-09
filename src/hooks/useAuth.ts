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
                    Alert.alert('Đăng nhập thành công');
                } else {
                    Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng');
                }
            } else {
                Alert.alert('Lỗi', jsonLoginResponse.message);
            }
        } catch (error) {
            Alert.alert('Lỗi', error instanceof Error ? error.message : String(error));
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
                console.log('Đăng ký thành công', registerResponse);
                navigation.navigate(ROUTING.HOME);
                Alert.alert('Đăng ký thành công');
            } else {
                // console.error('Đăng ký thất bại');
                Alert.alert('Lỗi', 'Đăng ký thất bại');
            }
        } catch (error) {
            // console.error('Đăng ký thất bại', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng ký');
        }
    };

    const handleChangePassword = async (password: string, newPassword: string) => {
        try {
            const changePasswordResponse = await changePassword({ password, newPassword });
            const jsonChangePasswordResponse = toJSON(changePasswordResponse);
            if (jsonChangePasswordResponse.success) {
                navigation.goBack();
            } else {
                return changePasswordResponse?.data.message;
            }
        } catch (error: any) {
            // console.error('Đổi mật khẩu thất bại', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đổi mật khẩu: ' + (error.response?.data?.message || error.message));
        }
    };


    return { handleLogin, handleLogout, handleRegister, handleChangePassword };
};

export default useAuth;