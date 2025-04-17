import { StyleSheet } from 'react-native';
import theme from '@/theme';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: 50,
    },
    iconButton: {
        padding: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 17,
        fontWeight: '500',
        flex: 1,
        marginLeft: 5,
    },
    headerIcons: {
        flexDirection: 'row',
        position: 'absolute',
        right: 10,
    },
    messageList: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    messageRow: {
        flexDirection: 'row',
        marginVertical: 5,
        marginHorizontal: 10,
    },
    myMessageRow: {
        flexDirection: 'row-reverse',
        gap: 10
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
    },
    loadMoreContainer: {

    },
    loadingContainer: {
        flex: 1,
    },
    myMessageBubble: {
        backgroundColor: '#DBEBFF',
    },
    otherMessageBubble: {
        backgroundColor: '#FFF',
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 12,
        color: 'gray',
        marginTop: 5,
        textAlign: 'right',
    },

    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    imageMessage: {
        width: 200, // Adjust width as needed
        height: 200, // Adjust height as needed
        borderRadius: 10, // Optional: Add rounded corners
        resizeMode: 'cover', // Optional: Adjust image scaling
    },
    // Thêm vào file styles.js của bạn
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 8,
        backgroundColor: '#f8f8f8',
        borderTopWidth: 1,
        borderTopColor: '#e0e0e0',
    },
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
});