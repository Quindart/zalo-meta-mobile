import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#fff' },
    header: {
        flexDirection: 'row', alignItems: 'center', gap: 12,
        paddingHorizontal: 16, height: 60, borderBottomWidth: 1, borderColor: '#eee',
        backgroundColor: '#f9f9f9'
    },
    title: { fontSize: 16, fontWeight: 'bold' },
    subtitle: { fontSize: 13, color: '#888' },
    searchBar: {
        flexDirection: 'row', alignItems: 'center',
        margin: 12, borderRadius: 8, backgroundColor: '#f2f2f2',
        paddingHorizontal: 12, height: 40
    },
    searchInput: { flex: 1, fontSize: 14, marginHorizontal: 8 },
    counter: {
        fontSize: 12, color: '#333',
        backgroundColor: '#ddd', borderRadius: 6, paddingHorizontal: 6,
    },
    item: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 16, paddingVertical: 10,
        borderBottomWidth: 1, borderColor: '#eee'
    },
    avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 12 },
    name: { fontSize: 15 },
    radio: {
        width: 20, height: 20, borderRadius: 10,
        borderWidth: 1.5, borderColor: '#999', alignItems: 'center', justifyContent: 'center'
    },
    dot: {
        width: 12, height: 12, borderRadius: 6, backgroundColor: '#2b7bff'
    },
    addButton: {
        position: 'absolute',
        bottom: 20,
        left: 20,
        right: 20,
        backgroundColor: '#2b7bff',
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});
