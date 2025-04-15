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
        justifyContent: 'flex-end',
    },
    otherMessageRow: {
        justifyContent: 'flex-start',
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
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
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
    },
    input: {
        flex: 1,
        padding: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        marginRight: 10,
    },
    sendButton: {
        backgroundColor: '#1E88E5',
        padding: 10,
        borderRadius: 20,
    },
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
});