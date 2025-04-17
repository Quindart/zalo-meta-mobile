// import React from 'react';
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     Image,
//     StyleSheet,
//     Dimensions,
//     Alert,
//     Platform,
// } from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import * as FileSystem from 'expo-file-system';
// import * as Sharing from 'expo-sharing';
// import * as IntentLauncher from 'expo-intent-launcher';

// const { width } = Dimensions.get('window');

// interface FileProps {
//     filename: string;
//     path: string;
//     extension: string;
//     size?: string | number;
// }

// const getMimeType = (ext: string): string => {
//     const map: Record<string, string> = {
//         pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
//         pdf: 'application/pdf',
//         docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
//         xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//         jpg: 'image/jpeg',
//         jpeg: 'image/jpeg',
//         png: 'image/png',
//         mp4: 'video/mp4',
//     };
//     return map[ext.toLowerCase()] || 'application/*';
// };

// const getFileIcon = (ext: string): { name: string; color: string } => {
//     const extLower = ext.toLowerCase();
//     const iconMap: Record<string, { name: string; color: string }> = {
//         pdf: { name: 'file-pdf-box', color: '#D32F2F' },
//         docx: { name: 'file-word-box', color: '#2962FF' },
//         doc: { name: 'file-word-box', color: '#2962FF' },
//         pptx: { name: 'file-powerpoint-box', color: '#F57C00' },
//         ppt: { name: 'file-powerpoint-box', color: '#F57C00' },
//         xlsx: { name: 'file-excel-box', color: '#388E3C' },
//         xls: { name: 'file-excel-box', color: '#388E3C' },
//         mp4: { name: 'file-video', color: '#7B1FA2' },
//         mp3: { name: 'file-music', color: '#009688' },
//         jpg: { name: 'image', color: '#555' },
//         jpeg: { name: 'image', color: '#555' },
//         png: { name: 'image', color: '#555' },
//     };

//     return iconMap[extLower] || { name: 'file', color: '#555' };
// };

// const FileMessageBubble = ({ file }: { file: FileProps }) => {
//     const isImage = ['jpg', 'jpeg', 'png'].includes(file.extension.toLowerCase());
//     const { name: iconName, color: iconColor } = getFileIcon(file.extension);

//     // const openFile = async () => {
//     //     try {
//     //         const mimeType = getMimeType(file.extension);
//     //         const fileName = `${file.filename}.${file.extension}`;
//     //         const tempDir = FileSystem.cacheDirectory + 'temp/';
//     //         await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
//     //         const tempUri = tempDir + encodeURIComponent(fileName);
//     //         await FileSystem.downloadAsync(file.path, tempUri);

//     //         if (Platform.OS === 'android') {
//     //             const contentUri = await FileSystem.getContentUriAsync(tempUri);
//     //             await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
//     //                 data: contentUri,
//     //                 flags: 1,
//     //                 type: mimeType,
//     //             });
//     //         } else {
//     //             if (!(await Sharing.isAvailableAsync())) {
//     //                 Alert.alert('Không hỗ trợ chia sẻ', 'Thiết bị không hỗ trợ mở file.');
//     //                 return;
//     //             }
//     //             await Sharing.shareAsync(tempUri, {
//     //                 mimeType,
//     //                 dialogTitle: `Mở ${fileName}`,
//     //             });
//     //         }
//     //     } catch (err) {
//     //         console.log('Error opening file', err);
//     //         Alert.alert('Lỗi', 'Không thể mở file.');
//     //     }
//     // };
//     const openFile = async () => {
//         try {
//             const mimeType = getMimeType(file.extension);
//             const fileName = `${file.filename}.${file.extension}`;
//             const tempDir = FileSystem.cacheDirectory + 'temp/';
//             const tempUri = tempDir + encodeURIComponent(fileName);

//             await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });

//             console.log("📥 Downloading file from:", file.path);
//             const downloadResult = await FileSystem.downloadAsync(file.path, tempUri);
//             console.log("✅ Downloaded to:", downloadResult.uri);

//             if (Platform.OS === 'android') {
//                 const contentUri = await FileSystem.getContentUriAsync(downloadResult.uri);
//                 console.log("📄 Opening with IntentLauncher:", contentUri);

//                 await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
//                     data: contentUri,
//                     flags: 1,
//                     type: mimeType,
//                 });
//             } else {
//                 if (!(await Sharing.isAvailableAsync())) {
//                     Alert.alert('Không hỗ trợ chia sẻ', 'Thiết bị không hỗ trợ mở file.');
//                     return;
//                 }
//                 await Sharing.shareAsync(downloadResult.uri, {
//                     mimeType,
//                     dialogTitle: `Mở ${fileName}`,
//                 });
//             }
//         } catch (err) {
//             console.error('❌ Error opening file', err);
//             Alert.alert('Lỗi', 'Không thể mở file. Kiểm tra lại định dạng hoặc file path.');
//         }
//     };

//     return (
//         <TouchableOpacity style={styles.bubble} onPress={openFile}>
//             {isImage ? (
//                 <Image source={{ uri: file.path }} style={styles.image} />
//             ) : (
//                 <View style={styles.fileContent}>
//                     <MaterialCommunityIcons
//                         name={iconName}
//                         size={28}
//                         color={iconColor}
//                     />
//                     <Text style={styles.fileName} numberOfLines={1}>
//                         {file.filename}.{file.extension}
//                     </Text>
//                     <Text style={styles.fileSize}>
//                         {(Number(file.size || 0) / 1024).toFixed(1)} KB
//                     </Text>
//                 </View>
//             )}
//         </TouchableOpacity>
//     );
// };

