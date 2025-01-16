import { StyleSheet } from 'react-native';
import theme from '@/theme';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 50,
        backgroundColor: theme.colors.primary,
        alignItems: 'center',
    },
    backButton: {
        marginLeft: 10,
    },
    headerTitile: {
        color: theme.colors.onPrimary,
        fontSize: theme.fonts.titleMedium.fontSize,
        marginLeft: 15,
    },
    containerText: {
        justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: theme.colors.surfaceVariant,
        height: 50,
        marginBottom: 20,
    },
    text: {
        color: theme.colors.onSurfaceVariant,
        marginLeft: 15,
    },


    inputContainer: {
        backgroundColor: theme.colors.surface,
        marginHorizontal: 15,
        marginVertical: 10,
        borderRadius: 5,
        borderBottomWidth: 2,
        borderBottomColor: theme.colors.surfaceVariant,
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        marginHorizontal: 10,
    },
    passwordInput: {
        flex: 1,// chiếm hết không gian còn lại của cha
        fontSize: 16,
    },
    eyeButton: {
        paddingHorizontal: 12,
    },

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    button: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10,
        width: '90%',
        height: 50,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: theme.colors.onPrimary,

    },
    forgotPassword: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    forgotPasswordText: {
        color: theme.colors.primary,
    },

});


export default styles;
