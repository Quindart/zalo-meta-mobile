import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
    bubble: {
        maxWidth: width * 0.7,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    fileContent: {
        alignItems: 'center',
    },
    fileName: {
        fontSize: 13,
        marginTop: 4,
        color: '#333',
        textAlign: 'center',
    },
    fileSize: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 8,
    },
});
