import { Platform } from 'react-native';
import { MD3Type } from 'react-native-paper/lib/typescript/types';

const baseFont: Required<
    Pick<MD3Type, 'fontFamily' | 'fontWeight' | 'letterSpacing' | 'lineHeight'>
> = {
    fontFamily: Platform.select({
        web: 'Roboto, "Helvetica Neue", Helvetica, Arial, sans-serif',
        ios: 'San Francisco', // Font hệ thống trên iOS
        default: 'Roboto',    // Font mặc định trên Android
    }),
    fontWeight: '400', // Trọng lượng trung bình
    letterSpacing: 0.2, // Khoảng cách ký tự
    lineHeight: 14,     // Chiều cao dòng cơ bản
};

export const fontConfig: Record<string, MD3Type> = {
    default: {
        ...baseFont,
        fontSize: 12, // Dùng cho văn bản chung
    },
    bodySmall: {
        ...baseFont,
        fontSize: 12,
        fontWeight: '400',
        lineHeight: 18,
    },
    bodyMedium: {
        ...baseFont,
        fontSize: 14,
        fontWeight: '400',
        lineHeight: 20,
    },
    bodyLarge: {
        ...baseFont,
        fontSize: 16,
        fontWeight: '400',
        lineHeight: 22,
    },
    labelSmall: {
        ...baseFont,
        fontSize: 12,
        fontWeight: '500', // Nhấn mạnh hơn cho nhãn
        lineHeight: 16,
    },
    labelMedium: {
        ...baseFont,
        fontSize: 14,
        fontWeight: '500',
        lineHeight: 20,
    },
    labelLarge: {
        ...baseFont,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 22,
    },
    titleSmall: {
        ...baseFont,
        fontSize: 14,
        fontWeight: '600', // Tiêu đề cần nổi bật hơn
        lineHeight: 20,
    },
    titleMedium: {
        ...baseFont,
        fontSize: 18,
        fontWeight: '600',
        lineHeight: 24,
    },
    titleLarge: {
        ...baseFont,
        fontSize: 22,
        fontWeight: '700', // Trọng lượng cao nhất cho tiêu đề chính
        lineHeight: 28,
    },
    caption: {
        ...baseFont,
        fontSize: 10,
        fontWeight: '400',
        lineHeight: 14,
    },
    button: {
        ...baseFont,
        fontSize: 14,
        fontWeight: '500',
        letterSpacing: 0.5, // Nổi bật hơn cho văn bản nút
        lineHeight: 20,
    },
};

export default fontConfig;