// const styles = StyleSheet.create({
//     bubble: {
//         maxWidth: width * 0.7,
//         backgroundColor: '#f0f0f0',
//         borderRadius: 10,
//         padding: 10,
//         alignItems: 'center',
//     },
//     fileContent: {
//         alignItems: 'center',
//     },
//     fileName: {
//         fontSize: 13,
//         marginTop: 4,
//         color: '#333',
//         textAlign: 'center',
//     },
//     fileSize: {
//         fontSize: 11,
//         color: '#999',
//         marginTop: 2,
//     },
//     image: {
//         width: 180,
//         height: 120,
//         borderRadius: 8,
//     },
// });

// export default FileMessageBubble;


import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    StyleSheet,
    Dimensions,
    Alert,
    Platform,
    Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video } from 'expo-av';
import { WebView } from 'react-native-webview';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as IntentLauncher from 'expo-intent-launcher';

const { width } = Dimensions.get('window');

interface FileProps {
    filename: string;
    path: string;
    extension: string;
    size?: string | number;
}

const getMimeType = (ext: string): string => {
    const map: Record<string, string> = {
        pptx: 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        pdf: 'application/pdf',
        docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        mp4: 'video/mp4',
    };
    return map[ext.toLowerCase()] || 'application/*';
};

const getFileIcon = (ext: string): { name: string; color: string } => {
    const extLower = ext.toLowerCase();
    const iconMap: Record<string, { name: string; color: string }> = {
        pdf: { name: 'file-pdf-box', color: '#D32F2F' },
        docx: { name: 'file-word-box', color: '#2962FF' },
        doc: { name: 'file-word-box', color: '#2962FF' },
        pptx: { name: 'file-powerpoint-box', color: '#F57C00' },
        ppt: { name: 'file-powerpoint-box', color: '#F57C00' },
        xlsx: { name: 'file-excel-box', color: '#388E3C' },
        xls: { name: 'file-excel-box', color: '#388E3C' },
        mp4: { name: 'file-video', color: '#7B1FA2' },
        mp3: { name: 'file-music', color: '#009688' },
        jpg: { name: 'image', color: '#555' },
        jpeg: { name: 'image', color: '#555' },
        png: { name: 'image', color: '#555' },
    };
    return iconMap[extLower] || { name: 'file', color: '#555' };
};

const FileMessageBubble = ({ file }: { file: FileProps }) => {
    const ext = file.extension.toLowerCase();
    const mimeType = getMimeType(ext);
    const isImage = ['jpg', 'jpeg', 'png'].includes(ext);
    const isPdf = ext === 'pdf';
    const isVideo = ext === 'mp4';

    const { name: iconName, color: iconColor } = getFileIcon(ext);

    const [modalVisible, setModalVisible] = useState(false);

    const openFileExternally = async () => {
        try {
            const fileName = `${file.filename}.${file.extension}`;
            const tempDir = FileSystem.cacheDirectory + 'temp/';
            const tempUri = tempDir + encodeURIComponent(fileName);

            await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
            const downloadResult = await FileSystem.downloadAsync(file.path, tempUri);

            if (Platform.OS === 'android') {
                const contentUri = await FileSystem.getContentUriAsync(downloadResult.uri);
                await IntentLauncher.startActivityAsync('android.intent.action.VIEW', {
                    data: contentUri,
                    flags: 1,
                    type: mimeType,
                });
            } else {
                if (!(await Sharing.isAvailableAsync())) {
                    Alert.alert('Không hỗ trợ chia sẻ', 'Thiết bị không hỗ trợ mở file.');
                    return;
                }
                await Sharing.shareAsync(downloadResult.uri, {
                    mimeType,
                    dialogTitle: `Mở ${fileName}`,
                });
            }
        } catch (err) {
            console.error('❌ Error opening file', err);
            Alert.alert('Lỗi', 'Không thể mở file.');
        }
    };

    const handlePress = () => {
        if (isImage || isPdf || isVideo) {
            setModalVisible(true);
        } else {
            openFileExternally();
        }
    };

    return (
        <>
            <TouchableOpacity style={styles.bubble} onPress={handlePress}>
                {isImage ? (
                    <Image source={{ uri: file.path }} style={styles.image} />
                ) : (
                    <View style={styles.fileContent}>
                        <MaterialCommunityIcons name={iconName} size={28} color={iconColor} />
                        <Text style={styles.fileName} numberOfLines={1}>
                            {file.filename}.{file.extension}
                        </Text>
                        <Text style={styles.fileSize}>{(Number(file.size || 0) / 1024).toFixed(1)} KB</Text>
                    </View>
                )}
            </TouchableOpacity>

            <Modal visible={modalVisible} animationType="slide">
                <View style={{ flex: 1, backgroundColor: '#000' }}>
                    {isImage && (
                        <Image source={{ uri: file.path }} style={{ flex: 1, resizeMode: 'contain' }} />
                    )}
                    {isPdf && <WebView source={{ uri: file.path }} style={{ flex: 1 }} />}
                    {isVideo && (
                        <Video
                            source={{ uri: file.path }}
                            useNativeControls
                            resizeMode="contain"
                            style={{ flex: 1 }}
                        />
                    )}

                    <TouchableOpacity onPress={() => setModalVisible(false)} style={{ padding: 20 }}>
                        <Text style={{ color: '#fff', textAlign: 'center' }}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    bubble: {
        maxWidth: width * 0.7,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
    },
    fileContent: {
        alignItems: 'center',
    },
    fileName: {
        fontSize: 13,
        marginTop: 4,
        color: '#333',
        textAlign: 'center',
    },
    fileSize: {
        fontSize: 11,
        color: '#999',
        marginTop: 2,
    },
    image: {
        width: 180,
        height: 120,
        borderRadius: 8,
    },
});

export default FileMessageBubble;
