import React, { useState, useRef } from 'react';
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

type ChatScreenRouteProp = RouteProp<{ ChatScreen: { item: any } }, 'ChatScreen'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      sender: 'other',
      text: 'Hello, how are you?',
      time: '17:23',
    },
    {
      id: '2',
      sender: 'me',
      text: 'I am good, thank you!',
      time: '17:24',
    },
    {
      id: '3',
      sender: 'me',
      text: 'What about you?',
      time: '17:25',
    },
    {
      id: '4',
      sender: 'other',
      text: 'I am doing well, just busy with work.',
      time: '17:26',
    },
    {
      id: '5',
      sender: 'me',
      text: 'That\'s good to hear.',
      time: '17:27',
    },
    {
      id: '6',
      sender: 'other',
      text: 'Yes, it is. Have you finished your project?',
      time: '17:28',
    },
    {
      id: '7',
      sender: 'me',
      text: 'Almost, just a few more things to wrap up.',
      time: '17:29',
    },
    {
      id: '8',
      sender: 'other',
      text: 'Great! Let me know if you need any help.',
      time: '17:30',
    },
    {
      id: '9',
      sender: 'me',
      text: 'Sure, thanks!',
      time: '17:31',
    },
    {
      id: '10',
      sender: 'other',
      text: 'No problem. Talk to you later.',
      time: '17:32',
    },
    {
      id: '11',
      sender: 'me',
      text: 'Bye!',
      time: '17:33',
    },
  ]);

  // useRef lưu trữ giá trị của một biến trong suốt quá trình render của component.
  const flatListRef = useRef<FlatList>(null);


  const renderMessageItem = ({ item }: { item: any }) => {
    const isMyMessage = item.sender === 'me';

    return (
      <View style={[
        styles.messageRow,
        isMyMessage ? styles.myMessageRow : styles.otherMessageRow
      ]}>
        {!isMyMessage && item.avatar && (
          <Image source={{ uri: item.avatar }} style={styles.messageAvatar} />
        )}

        <View style={[
          styles.messageBubble,
          isMyMessage ? styles.myMessageBubble : styles.otherMessageBubble
        ]}>
          <Text style={styles.messageText}>{item.text}</Text>
          <Text style={styles.messageTime}>{item.time}</Text>
        </View>
      </View>
    );
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        sender: 'me',
        text: message,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages([...messages, newMessage]);
      setMessage('');
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
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
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <AntDesign name="arrowleft" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item.name}</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="call-outline" size={24} color="white" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton}>
              <Ionicons name="videocam-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>

        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          style={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tin nhắn"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;