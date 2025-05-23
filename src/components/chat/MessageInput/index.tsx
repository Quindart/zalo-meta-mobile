import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from "@/screens/ChatScreen/css"

interface MessageInputContainerProps {
    channelId: string;
    sendMessage: (chanId: string, content: string) => void;
    onPickFile: () => void;
}

const MessageInputContainer = React.memo(
    ({ channelId, sendMessage, onPickFile }: MessageInputContainerProps) => {
        const [inputMessage, setInputMessage] = useState('');

        const handleSendMessage = useCallback(() => {
            if (inputMessage.trim()) {
                sendMessage(channelId, inputMessage);
                setInputMessage('');
            }
        }, [inputMessage, channelId, sendMessage]);

        return (
            <View style={styles.inputContainer}>
                <TouchableOpacity style={styles.attachmentButton} onPress={onPickFile}>
                    <Ionicons name="attach" size={22} color="#555" />
                </TouchableOpacity>
                <TextInput
                    style={styles.input}
                    placeholder="Tin nhắn"
                    value={inputMessage}
                    onChangeText={(e) => setInputMessage(e)}
                    multiline
                    returnKeyType="send"
                    onSubmitEditing={handleSendMessage}
                />
                <TouchableOpacity
                    style={[styles.sendButton, inputMessage.trim() ? styles.sendButtonActive : null]}
                    onPress={handleSendMessage}
                    disabled={!inputMessage.trim()}
                >
                    <Ionicons name="send" size={22} color="white" />
                </TouchableOpacity>
            </View>
        );
    }
);

export default MessageInputContainer;