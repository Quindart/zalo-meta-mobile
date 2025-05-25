import { StyleSheet, Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        borderRadius: 8,
        overflow: 'hidden',
    },
    imageContainer: {
        position: 'relative',
    },
    gridImage: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
    moreImagesOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    moreImagesText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.95)',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
    },
    closeButton: {
        padding: 8,
    },
    imageCounter: {
        color: 'white',
        fontSize: 16,
        fontWeight: '500',
    },
    imageScrollView: {
        flex: 1,
    },
    fullScreenImage: {
        width: screenWidth,
        height: screenHeight - 100, // Account for header
    },
});

export default styles;
