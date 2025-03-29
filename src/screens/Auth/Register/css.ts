import { StyleSheet } from 'react-native';
import theme from '@/theme';

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        height: 50,
        // backgroundColor: theme.colors.primary,
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

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30,
    },
    title: {
        color: theme.colors.onSurface,
        fontSize: theme.fonts.titleLarge.fontSize,
        fontWeight: theme.fonts.titleMedium.fontWeight,
        marginBottom: 40,
    },
    phoneInputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        borderRadius: 15,
        height: 52,
    },
    pickerWrapper: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRightWidth: 1,
        borderRightColor: theme.colors.surfaceVariant,
        width: 80,
        marginRight: 15,

    },
    selectedCode: {
        fontSize: 16,
        marginRight: 10,
    },
    phoneInput: {
        flex: 1,
        // padding: 10,
        // borderBottomWidth: 2,
        // borderBottomColor: theme.colors.surfaceVariant,
        fontSize: 16,
    },
    input: {
        width: '90%',
        height: 52,
        borderRadius: 15,
        // backgroundColor: theme.colors.surfaceVariant,
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        paddingHorizontal: 15,
        marginTop: 10,

    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
    },
    modalItem: {
        padding: 10,
    },
    modalItemText: {
        fontSize: 16,
    },

    button: {
        backgroundColor: theme.colors.primary,
        marginHorizontal: 15,
        marginVertical: 10,
        padding: 10,
        width: '90%',
        height: 50,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 60,
    },

    buttonText: {
        color: theme.colors.onPrimary,
    },

    datePickerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '90%',
        height: 52,
    },
    dateOfBirthText: {
        fontSize: 16,
        marginRight: 10,
    },
    buttonDate: {
        borderWidth: 1,
        borderColor: theme.colors.surfaceVariant,
        padding: 10,
        width: '90%',
        height: 50,
        borderRadius: 15,
        justifyContent: 'center',
        // alignItems: 'center',
        marginTop: 10,

    },
    titleDate: {
        fontSize: 16,
        marginRight: 10,
        color: theme.colors.onSurfaceVariant,
    }
});

export default styles;
