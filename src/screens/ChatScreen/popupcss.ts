import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#FFF',
        borderRadius: 12,
        width: '60%',
        maxHeight: '40%',
        padding: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    emojiList: {
        flexGrow: 0,
    },
    emojiRow: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5EA',
    },
    emoji: {
        fontSize: 16,
        marginRight: 8,
    },
    emojiCount: {
        fontSize: 14,
        color: '#666',
    },
});
