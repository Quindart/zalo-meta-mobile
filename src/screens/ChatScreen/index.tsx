import React, { useState } from 'react';
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
import { Ionicons } from '@expo/vector-icons';
import styles from './css';
import { RouteProp, useNavigation } from '@react-navigation/native';

type ChatScreenRouteProp = RouteProp<{ params: { item: any } }, 'params'>;

const ChatScreen = ({ route }: { route: ChatScreenRouteProp }) => {
  const { item } = route.params;
  const navigation = useNavigation();
  const [message, setMessage] = useState('');

  const messages = [
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
  ];

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

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1E88E5" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{item.name}</Text>
        </View>

        <FlatList
          data={messages}
          renderItem={renderMessageItem}
          keyExtractor={item => item.id}
          style={styles.messageList}
        />

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Tin nhắn"
            value={message}
            onChangeText={setMessage}
            multiline
          />
          <TouchableOpacity style={styles.sendButton}>
            <Ionicons name="send" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;