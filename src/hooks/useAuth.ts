
import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe, clearUser, setAccessToken, setRefreshToken, clearTokens } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { login, register } from '@/services/auth.service';
import { getPushToken } from "@/utils/FCMToken"
import { registerFCMToken } from '@/services/auth.service'
const useAuth = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const toJSON = (response: any) => {
        return JSON.parse(JSON.stringify(response));
    };

    const handleLogin = async (phone: string, password: string) => {
        try {
            console.log("call api login: ");
            const loginResponse = await login({ phone, password });
            console.log("call api login: ", loginResponse);

            const fcmToken = await getPushToken();
            if (fcmToken) {
                await registerFCMToken(fcmToken, loginResponse.data.user.id);
            }
            const jsonLoginResponse = toJSON(loginResponse);
            if (jsonLoginResponse.success) {

                dispatch(setAccessToken(jsonLoginResponse.data.tokens.accessToken));
                dispatch(setRefreshToken(jsonLoginResponse.data.tokens.refreshToken));
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


    return { handleLogin, handleLogout, handleRegister };
};

export default useAuth;

