import { StyleSheet } from 'react-native';
export default StyleSheet.create({
    emojiRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 5,
        borderBottomWidth: 1,
        borderBottomColor: '#e0e0e0',
        marginBottom: 5,
    },
    emoji: {
        fontSize: 16,
        marginRight: 8,
    },
    emojiCount: {
        fontSize: 14,
        color: '#666',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.2)',
        justifyContent: 'center',
        paddingBottom: 20,
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
});

