import { StyleSheet } from 'react-native';
import theme from '@/theme';

export const chatScreenStyle = StyleSheet.create({
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
    loadMoreContainer: {

    },
    loadingContainer: {
        flex: 1,
    },

    // Style cho Modal

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

    emojiButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
    },

    emojiText: {
        fontSize: 24,
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
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        paddingBottom: 20,
    },
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 5,
    },
    forwardModalContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
});

export const popupStyle = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    emojiRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
});
