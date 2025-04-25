import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import { ROUTING } from "@/utils/constant";
import HomeScreen from "@/screens/Auth/Home";
import LoginScreen from "@/screens/Auth/Login";
import RegisterScreen from "@/screens/Auth/Register";

import ContactsScreen from "@/screens/ContactsScreen";
import DiscoveryScreen from "@/screens/DiscoveryScreen";
import ProfileScreen from "@/screens/ProfileScreen";
import DiaryScreen from "@/screens/DiaryScreen";
import MessagesScreen from "@/screens/ChatListScreen";
import SearchScreen from "@/screens/SearchScreen/HeaderSearch";
import ChatScreen from "@/screens/ChatScreen";
import Profile from "@/screens/ProfileScreen/profile";
import My_QR from "@/screens/ProfileScreen/qr";
import QR_SCAN from "@/screens/Auth/QRScan/index";
import ChangePasswordScreen from "@/screens/ProfileScreen/changePassword";
import UpdateProfile from "@/screens/ProfileScreen/updateProfile";
import OptionScreen from "@/screens/OptionScreen";
import GroupScreen from "@/screens/GroupScreen";
import FriendRequestScreen from "@/screens/ContactsScreen/friendRequest";
import ProfileUserScreen from "@/screens/ProfileFriendScreen";
import ForwardMessage from "@/screens/ChatScreen/ForwardMessage";

import { LinearGradient } from "expo-linear-gradient";
import theme from "@/theme";
import { TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "./type";
import ForgotPasswordTemplate from "@/screens/Auth/Forgot/index";
import ResetPasswordTemplate from "@/screens/Auth/Reset/index";
import TabWithHeaderNavigator from "@/components/shared/TabWithHeaderNavigator";
const Stack = createNativeStackNavigator<RootStackParamList>();

function NavigationApp() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#0D7DC9" />

      <Stack.Navigator
        initialRouteName={ROUTING.HOME}
        screenOptions={{
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
        <Stack.Screen
          name={ROUTING.PROFILE}
          component={Profile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.QR}
          component={My_QR}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.QR_SCAN}
          component={QR_SCAN}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.CHANGE_PASSWORD}
          component={ChangePasswordScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.UPDATE_PROFILE}
          component={UpdateProfile}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.RESET_PASSWORD}
          component={ResetPasswordTemplate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.FORGOT_PASSWORD}
          component={ForgotPasswordTemplate}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.OPTION_SCREEN}
          component={OptionScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.GROUP_SCREEN}
          component={GroupScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.FRIEND_REQUEST_SCREEN}
          component={FriendRequestScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.PROFILE_FRIEND_SCREEN}
          component={ProfileUserScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name={ROUTING.FORWARD_MESSAGE}
          component={ForwardMessage}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default NavigationApp;
