import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { getAccessToken } from '@/utils/tokenManager';
import { User } from '@/models/user';

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
        // Kiểm tra xem các giá trị có hợp lệ không
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
            // Kiểm tra xem user có tồn tại không
            if (!user || !user._id) {
                console.error('B1: User không tồn tại hoặc không có _id');
                Alert.alert('Lỗi', 'Không tìm thấy thông tin người dùng. Vui lòng đăng nhập lại.');
                navigation.navigate(ROUTING.HOME);
                return;
            }

            // Lấy accessToken
            const accessToken = getAccessToken();
            if (!accessToken) {
                console.error('B2: Không tìm thấy accessToken');
                Alert.alert('Lỗi', 'Không tìm thấy token. Vui lòng đăng nhập lại.');
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
                    console.error('B3.1: Invalid dateOfBirth', userData.dateOfBirth);
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

            console.log('B3: FormData', formData);
            console.log('B4: userData', userData);
            console.log('B5: accessToken', accessToken);

            // Gửi yêu cầu cập nhật thông tin user
            const updateResponse = await axiosConfig.put('/api/v1/me', formData, {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            const jsonUpdateResponse = toJSON(updateResponse);

            if (jsonUpdateResponse.success) {
                // Cập nhật thông tin user trong Redux
                // Sử dụng dữ liệu từ server thay vì merge userData
                const updatedUser: User = {
                    ...user,
                    firstName: jsonUpdateResponse.user.firstName,
                    lastName: jsonUpdateResponse.user.lastName,
                    dateOfBirth: jsonUpdateResponse.user.dateOfBirth,
                    avatar: jsonUpdateResponse.user.avatar || user.avatar,
                    updatedAt: jsonUpdateResponse.user.updatedAt,
                };
                console.log('B8: Updated user before dispatch', updatedUser);
                dispatch(setMe(updatedUser));
                console.log('B9: Dispatched updated user to Redux');

                // Hiển thị thông báo thành công
                console.log('Cập nhật thông tin thành công', jsonUpdateResponse.user);
                Alert.alert('Thành công', 'Cập nhật thông tin thành công');

                // Điều hướng về màn hình trước đó
                navigation.goBack();
            } else {
                console.error('B6: Cập nhật thất bại - Response không thành công', jsonUpdateResponse);
                Alert.alert('Lỗi', 'Cập nhật thông tin thất bại');
            }
        } catch (error: any) {
            console.error('B7: Cập nhật thông tin thất bại', error.message);
            console.error('B7: Error response', error.response?.data);
            Alert.alert('Lỗi', 'Có lỗi xảy ra khi cập nhật thông tin: ' + (error.response?.data?.message || error.message));
        }
    };
    return { handleUpdateUser };
};

export default useUser;