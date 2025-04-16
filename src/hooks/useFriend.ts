import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import axiosConfig from '@/services/axios.config';
import { setMe } from '@/redux/userSlice';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';
import { RootState } from '@/redux/store';
import { User } from '@/models/user';
import { getFriendsList } from '@/services/friend.service';

const useFriend = () => {
    const getAllFriend = async () => {
        try {
            console.log(' Danh sách bạn bè:');
            const response = await getFriendsList();
            console.log('B1: Danh sách bạn bè:', response.data);
            console.log('B2: Danh sách bạn bè:', response.data.friends);
            return response.data.friends;
        } catch (error) {
            console.error('Error fetching friends list:', error);
            throw error;
        }
    }
    return { getAllFriend };
}

export default useFriend;
