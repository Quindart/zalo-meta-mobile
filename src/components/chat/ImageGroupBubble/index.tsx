import React, { useState } from 'react';
import {
    View,
    Image,
    TouchableOpacity,
    Modal,
    ScrollView,
    Dimensions,
    Text,
    SafeAreaView,
    StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from './styles';

interface ImageGroupBubbleProps {
    imagesGroup: Array<{
        id: string;
        filename: string;
        path: string;
        extension: string;
        size?: string | number;
    }>;
}

const ImageGroupBubble: React.FC<ImageGroupBubbleProps> = ({ imagesGroup }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const { width: screenWidth } = Dimensions.get('window');

    // Calculate grid layout
    const getGridLayout = () => {
        const count = imagesGroup.length;
        if (count === 1) return { columns: 1, rows: 1 };
        if (count === 2) return { columns: 2, rows: 1 };
        if (count === 3) return { columns: 2, rows: 2 }; // 2 on top, 1 on bottom
        if (count === 4) return { columns: 2, rows: 2 };
        return { columns: 2, rows: 2 }; // Default for more than 4 images
    };

    const { columns, rows } = getGridLayout();
    const imageWidth = (screenWidth * 0.6) / columns - 2; // 60% of screen width, minus spacing
    const imageHeight = imageWidth * 0.8; // 4:3 aspect ratio

    const renderGridImages = () => {
        const displayImages = imagesGroup.slice(0, 4); // Show max 4 images
        const remainingCount = imagesGroup.length - 4;

        return (
            <View style={styles.gridContainer}>
                {displayImages.map((image, index) => (
                    <TouchableOpacity
                        key={image.id}
                        style={[
                            styles.imageContainer,
                            {
                                width: imageWidth,
                                height: imageHeight,
                                marginRight: (index + 1) % columns === 0 ? 0 : 2,
                                marginBottom: index < displayImages.length - columns ? 2 : 0
                            }
                        ]}
                        onPress={() => setSelectedImageIndex(index)}
                    >
                        <Image
                            source={{ uri: image.path }}
                            style={styles.gridImage}
                            resizeMode="cover"
                        />
                        {/* Show count overlay on last image if there are more than 4 images */}
                        {index === 3 && remainingCount > 0 && (
                            <View style={styles.moreImagesOverlay}>
                                <Text style={styles.moreImagesText}>+{remainingCount}</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                ))}
            </View>
        );
    };

    const renderFullScreenModal = () => {
        if (selectedImageIndex === null) return null;

        return (
            <Modal
                visible={true}
                transparent={true}
                animationType="fade"
                onRequestClose={() => setSelectedImageIndex(null)}
            >
                <StatusBar backgroundColor="rgba(0,0,0,0.9)" barStyle="light-content" />
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <TouchableOpacity
                            style={styles.closeButton}
                            onPress={() => setSelectedImageIndex(null)}
                        >
                            <Ionicons name="close" size={24} color="white" />
                        </TouchableOpacity>
                        <Text style={styles.imageCounter}>
                            {selectedImageIndex + 1} / {imagesGroup.length}
                        </Text>
                    </View>

                    <ScrollView
                        horizontal
                        pagingEnabled
                        showsHorizontalScrollIndicator={false}
                        contentOffset={{ x: selectedImageIndex * screenWidth, y: 0 }}
                        style={styles.imageScrollView}
                    >
                        {imagesGroup.map((image, index) => (
                            <View key={image.id} style={{ width: screenWidth }}>
                                <Image
                                    source={{ uri: image.path }}
                                    style={styles.fullScreenImage}
                                    resizeMode="contain"
                                />
                            </View>
                        ))}
                    </ScrollView>
                </SafeAreaView>
            </Modal>
        );
    };

    return (
        <View style={styles.container}>
            {renderGridImages()}
            {renderFullScreenModal()}
        </View>
    );
};

export default ImageGroupBubble;
