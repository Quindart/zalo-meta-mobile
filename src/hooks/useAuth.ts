import { Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe, clearUser } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { setTokens, clearTokens } from '@/utils/tokenManager'; // Import từ tokenManager

const useAuth = () => {
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const dispatch = useDispatch();

    const toJSON = (response: any) => {
        return JSON.parse(JSON.stringify(response));
    };

    const login = async (phone: string, password: string) => {
        try {

            //Kiểm tra dữ liệu đầu vào 
            if (!phone || !password) {
                Alert.alert('Lỗi', 'Vui lòng nhập số điện thoại và mật khẩu. Không được để trống');
                return;
            }
            if (phone.length !== 10) {
                Alert.alert('Lỗi', 'Số điện thoại phải có 10 số');
                return;
            }
            if (password.length < 8) {
                Alert.alert('Lỗi', 'Mật khẩu phải có ít nhất 6 ký tự');
                return;
            }

            const loginResponse = await axiosConfig.post('/api/v1/auth/login', { phone, password });
            const jsonLoginResponse = toJSON(loginResponse);

            if (jsonLoginResponse.success) {
                console.log('Đăng nhập thành công', loginResponse);

                // Lưu token vào biến toàn cục thay vì AsyncStorage
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
                    console.error('Lấy thông tin user vào Redux thất bại');
                    Alert.alert('Lỗi', 'Không thể lấy thông tin người dùng');
                }
            } else {
                console.error('Đăng nhập thất bại');
                Alert.alert('Lỗi', 'Đăng nhập thất bại');
            }
        } catch (error) {
            console.error('Đăng nhập thất bại', error);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi đăng nhập');
        }
    };

    const logout = () => {
        // Xóa token khỏi biến toàn cục
        clearTokens();
        dispatch(clearUser());
        navigation.navigate(ROUTING.HOME);
        Alert.alert('Đăng xuất', 'Bạn đã đăng xuất thành công');
    };

    return { login, logout };
};

export default useAuth;