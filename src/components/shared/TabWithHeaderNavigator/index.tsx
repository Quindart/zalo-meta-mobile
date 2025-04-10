import ContactsScreen from '@/screens/ContactsScreen';
import DiaryScreen from '@/screens/DiaryScreen';
import DiscoveryScreen from '@/screens/DiscoveryScreen';
import MessagesScreen from '@/screens/ChatListScreen';
import ProfileScreen from '@/screens/ProfileScreen';

import theme from '@/theme';
import { ROUTING } from '@/utils/constant';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { AntDesign, FontAwesome, MaterialCommunityIcons, SimpleLineIcons, Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import SearchBar from '@/components/ui/SearchBar';
import QR_Scan from '@/components/ui/QR_Scan';
import React from 'react';

const Tab = createBottomTabNavigator();

function TabWithHeaderNavigator() {
  const navigation: NavigationProp<ParamListBase> = useNavigation();
  const sizeIcon = 22;
  const colorIcon = 'white';
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          width: '100%',
          height: 50,
          paddingBottom: 0,
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
              height: 50, // Adjusted header height
            }}
          />
        ),
        headerTintColor: '#000',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerShadowVisible: false,
        tabBarActiveTintColor: theme.colors.primaryContainer,
        tabBarInactiveTintColor: 'black',
        tabBarLabelStyle: {
          fontSize: 12,
        },
      }}
    >
      {/* ----------Tin nhắn----------- */}
      <Tab.Screen
        name={ROUTING.CHAT_LIST_SCREEN}
        component={MessagesScreen}
        options={{
          header: () => (
            <View style={{ backgroundColor: theme.colors.primary, height: 100 }}>
              <View style={{
                flex: 1,
                justifyContent: 'flex-end',
                paddingBottom: 10
              }}>
                <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 15
                }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate(ROUTING.SEARCH_SCREEN)}
                    activeOpacity={1}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingHorizontal: 15,
                      height: 40,
                      width: '85%',
                    }}
                  >
                    <AntDesign name="search1" size={20} color="white" style={{ marginRight: 15 }} />
                    <View>
                      <Text style={{ fontSize: 16, color: 'white' }}>Tìm kiếm</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.headerRightIcon}>
                    <QR_Scan />
                    <AntDesign name="plus" size={sizeIcon} color={colorIcon} onPress={() => { }} />
                  </View>
                </View>
              </View>
            </View>
          ),
          // headerLeft: () => (
          //   <SearchBar />
          // ),
          // headerRight: () => (
          //   <View style={styles.headerRightIcon}>
          //     <QR_Scan />
          //     <AntDesign name="plus" size={sizeIcon} color={colorIcon} onPress={() => { }} />
          //   </View>
          // ),
          headerStyle: {
            height: 50, // Adjusted header height
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
          tabBarLabelStyle: ({ color }) => ({ color }),
        }}
      />

      {/* -----------------Danh bạ--------------------- */}
      <Tab.Screen
        name={ROUTING.CONTACTS_SCREEN}
        component={ContactsScreen}
        options={{
          headerLeft: () => (
            <SearchBar />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <SimpleLineIcons name="user-follow" size={sizeIcon} color={colorIcon} />
            </View>
          ),
          headerStyle: {
            height: 50, // Adjusted header height
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="contacts" size={24} color={color} />
          ),
          tabBarLabelStyle: ({ color }) => ({ color, }),
        }}
      />

      {/* ----------------Khám phá----------------- */}
      <Tab.Screen
        name={ROUTING.DISCOVERY_SCREEN}
        component={DiscoveryScreen}
        options={{
          headerLeft: () => (
            <SearchBar />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <QR_Scan />
            </View>
          ),
          headerStyle: {
            height: 50, // Adjusted header height
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="appstore-o" size={24} color={color} />
          ),
          tabBarLabelStyle: ({ color }) => ({ color, }),
        }}
      />


      {/* ----------------Nhật ký----------------- */}
      <Tab.Screen
        name={ROUTING.DIARY_SCREEN}
        component={DiaryScreen}
        options={{
          headerLeft: () => (
            <SearchBar />
          ),
          headerRight: () => (
            <View style={styles.headerRightIcon}>
              <MaterialCommunityIcons name="image-plus" size={sizeIcon} color={colorIcon} />
              <Feather name="bell" size={sizeIcon} color={colorIcon} />
            </View>
          ),
          headerStyle: {
            height: 50, // Adjusted header height
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <AntDesign name="clockcircleo" size={24} color={color} />
          ),
          tabBarLabelStyle: ({ color }) => ({ color, }),
        }}
      />


      {/* -----------------Hồ sơ--------------------- */}
      <Tab.Screen
        name={ROUTING.PROFILE_SCREEN}
        component={ProfileScreen}
        options={{
          headerLeft: () => (
            <SearchBar />
          ),
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 15 }}>
              <AntDesign name="setting" size={sizeIcon} color={colorIcon} />
            </View>
          ),
          headerStyle: {
            height: 50, // Adjusted header height
          },
          headerTitle: '',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="user-o" size={24} color={color} />
          ),
          tabBarLabelStyle: ({ color }) => ({ color, }),
        }}
      />
    </Tab.Navigator>


  );
}

const styles = StyleSheet.create({
  headerRightIcon: {
    flexDirection: 'row',
    marginRight: 15,
    width: 60,
    justifyContent: 'space-between',
  },
});

export default TabWithHeaderNavigator;
