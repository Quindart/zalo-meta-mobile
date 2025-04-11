
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe, clearUser, setAccessToken, setRefreshToken, clearTokens } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
// import { setTokens, clearTokens } from '@/utils/tokenManager'; // Import từ tokenManager
import { login, register, changePassword } from '@/services/auth.service';


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

                dispatch(setAccessToken(jsonLoginResponse.data.tokens.accessToken));
                dispatch(setRefreshToken(jsonLoginResponse.data.tokens.refreshToken));
                // setTokens(
                //     loginResponse.data.tokens.accessToken,
                //     loginResponse.data.tokens.refreshToken
                // );
                const userId = loginResponse.data.user.id;
                const userResponse = await axiosConfig.get(`/api/v1/users/${userId}`);
                const jsonUserResponse = toJSON(userResponse);

                if (jsonUserResponse.success) {
                    dispatch(setMe(jsonUserResponse.user));
                    navigation.navigate(ROUTING.TAB_WITH_HEADER_NAVIGATION);
                } else {
                    Alert.alert('Lỗi', jsonUserResponse.message);
                }
            } else {
                Alert.alert('Lỗi', jsonLoginResponse.message);
            }
        } catch (error) {
            const err = error as any;
            Alert.alert('Lỗi', err.response?.data?.message || 'Có lỗi xảy ra khi đăng nhập');
        }
    };

    const handleLogout = () => {
        dispatch(clearTokens());
        // clearTokens();
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
                Alert.alert('Lỗi', jsonRegisterResponse.message);
            }
        } catch (error) {
            Alert.alert('Lỗi', (error as any).response?.data?.message);
        }
    };

    const handleChangePassword = async (password: string, newPassword: string) => {
        try {
            const passwordData = {
                password, // Mật khẩu hiện tại
                newPassword, // Mật khẩu mới
            };
            // Gửi yêu cầu thay đổi mật khẩu
            const changeResponse = await axiosConfig.put('/api/v1/me/change-password', passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const jsonChangeResponse = toJSON(changeResponse);
            if (jsonChangeResponse.success) {
                navigation.goBack();
                Alert.alert('Thành công', jsonChangeResponse.message);
            } else {
                Alert.alert('Lỗi', jsonChangeResponse.message);
            }
        } catch (error: any) {
            Alert.alert('Lỗi', (error.response?.data?.message || error.message));
        }
    };

    return { handleLogin, handleLogout, handleRegister, handleChangePassword };
};

export default useAuth;

