import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Swiper from 'react-native-swiper';
import styles from './css'
import RootLayout from '@/layout/RootLayout';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { ROUTING } from '@/utils/constant';

interface SlideData {
  title: string;
  description: string;
  image: string;
}

const slideDatas: SlideData[] = [

  {
    title: 'Gửi ảnh nhanh chóng',
    description: 'Trao đổi hình ảnh chất lượng cao với bạn bè và người thân thật nhanh và dễ dàng',
    image: 'https://img.freepik.com/free-vector/send-message-by-phone-concept-illustration_114360-26520.jpg?t=st=1736961615~exp=1736965215~hmac=19d68e6dedaf01bfe958ab6c944d227e0441d7e3433c74ac755ff957ec38aa6a&w=740',
  },
  {
    title: 'Chat nhóm tiện ích',
    description: 'Nơi cùng nhau trò chuyện, chia sẻ thông tin và tương tác với nhóm bạn',
    image: 'https://unblast.com/wp-content/uploads/2020/05/Group-Chat-Illustration.jpg',
  },
  {
    title: 'Nhật ký bạn bè',
    description: 'Nơi cập nhật hoạt động mới nhất của những người bạn quan tâm',
    image: 'https://img.freepik.com/free-vector/person-writing-love-letter-flat-vector-illustration-pen-human-hand-person-sending-receiving-letter-correspondence-communication-relationship-friendship-concept_74855-24968.jpg?semt=ais_hybrid',
  },
  {
    title: 'Gọi video ổn định',
    description: 'Trò chuyện thật đã với chất lượng video ổn định mọi lúc, mọi nơi',
    image: 'https://www.kaleyra.com/wp-content/uploads/Video-ATF.png',
  },
];


const Home = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <RootLayout>

      <Swiper style={styles.wrapper} showsButtons={false}>
        {slideDatas.map((slide, index) => (
          <View key={index} style={styles.slide}>
            <Text style={styles.text}>Zalo</Text>
            <Image source={{ uri: slide.image }} style={styles.image} />
            <Text style={styles.title}>{slide.title}</Text>
            <Text style={styles.description}>{slide.description}</Text>
          </View>
        ))}
      </Swiper>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.buttonLogin} onPress={() => { navigation.navigate(ROUTING.LOGIN) }}>
          <Text style={styles.textLogin}>Đăng nhập</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={() => { navigation.navigate(ROUTING.REGISTER) }}>
          <Text style={styles.textRegister}>Tạo tài khoản</Text>
        </TouchableOpacity>
      </View>
    </RootLayout >

  );
};

export default Home;