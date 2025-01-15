import { MD3Colors } from 'react-native-paper/lib/typescript/types';

const colors: MD3Colors = {
    primary: '#0078FF', // Xanh dương chủ đạo của Zalo
    primaryContainer: '#E6F3FF', // Nền nhẹ hơn màu xanh chủ đạo
    onPrimary: '#FFFFFF', // Màu chữ trên nền xanh
    onPrimaryContainer: '#0078FF', // Màu xanh trên nền container sáng
    secondary: '#F5A623', // Màu phụ (cam vàng nhẹ)
    onSecondary: '#FFFFFF', // Màu chữ trên nền màu phụ
    secondaryContainer: '#FFF6E6', // Nền nhạt cho màu phụ
    onSecondaryContainer: '#F5A623', // Cam nhạt trên container sáng
    tertiary: '#4CAF50', // Màu bổ sung (xanh lá cây)
    onTertiary: '#FFFFFF', // Màu chữ trên nền xanh lá
    tertiaryContainer: '#E8F5E9', // Nền nhạt cho màu xanh lá
    onTertiaryContainer: '#4CAF50', // Màu xanh lá đậm trên nền sáng
    error: '#E53935', // Màu lỗi (đỏ)
    onError: '#FFFFFF', // Màu chữ trên nền lỗi
    errorContainer: '#FFEBEE', // Nền nhạt cho lỗi
    onErrorContainer: '#E53935', // Đỏ đậm trên nền lỗi sáng
    background: '#FFFFFF', // Nền tổng thể (trắng)
    onBackground: '#212121', // Màu chữ trên nền
    surface: '#FFFFFF', // Màu bề mặt (trắng)
    onSurface: '#212121', // Màu chữ trên bề mặt
    surfaceVariant: '#F2F2F2', // Bề mặt phụ
    onSurfaceVariant: '#757575', // Màu chữ trên bề mặt phụ
    outline: '#E0E0E0', // Màu viền nhẹ
    outlineVariant: '#BDBDBD', // Viền phụ
    shadow: 'rgba(0, 0, 0, 0.2)', // Bóng đổ
    scrim: 'rgba(0, 0, 0, 0.4)', // Hiệu ứng che phủ
    inverseSurface: '#212121', // Bề mặt đảo ngược
    inverseOnSurface: '#FFFFFF', // Màu chữ trên bề mặt đảo ngược
    inversePrimary: '#81D4FA', // Màu xanh nhạt đảo ngược
    elevation: {
        level0: 'transparent',
        level1: '#FFFFFF', // Nền sáng ở độ cao thấp
        level2: '#F7F9FB', // Màu sáng hơn một chút
        level3: '#F2F4F7', // Màu sáng hơn
        level4: '#ECEFF1', // Màu sáng trung bình
        level5: '#E0E0E0', // Màu sáng tối hơn
    },
    surfaceDisabled: 'rgba(33, 33, 33, 0.12)', // Bề mặt bị vô hiệu hoá
    onSurfaceDisabled: 'rgba(33, 33, 33, 0.38)', // Màu chữ trên bề mặt bị vô hiệu hoá
    backdrop: 'rgba(33, 33, 33, 0.32)', // Hiệu ứng nền mờ
};
export default colors;
