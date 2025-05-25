import React, { useState, useCallback } from 'react';
import { View, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import styles from "./styles"

interface MessageInputContainerProps {
    channelId: string;
    sendMessage: (chanId: string, content: string, fcmToken: string) => void;
    onPickFile: () => void;
    onPickMultipleImages: () => void;
    isUploading?: boolean;
    fcmToken: string;
}

const MessageInputContainer = React.memo(
    ({ channelId, sendMessage, onPickFile, onPickMultipleImages, isUploading = false }: MessageInputContainerProps) => {
        const [inputMessage, setInputMessage] = useState('');

        const handleSendMessage = useCallback(() => {
            if (inputMessage.trim()) {
                sendMessage(channelId, inputMessage);
                setInputMessage('');
            }
        }, [inputMessage, channelId, sendMessage]);

        return (
            <View style={styles.inputContainer}>
                <TouchableOpacity
                    style={styles.attachmentButton}
                    onPress={onPickFile}
                    disabled={isUploading}
                >
                    <Ionicons name="attach" size={22} color={isUploading ? "#ccc" : "#555"} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.attachmentButton}
                    onPress={onPickMultipleImages}
                    disabled={isUploading}
                >
                    <Ionicons name="images" size={22} color="#555" />
                </TouchableOpacity>
                <TextInput
                    style={[styles.input, isUploading && { opacity: 0.6 }]}
                    placeholder={"Tin nhắn"}
                    value={inputMessage}
                    onChangeText={(e) => setInputMessage(e)}
                    multiline
                    returnKeyType="send"
                    onSubmitEditing={handleSendMessage}
                    editable={!isUploading}
                />
                {isUploading ? (
                    <ActivityIndicator size="small" color="#007AFF" />
                ) : (
                    <TouchableOpacity
                        style={[styles.sendButton, inputMessage.trim() ? styles.sendButtonActive : null]}
                        onPress={handleSendMessage}
                        disabled={!inputMessage.trim() || isUploading}
                    >
                        <Ionicons name="send" size={22} color="white" />
                    </TouchableOpacity>
                )}
            </View>
        );
    }
);

export default MessageInputContainer;