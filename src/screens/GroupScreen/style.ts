import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#eee',
        paddingHorizontal: 16,
        backgroundColor: '#f9f9f9',
    },
    headerTitle: { fontSize: 16, fontWeight: '600', marginLeft: 12 },

    groupNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderBottomWidth: 1,
        borderColor: '#eee',
    },
    avatarPicker: {
        width: 45,
        height: 45,
        borderRadius: 25,
        backgroundColor: '#f2f2f2',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarPickerImage: {
        width: 45,
        height: 45,
        borderRadius: 25,
    },
    groupNameInput: {
        marginLeft: 12,
        fontSize: 16,
        flex: 1,
    },

    contactItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        borderBottomWidth: 1,
        borderColor: '#f0f0f0',
        justifyContent: 'space-between',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        backgroundColor: '#ccc',
    },
    contactInfo: {
        marginLeft: 12,
    },
    name: {
        fontSize: 16,
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#999',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDot: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#0084ff',
    },
    createButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#0084ff',
        padding: 14,
        borderRadius: 8,
        alignItems: 'center',
    },
    createButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },

    modalOverlay: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 16,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
    },
    optionIcon: {
        width: 60,
        height: 60,
        borderRadius: 25,
        marginHorizontal: 8,
    },
    modalOption: {
        paddingVertical: 10,
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 16,
        color: '#333',
    },
});