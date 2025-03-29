import { StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F2F5',
    },
    header: {
        backgroundColor: '#1E88E5',
        paddingTop: 8,
        paddingBottom: 0,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        marginHorizontal: 16,
        borderRadius: 4,
        paddingHorizontal: 8,
        height: 40,
    },
    searchInput: {
        flex: 1,
        height: 40,
        paddingHorizontal: 8,
        fontSize: 16,
    },
    tabContainer: {
        flexDirection: 'row',
        marginTop: 8,
        paddingHorizontal: 16,
        backgroundColor: 'white',
        height: 40,
        alignItems: 'center',
    },
    tab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: '#1E88E5',
    },
    tabText: {
        color: 'gray',
    },
    activeTabText: {
        color: '#1E88E5',
        fontWeight: 'bold',
    },
    filterButton: {
        marginLeft: 'auto',
    },
    chatList: {
        flex: 1,
        backgroundColor: 'white',
    },
    chatItem: {
        flexDirection: 'row',
        padding: 12,
        borderBottomWidth: 0.5,
        borderBottomColor: '#E0E0E0',
    },
    avatarContainer: {
        position: 'relative',
        marginRight: 12,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
    },
    avatarPlaceholder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatarInitial: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    verifiedBadge: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'white',
        borderRadius: 10,
    },
    chatInfo: {
        flex: 1,
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 4,
    },
    chatName: {
        fontSize: 16,
        fontWeight: '600',
        flex: 1,
        marginRight: 8,
    },
    chatTime: {
        color: 'gray',
        fontSize: 12,
    },
    chatPreview: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    messageIcon: {
        marginRight: 4,
    },
    chatMessage: {
        color: 'gray',
        fontSize: 14,
        flex: 1,
    },
    notificationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'red',
        marginLeft: 8,
    },
    userCountContainer: {
        backgroundColor: '#EEEEEE',
        borderRadius: 10,
        width: 20,
        height: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 8,
    },
    userCountText: {
        fontSize: 12,
        color: 'gray',
    },

    // Chat screen styles
    keyboardAvoidingContainer: {
        flex: 1,
    },
    messageList: {
        flex: 1,
        padding: 8,
    },
    dateContainer: {
        alignItems: 'center',
        marginVertical: 8,
    },
    dateText: {
        backgroundColor: 'rgba(0,0,0,0.2)',
        color: 'white',
        fontSize: 12,
        padding: 4,
        borderRadius: 10,
    },
    messageRow: {
        flexDirection: 'row',
        marginBottom: 8,
        maxWidth: '80%',
    },
    myMessageRow: {
        alignSelf: 'flex-end',
    },
    otherMessageRow: {
        alignSelf: 'flex-start',
    },
    messageAvatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        marginRight: 8,
        alignSelf: 'flex-end',
    },
    messageBubble: {
        padding: 8,
        borderRadius: 12,
        maxWidth: '100%',
    },
    myMessageBubble: {
        backgroundColor: '#E3F2FD',
        borderTopRightRadius: 4,
    },
    otherMessageBubble: {
        backgroundColor: 'white',
        borderTopLeftRadius: 4,
    },
    messageText: {
        fontSize: 16,
    },
    messageTime: {
        fontSize: 10,
        color: 'gray',
        alignSelf: 'flex-end',
        marginTop: 4,
    },
    reactionsContainer: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -10,
        right: 10,
    },
    reactionBubble: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 2,
        borderRadius: 10,
        marginLeft: 4,
    },
    reactionCount: {
        fontSize: 10,
        marginLeft: 2,
    },
    readStatus: {
        marginLeft: 4,
        alignSelf: 'flex-end',
    },
    readStatusText: {
        fontSize: 10,
        color: 'gray',
    },
    callContainer: {
        padding: 12,
        marginBottom: 8,
        borderRadius: 12,
        width: '80%',
    },
    myCallContainer: {
        backgroundColor: '#E3F2FD',
        alignSelf: 'flex-end',
    },
    otherCallContainer: {
        backgroundColor: 'white',
        alignSelf: 'flex-start',
    },
    callContent: {
        marginBottom: 8,
    },
    callText: {
        fontSize: 16,
        marginBottom: 4,
    },
    callDuration: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    callDurationText: {
        fontSize: 14,
        color: 'gray',
        marginLeft: 4,
    },
    callAgainButton: {
        alignSelf: 'center',
        marginBottom: 8,
    },
    callAgainText: {
        color: '#1E88E5',
        fontWeight: 'bold',
    },
    contactCard: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 12,
        borderRadius: 12,
        marginBottom: 8,
        alignItems: 'center',
    },
    contactInfo: {
        flex: 1,
        marginLeft: 8,
    },
    contactName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    contactSource: {
        fontSize: 14,
        color: 'gray',
    },
    addContactButton: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#E0E0E0',
        borderRadius: 12,
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    addContactText: {
        color: 'gray',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderTopColor: '#E0E0E0',
    },
    emojiButton: {
        padding: 8,
    },
    input: {
        flex: 1,
        backgroundColor: '#F0F2F5',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 8,
        maxHeight: 100,
    },
    attachButton: {
        padding: 8,
    },
    photoButton: {
        padding: 8,
    },
});

export default styles;

