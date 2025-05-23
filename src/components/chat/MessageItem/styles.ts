import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    // Style mới cho emoji
    emojiWrapper: {
        flexDirection: 'row',
        backgroundColor: '#E8ECEF',
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 6,
        alignSelf: 'flex-start',
    },
    emojiWrapperRight: {
        alignSelf: 'flex-end', // Đảm bảo ô emoji căn phải
    },
    emojiWrapperLeft: {
        alignSelf: 'flex-start', // Đảm bảo ô emoji căn trái
    },
    emojiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 6,
    },
    emojiTextIcon: {
        fontSize: 10,
    },
    remainingCount: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#D1D5DB',
        borderRadius: 8,
        width: 24,
        height: 16,
        marginLeft: 2,
    },
    remainingText: {
        fontSize: 10,
        color: '#000',
    },
    messageWrapper: {
        marginVertical: 5,
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
    messageAvatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 10,
    },
    messageBubble: {
        maxWidth: '70%',
        padding: 10,
        borderRadius: 10,
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
    myEmojiContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginRight: 50,
    },
    otherEmojiContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginLeft: 50,
    },
});

