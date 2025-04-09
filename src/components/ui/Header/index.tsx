import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

type HeaderProps = {
    title?: string;
    showBackButton?: boolean;
};

const Header = ({ title = '', showBackButton = true }: HeaderProps) => {
    const navigation = useNavigation();

    return (
        <View style={styles.header}>
            {/* Back Button */}
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            )}
            {/* Title */}
            <Text style={styles.title}>{title}</Text>


        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        backgroundColor: '#00A4E4',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    iconButton: {
        paddingRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: 'white',
        marginLeft: 10,
    },
});

export default Header;
