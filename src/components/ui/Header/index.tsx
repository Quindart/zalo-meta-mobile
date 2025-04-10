import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '@/theme';

type HeaderProps = {
    title?: string;
    showBackButton?: boolean;
    useGradient?: boolean; // Cho phép bật tắt gradient
};

const Header = ({ title = '', showBackButton = true, useGradient = true }: HeaderProps) => {
    const navigation = useNavigation();

    const Content = (
        <View style={styles.content}>
            {showBackButton && (
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            )}
            <Text style={styles.title}>{title}</Text>
        </View>
    );

    return useGradient ? (
        <LinearGradient
            colors={[theme.colors.primary, theme.colors.primaryContainer]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.header}
        >
            {Content}
        </LinearGradient>
    ) : (
        <View style={[styles.header, { backgroundColor: theme.colors.primary }]}>
            {Content}
        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        height: 50,
        justifyContent: 'center',
        paddingHorizontal: 10,
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconButton: {
        paddingRight: 10,
    },
    title: {
        flex: 1,
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginLeft: 10,
    },
});

export default Header;
