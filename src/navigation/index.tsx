
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ROUTING } from '@/utils/constant';
import HomeScreen from '@/screens/Auth/Home';
import LoginScreen from '@/screens/Auth/Login';
import RegisterScreen from '@/screens/Auth/Register';

import ContactsScreen from '@/screens/ContactsScreen';
import DiscoveryScreen from '@/screens/DiscoveryScreen';
import ProfileScreen from '@/screens/ProfileScreen';
import DiaryScreen from '@/screens/DiaryScreen';
import MessagesScreen from '@/screens/ChatListScreen';
import SearchScreen from '@/screens/SearchScreen/HeaderSearch';
import ChatScreen from '@/screens/ChatScreen';


import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import TabWithHeaderNavigator from '@/components/Shared/TabWithHeaderNavigator';

const Stack = createNativeStackNavigator();

function NavigationApp() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor='#0D7DC9' />

      <Stack.Navigator
        initialRouteName={ROUTING.HOME}
        screenOptions={{
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name={ROUTING.HOME}
          component={HomeScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={ROUTING.LOGIN}
          component={LoginScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerBackground: () => (
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,
                  // width: '100%',
                  // height: '80%',
                }}
              />
            ),
            headerTintColor: "white",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={ROUTING.REGISTER}
          component={RegisterScreen}
          options={({ navigation }) => ({
            headerShown: true,
            headerBackground: () => (
              <LinearGradient
                colors={[theme.colors.primary, theme.colors.primaryContainer]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{
                  flex: 1,

                }}
              />
            ),
            headerTintColor: "white",
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginRight: 10 }}>
                <AntDesign name="left" size={24} color="white" />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name={ROUTING.TAB_WITH_HEADER_NAVIGATION}
          component={TabWithHeaderNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.CONTACTS_SCREEN}
          component={ContactsScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.DISCOVERY_SCREEN}
          component={DiscoveryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.PROFILE_SCREEN}
          component={ProfileScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.DIARY_SCREEN}
          component={DiaryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.CHAT_LIST_SCREEN}
          component={MessagesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.SEARCH_SCREEN}
          component={SearchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.CHAT_SCREEN}
          component={ChatScreen}
          options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationApp;
