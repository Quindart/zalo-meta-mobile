// import ContactsScreen from '@/screens/ContactsScreen';
// import DiaryScreen from '@/screens/DiaryScreen';
// import DiscoveryScreen from '@/screens/DiscoveryScreen';
// import MessagesScreen from '@/screens/MessagesScreen';
// import ProfileScreen from '@/screens/ProfileScreen';

// // import useUserStore from '@/store/auth/useUserStore';
// import theme from '@/theme';
// import { ROUTING } from '@/utils/constant';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
// import { Image, View } from 'react-native';
// import { Icon, Text } from 'react-native-paper';
// import { AntDesign, FontAwesome } from '@expo/vector-icons';
// import { createMaterialBottomTabNavigator } from 'react-native-paper/lib/typescript/react-navigation';
// import { LinearGradient } from 'expo-linear-gradient';
// const Tab = createBottomTabNavigator();

// function TabWithHeaderNavigator() {
//   const navigation: NavigationProp<ParamListBase> = useNavigation();
//   // const user = useUserStore((state) => state.user);
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         tabBarStyle: {
//           width: '100%', // Đảm bảo thanh tabBar sẽ kéo dài hết chiều rộng
//           height: 55, // Đảm bảo chiều cao của tabBar
//           paddingBottom: 0, // Loại bỏ padding dưới tabBar nếu có
//         },
//         headerBackground: () => (
//           <LinearGradient
//             colors={[theme.colors.primary, theme.colors.primaryContainer]}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={{
//               position: 'absolute',
//               top: 0,
//               left: 0,
//               right: 0,
//               height: 80,
//             }}
//           />
//         ),
//         headerTintColor: '#000',
//         headerTitleStyle: {
//           fontWeight: 'bold',
//         },
//         headerShadowVisible: false,
//       }}
//     >
//       <Tab.Screen
//         name={ROUTING.MESSAGES_SCREEN}
//         component={MessagesScreen}
//         options={{
//           headerRight: () => (
//             <View style={{ flexDirection: 'row', backgroundColor: 'red' }}>
//               <AntDesign name="message1" size={24} color="black" />
//             </View>
//           ),

//           headerStyle: {
//             height: 70,
//           },
//           headerTitle: '',
//           tabBarIcon: () => <AntDesign name="message1" size={24} color="black" />, tabBarLabelStyle: {
//             color: 'black', // Thay đổi màu chữ ở đây
//           },
//         }}
//       />
//       <Tab.Screen
//         name={ROUTING.CONTACTS_SCREEN}
//         component={ContactsScreen}
//         options={{
//           headerStyle: {
//             height: 80,
//           },
//           headerTitle: '',
//           tabBarIcon: () => <AntDesign name="contacts" size={24} color="black" />, tabBarLabelStyle: {
//             color: 'black', // Thay đổi màu chữ ở đây
//           },
//         }}
//       />
//       <Tab.Screen
//         name={ROUTING.DISCOVERY_SCREEN}
//         component={DiscoveryScreen}
//         options={{
//           headerStyle: {
//             height: 80,
//           },
//           headerTitle: '',
//           tabBarIcon: () => <AntDesign name="appstore-o" size={24} color="black" />, tabBarLabelStyle: {
//             color: 'black', // Thay đổi màu chữ ở đây
//           },
//         }}
//       />
//       <Tab.Screen
//         name={ROUTING.DIARY_SCREEN}
//         component={DiaryScreen}
//         options={{
//           headerStyle: {
//             height: 80,
//           },
//           headerTitle: '',
//           tabBarIcon: () => <AntDesign name="clockcircleo" size={24} color="black" />, tabBarLabelStyle: {
//             color: 'black', // Thay đổi màu chữ ở đây
//           },
//         }}
//       />
//       <Tab.Screen
//         name={ROUTING.PROFILE_SCREEN}
//         component={ProfileScreen}
//         options={{
//           headerStyle: {
//             height: 80,
//           },
//           headerTitle: '',
//           tabBarIcon: () => <FontAwesome name="user-o" size={24} color="black" />, tabBarLabelStyle: {
//             color: 'black', // Thay đổi màu chữ ở đây
//           },
//         }}
//       />
//     </Tab.Navigator>
//   );
// }
// export default TabWithHeaderNavigator;


import ContactsScreen from '@/screens/ContactsScreen';
import DiaryScreen from '@/screens/DiaryScreen';
import DiscoveryScreen from '@/screens/DiscoveryScreen';
import MessagesScreen from '@/screens/MessagesScreen';
import ProfileScreen from '@/screens/ProfileScreen';

// import useUserStore from '@/store/auth/useUserStore';
import theme from '@/theme';
import { ROUTING } from '@/utils/constant';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { AntDesign, FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const Tab = createBottomTabNavigator();

function TabWithHeaderNavigator() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: '100%', // Đảm bảo thanh tabBar sẽ kéo dài hết chiều rộng
          height: 55, // Đảm bảo chiều cao của tabBar
          paddingBottom: 0, // Loại bỏ padding dưới tabBar nếu có
        },
        headerBackground: () => (
          <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: 80,
            }}
          />
        ),
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        // Cập nhật màu sắc cho icon và label
        tabBarActiveTintColor: theme.colors.primaryContainer, // Màu cho tab đang chọn
        tabBarInactiveTintColor: 'gray', // Màu cho tab không chọn
      }}
    >
      <Tab.Screen
        name={ROUTING.MESSAGES_SCREEN}
        component={MessagesScreen}
        options={{
          headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
              <AntDesign name="message1" size={24} color="black" />
            </View>
          ),
          headerStyle: {
            height: 70,
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            color: 'black', // Màu chữ cho label
          },
        }}
      />
      <Tab.Screen
        name={ROUTING.CONTACTS_SCREEN}
        component={ContactsScreen}
        options={{
          headerStyle: {
            height: 80,
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            color: 'black', // Đảm bảo màu chữ cho label
          },
        }}
      />
      <Tab.Screen
        name={ROUTING.DISCOVERY_SCREEN}
        component={DiscoveryScreen}
        options={{
          headerStyle: {
            height: 80,
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            color: 'black', // Đảm bảo màu chữ cho label
          },
        }}
      />
      <Tab.Screen
        name={ROUTING.DIARY_SCREEN}
        component={DiaryScreen}
        options={{
          headerStyle: {
            height: 80,
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircleo" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            color: 'black', // Đảm bảo màu chữ cho label
          },
        }}
      />
      <Tab.Screen
        name={ROUTING.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerStyle: {
            height: 80,
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
          tabBarLabelStyle: {
            color: 'black', // Đảm bảo màu chữ cho label
          },
        }}
      />
    </Tab.Navigator>
  );
}

export default TabWithHeaderNavigator;
