import { StyleSheet } from "react-native";
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
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

    searchIcon_QR: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        flex: 1,
        position: 'relative',
    },

    searchInput: {
        width: '83%',
        fontSize: 14,
        color: 'black',
        backgroundColor: 'white',
        borderRadius: 10,
        paddingHorizontal: 32,
        height: 32,
        paddingTop: 0,
        paddingBottom: 0,
        marginLeft: 3,
    }
    ,
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    rightIcons: {
        marginRight: 12,
    },
    resultItem: {
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#ddd',
        backgroundColor: '#fff',
    },
    resultText: {
        fontSize: 16,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: 15,
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        fontSize: 16,
        fontWeight: '400',
        color: '#333',
    },
    userPhone: {
        fontSize: 14,
        color: '#666',
        marginTop: 5,
    },
    callButton: {
        padding: 10,
    },
});