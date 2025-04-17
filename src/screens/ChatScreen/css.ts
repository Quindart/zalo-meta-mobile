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
    // Style cho Modal
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    popupContainer: {
        backgroundColor: '#fff',
        borderRadius: 12,
        width: '80%',
        height: 'auto',
        marginHorizontal: 10,
        paddingVertical: 10,
        paddingHorizontal: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    // Style cho hàng emoji
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 5,
    },
    emojiButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },
    emojiWrapperRight: {
        alignSelf: 'flex-end', // Đảm bảo ô emoji căn phải
    },
    emojiWrapperLeft: {
        alignSelf: 'flex-start', // Đảm bảo ô emoji căn trái
    },
    emojiText: {
        fontSize: 24,
    },
    emojiTextIcon: {
        fontSize: 10,
    },
    actionRow: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingVertical: 5,
    },
    actionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        marginHorizontal: 5,
    },
    actionText: {
        fontSize: 12,
        marginTop: 5,
        textAlign: 'center',
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
    // Style mới cho emoji
    emojiWrapper: {
        flexDirection: 'row',
        backgroundColor: '#E8ECEF',
        borderRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 6,
        alignSelf: 'flex-start',
    },
    emojiItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 6,
    },
    quantityBadge: {
        backgroundColor: '#D1D5DB',
        borderRadius: 8,
        width: 16,
        height: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 2,
    },
    emojiQuantity: {
        fontSize: 10,
        color: '#000',
    },
    messageWrapper: {
        marginVertical: 5,
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
});