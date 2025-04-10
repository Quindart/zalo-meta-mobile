// import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   Image,
//   FlatList,
//   KeyboardAvoidingView,
//   Platform,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import { Ionicons, AntDesign } from '@expo/vector-icons';
// import styles from './css';
// import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
// import { LinearGradient } from 'expo-linear-gradient';
// import theme from '@/theme';
// import { RootStackParamList } from '@/navigation/type';
// import { NativeStackNavigationProp } from '@react-navigation/native-stack';
// import { ROUTING } from '@/utils/constant';
// import { useChat } from '@/hooks/useChat';
// import { useSelector } from 'react-redux';
// import { RootState } from '@/redux/store';

// type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
// type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// const ChatHeader = React.memo(({
//   navigation,
//   item
// }: {
//   navigation: any,
//   item: any
// }) => (
//   <LinearGradient
//     colors={[theme.colors.primary, theme.colors.primaryContainer]}
//     start={{ x: 0, y: 0 }}
//     end={{ x: 1, y: 0 }}
//     style={styles.header}
//   >
//     <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
//       <AntDesign name="arrowleft" size={20} color="white" />
//     </TouchableOpacity>
//     <Text style={styles.headerTitle}>{item.name}</Text>
//     <View style={styles.headerIcons}>
//       <TouchableOpacity style={styles.iconButton}>
//         <Ionicons name="call-outline" size={24} color="white" />
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.iconButton}>
//         <Ionicons name="videocam-outline" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   </LinearGradient>
// ));

// const MessageItem = React.memo(
//   ({ item, sender, receiver }: { item: any; sender: any; receiver: any }) => {
//     const isMyMessage = useMemo(() => {
//       if (item.senderId && typeof item.senderId === 'object' && item.senderId._id) {
//         return item.senderId._id === sender?._id;
//       }
//       else if (typeof item.senderId === 'string') {
//         return item.senderId === sender?._id;
//       }
//       return false;
//     }, [item.senderId, sender?._id]);

//     const receiverPerson = item.receiverId;

//     return (
//       <View style={[
//         styles.messageRow,
//         isMyMessage ? styles.myMessageRow : styles.otherMessageRow
//       ]}>
//         {!isMyMessage && (
//           <Image
//             source={{ uri: receiver?.avatar || receiverPerson?.avatar || 'https://via.placeholder.com/40' }}
//             style={styles.messageAvatar}
//             defaultSource={require('../../../assets/user_default.jpg')}
//           />
//         )}

//         <View style={[
//           styles.messageBubble,
//           isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble
//         ]}>
//           <Text style={styles.messageText}>{item.content}</Text>
//           <Text style={styles.messageTime}>
//             {new Date(item.timestamp).toLocaleTimeString()}
//           </Text>
//         </View>
//       </View>
//     );
//   },
//   (prevProps, nextProps) => {
//     return (
//       prevProps.item._id === nextProps.item._id &&
//       prevProps.item.content === nextProps.item.content &&
//       prevProps.item.status === nextProps.item.status &&
//       prevProps.item.timestamp === nextProps.item.timestamp &&
//       prevProps.sender?._id === nextProps.sender?._id
//     );
//   }
// );

// const MessageInputContainer = React.memo(() => {
//   const [inputMessage, setInputMessage] = useState('');
//   const route = useRoute<ChatScreenRouteProp>();
//   const { item } = route.params || { item: {} };
//   const sender = useSelector((state: RootState) => state.user.user);
//   const receiver = item.secondUser;
//   const flatListRef = useRef<FlatList>(null);

//   const chatHook = useChat();
//   const sendMessageAction = useCallback((receiverId: string, content: string, senderId: string) => {
//     chatHook.sendMessage(receiverId, content, senderId);
//   }, [chatHook]);

//   const handleSendMessage = useCallback(() => {
//     if (inputMessage.trim() && sender && receiver) {
//       sendMessageAction(receiver._id, inputMessage, sender._id);
//       setInputMessage('');

//       setTimeout(() => {
//         if (global.chatListRef) {
//           global.chatListRef.scrollToEnd?.({ animated: true });
//         }
//       }, 100);
//     }
//   }, [inputMessage, sender, receiver, sendMessageAction]);

//   return (
//     <View style={styles.inputContainer}>
//       <TextInput
//         style={styles.input}
//         placeholder="Tin nhắn"
//         value={inputMessage}
//         onChangeText={setInputMessage}
//         multiline
//       />
//       <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
//         <Ionicons name="send" size={24} color="white" />
//       </TouchableOpacity>
//     </View>
//   );
// });

// const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
//   const renderCountRef = useRef(0);
//   renderCountRef.current += 1;
//   console.log(`ChatScreen render #${renderCountRef.current}`);

//   const { item } = route.params || { item: {} };
//   const navigation = useNavigation();
//   const sender = useSelector((state: RootState) => state.user.user);
//   const receiver = route.params?.item.secondUser;

//   const chatActionsRef = useRef<any>(null);
//   const { loadMessages, messages } = useChat();
//   const flatListRef = useRef<FlatList>(null);

//   useEffect(() => {
//     global.chatListRef = flatListRef.current;
//     return () => {
//       global.chatListRef = null;
//     };
//   }, []);

//   useEffect(() => {
//     chatActionsRef.current = {
//       loadMessages,
//     };
//   }, [loadMessages]);

//   useEffect(() => {
//     const fetchMessage = async () => {
//       if (sender?._id && receiver?._id && chatActionsRef.current) {
//         await chatActionsRef.current.loadMessages(receiver._id, sender._id);
//       }
//     };
//     fetchMessage();
//   }, [sender?._id, receiver?._id]);

//   const scrollToEnd = useCallback(() => {
//     flatListRef.current?.scrollToEnd({ animated: true });
//   }, []);

//   const renderItem = useCallback(({ item }: { item: any }) => (
//     <MessageItem item={item} sender={sender} receiver={receiver} />
//   ), [sender, receiver]);

//   const keyExtractor = useCallback((item: any, index: number) =>
//     item._id ? item._id.toString() : `msg-${index}-${Date.now()}`, []);

//   return (
//     <SafeAreaView style={styles.safeArea}>
//       <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : undefined}
//         style={styles.container}
//         keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
//       >
//         <ChatHeader navigation={navigation} item={item} />

//         <FlatList
//           ref={flatListRef}
//           data={messages}
//           renderItem={renderItem}
//           keyExtractor={keyExtractor}
//           style={styles.messageList}
//           onContentSizeChange={scrollToEnd}
//           onLayout={scrollToEnd}
//           initialNumToRender={15}
//           maxToRenderPerBatch={10}
//           windowSize={10}
//           removeClippedSubviews={true}
//         />

//         <MessageInputContainer />
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// };

// declare global {
//   var chatListRef: any;
// }

// export default React.memo(ChatScreen);

import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import styles from './css';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';
import { RootStackParamList } from '@/navigation/type';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTING } from '@/utils/constant';
import { useChat } from '@/hooks/useChat'
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

type ChatScreenRouteProp = RouteProp<RootStackParamList, typeof ROUTING.CHAT_SCREEN>;
type ChatScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {




  return (
    <SafeAreaView style={styles.safeArea}>
      {/* <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <LinearGradient
          colors={[theme.colors.primary, theme.colors.primaryContainer]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.header}
        >

          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="videocam-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};

export default React.memo(ChatScreen);