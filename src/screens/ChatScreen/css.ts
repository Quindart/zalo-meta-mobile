import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
    },
    header: {
        backgroundColor: '#1E88E5',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    backButton: {
        padding: 5,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        flex: 1,
        marginLeft: 15,
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
    myMessageBubble: {
        backgroundColor: '#DCF8C6',
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