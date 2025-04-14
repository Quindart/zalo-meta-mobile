import { StyleSheet } from 'react-native';
import theme from '@/theme';
export default StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 20,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    headerText: {
        fontSize: 16,
        marginBottom: 4,
    },
    formGroup: {
        width: '100%',
        marginTop: 16,
        marginBottom: 8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 5,
        marginBottom: 4,
    },
    phoneInputContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        width: '100%',
    },
    phoneTextContainer: {
        backgroundColor: 'transparent',
        paddingVertical: 0,
    },
    phoneTextInput: {
        height: 40,
        fontSize: 14,
    },
    phoneCodeText: {
        fontSize: 14,
    },
    errorText: {
        color: 'red',
        marginTop: 8,
    },
    continueButton: {
        backgroundColor: '#169bf4',
        padding: 12,
        borderRadius: 4,
        alignItems: 'center',
        marginVertical: 8,
    },
    buttonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '500',
    },
    backButton: {
        alignSelf: 'center',
        padding: 8,
    },
    backButtonText: {
        color: '#424242',
        fontSize: 14,
    },
});

