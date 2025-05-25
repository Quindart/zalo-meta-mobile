import { StyleSheet } from 'react-native';
import theme from '@/theme';
export default StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
    // Thêm vào file styles.js của bạn
    attachmentButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        height: 40,
        width: 40,
    },
    imageButton: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        borderRadius: 20,
        backgroundColor: '#e8f4f8',
        height: 40,
        width: 40,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        borderRadius: 20,
        paddingHorizontal: 15,
        paddingVertical: 8,
        maxHeight: 100,
        backgroundColor: 'white',
        fontSize: 16,
    },
    sendButton: {
        marginLeft: 8,
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#cccccc',
        justifyContent: 'center',
        alignItems: 'center',
        height: 40,
        width: 40,
    },
    sendButtonActive: {
        backgroundColor: theme.colors.primary,
    },
})