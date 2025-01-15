import { StyleSheet } from 'react-native';
import theme from '@/theme';

const styles = StyleSheet.create({
    // container: {
    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     backgroundColor: theme.colors.background,
    // },
    text: {
        fontSize: theme.fonts.titleLarge.fontSize,
        color: theme.colors.primary,
        fontWeight: theme.fonts.titleLarge.fontWeight,
    },
    wrapper: {
        height: 650,

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
        width: 190,
        height: 190,
        marginBottom: 50,
        marginTop: 70,
    },
    title: {
        fontSize: theme.fonts.titleMedium.fontSize,
        fontWeight: theme.fonts.titleMedium.fontWeight,
        color: '#000',
        marginBottom: 10,
    },
    description: {
        fontSize: theme.fonts.bodyLarge.fontSize,
        color: '#000',
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    viewButton: {
        flexDirection: 'column',
        width: '100%',
        padding: 10,
        // justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    buttonLogin: {
        backgroundColor: theme.colors.primary,
        padding: 10,
        borderRadius: 20,
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    textLogin: {
        color: theme.colors.onPrimary,

    },
    buttonRegister: {
        backgroundColor: theme.colors.surfaceVariant,
        padding: 10,
        borderRadius: 20,
        width: 180,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textRegister: {
        color: theme.colors.onSurfaceVariant,
    },
});

export default styles;
