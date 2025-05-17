import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    header: {
        backgroundColor: "#108BE3",
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    headerTitle: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    headerIcons: { flexDirection: "row", alignItems: "center" },
    memberItem: {
        flexDirection: "row",
        alignItems: "center",
        padding: 12,
        borderBottomWidth: 1,
        borderBottomColor: "#eee",
    },
    avatar: { width: 42, height: 42, borderRadius: 21, marginRight: 12 },
    name: { fontSize: 16, fontWeight: "500" },
    role: { fontSize: 13, color: "#666", marginTop: 2 },
    modalOverlay: {
        flex: 1,
        justifyContent: "flex-end",
        backgroundColor: "rgba(0, 0, 0, 0.3)",
    },
    modalContent: {
        backgroundColor: "#fff",
        padding: 16,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },
    modalTitle: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 16,
    },
    modalProfileRow: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 12,
    },
    modalAvatar: {
        width: 60,
        height: 60,
        borderRadius: 30,
        marginRight: 16,
    },
    modalName: {
        fontSize: 18,
        fontWeight: "500",
    },
    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: "#eee",
    },
    modalOptionText: {
        fontSize: 16,
        color: "#333",
    },
});
  