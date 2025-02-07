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
import MessagesScreen from '@/screens/MessagesScreen';

import TabWithHeaderNavigator from '@/components/shared/TabWithHeaderNavigator';

import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';

const Stack = createNativeStackNavigator();


function NavigationApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={ROUTING.TAB_WITH_HEADER_NAVIGATION}
        screenOptions={{
          // headerBackground: () => (
          //   <LinearGradient
          //     colors={[theme.colors.primary, theme.colors.primaryContainer]}
          //     start={{ x: 0, y: 0 }}
          //     end={{ x: 1, y: 0 }}
          //     style={{
          //       position: 'absolute',
          //       top: 0,
          //       left: 0,
          //       right: 0,
          //       height: 40,
          //     }}
          //   />
          // ),
          headerStyle: {
          },
          headerTintColor: '#000',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen
          name={ROUTING.HOME}
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.LOGIN}
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.REGISTER}
          component={RegisterScreen}
          options={{ headerShown: false }}
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
          name={ROUTING.MESSAGES_SCREEN}
          component={MessagesScreen}
          options={{ headerShown: false }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationApp