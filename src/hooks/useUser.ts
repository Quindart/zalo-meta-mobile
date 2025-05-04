import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { User } from '@/models/user';
import { changePassword, searchUserByPhone, getUserById } from '@/services/user.service';


const useUser = () => {

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user.user) as User | null;

    const toJSON = (response: any) => {
        return JSON.parse(JSON.stringify(response));
    };

    // Hàm chuyển định dạng ngày sang ISO (YYYY-MM-DD)
    const formatDateToISO = (dateStr: string): string => {
        const [day, month, year] = dateStr.split('/');
        if (!day || !month || !year || isNaN(parseInt(day)) || isNaN(parseInt(month)) || isNaN(parseInt(year))) {
            throw new Error('Invalid date format');
        }
        return `${year}-${month}-${day}`;
    };


    const handleUpdateUser = async (userData: {
        firstName?: string;
        lastName?: string;
        dateOfBirth?: string;
        avatar?: { uri: string; name: string; type: string };
    }) => {
        try {
            if (!user || !user.id) {
                Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
                navigation.navigate(ROUTING.HOME);
                return;
            }
            // Tạo FormData
            const formData = new FormData();
            if (userData.firstName) formData.append('firstName', userData.firstName);
            if (userData.lastName) formData.append('lastName', userData.lastName);
            if (userData.dateOfBirth) {
                try {
                    const isoDate = formatDateToISO(userData.dateOfBirth);
                    formData.append('dateOfBirth', isoDate);
                } catch (error) {
                    Alert.alert('Lỗi', 'Ngày sinh không hợp lệ. Vui lòng kiểm tra lại.');
                    return;
                }
            }
            if (userData.avatar) {
                formData.append('avatar', {
                    uri: userData.avatar.uri,
                    name: userData.avatar.name,
                    type: userData.avatar.type,
                } as any);

            }

            const updateResponse = await axiosConfig.put('/api/v1/me', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const jsonUpdateResponse = toJSON(updateResponse);

            if (jsonUpdateResponse.success) {
                const updatedUser: User = {
                    ...user,
                    firstName: jsonUpdateResponse.user.firstName,
                    lastName: jsonUpdateResponse.user.lastName,
                    dateOfBirth: jsonUpdateResponse.user.dateOfBirth,
                    avatar: jsonUpdateResponse.user.avatar || user.avatar,
                    updatedAt: jsonUpdateResponse.user.updatedAt,
                };
                dispatch(setMe(updatedUser));
                Alert.alert('Thành công', 'Cập nhật thông tin thành công');
                navigation.goBack();
            } else {
                Alert.alert('Lỗi', 'Cập nhật thông tin thất bại');
            }
        } catch (error: any) {

            return;
        }
    };


    const handleChangePassword = async (password: string, newPassword: string) => {
        try {
            const changeResponse = await changePassword({ password, newPassword });
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

    const handleSearchUserByPhone = async (keywords: string) => {
        try {
            if (!keywords) {
                return null;
            }
            const type = 'phone';
            const response = await searchUserByPhone(type, keywords);
            const data = toJSON(response);
            if (data.success) {
                return data.users;
            } else {
                Alert.alert('Lỗi', data.message || 'Không tìm thấy người dùng');
                return null;
            }
        } catch (error: any) {
            Alert.alert('Lỗi', error.response?.data?.message || error.message || 'Lỗi không xác định');
            return null;
        }
    };

    const handleGetUserById = async (userId: string) => {
        try {
            if (!userId) {
                return null;
            }
            const response = await getUserById(userId);
            const data = toJSON(response);
            if (data.success) {
                return data.user;
            } else {
                Alert.alert('Lỗi', data.message || 'Không tìm thấy người dùng');
                return null;
            }
        }
        catch (error: any) {
            Alert.alert('Lỗi', error.response?.data?.message || error.message || 'Lỗi không xác định');
            return null;
        }
    };


    return { handleUpdateUser, handleChangePassword, handleSearchUserByPhone, handleGetUserById };
};

export default useUser;

