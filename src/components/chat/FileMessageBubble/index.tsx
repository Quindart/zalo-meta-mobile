import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Modal,
  ActivityIndicator,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video, ResizeMode } from "expo-av";
import { WebView } from "react-native-webview";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import { styles } from "./style";
import { getFileIcon, getMimeType } from "./helper";

interface FileProps {
  filename: string;
  path: string;
  extension: string;
  size?: string | number;
}

const FileMessageBubble = ({ file }: { file: FileProps }) => {
  const ext = file.extension.toLowerCase();
  const mimeType = getMimeType(ext);
  const isImage = ["jpg", "jpeg", "png"].includes(ext);
  const isPdf = ext === "pdf";
  const isVideo = ext === "mp4";
  const { name: iconName, color: iconColor } = getFileIcon(ext);

  const [modalVisible, setModalVisible] = useState(false);
  const [base64ImageUri, setBase64ImageUri] = useState<string | null>(null);
  const [loadingImage, setLoadingImage] = useState(false);

  useEffect(() => {
    if (isImage && file.path.startsWith("file://")) {
      setLoadingImage(true);
      FileSystem.readAsStringAsync(file.path, {
        encoding: FileSystem.EncodingType.Base64,
      })
        .then((base64) => {
          const uri = `data:image/${ext};base64,${base64}`;
          setBase64ImageUri(uri);
        })
        .catch((err) => {
          console.error("❌ Base64 conversion failed:", err);
          setBase64ImageUri(null);
        })
        .finally(() => setLoadingImage(false));
    }
  }, [file.path]);

  const openFileExternally = async () => {
    try {
      const fileName = `${file.filename}.${file.extension}`;
      const tempDir = FileSystem.cacheDirectory + "temp/";
      const tempUri = tempDir + encodeURIComponent(fileName);

      await FileSystem.makeDirectoryAsync(tempDir, { intermediates: true });
      const downloadResult = await FileSystem.downloadAsync(file.path, tempUri);

      if (Platform.OS === "android") {
        const contentUri = await FileSystem.getContentUriAsync(
          downloadResult.uri
        );
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: contentUri,
          flags: 1,
          type: mimeType,
        });
      } else {
        if (!(await Sharing.isAvailableAsync())) {
          Alert.alert("Không hỗ trợ chia sẻ", "Thiết bị không hỗ trợ mở file.");
          return;
        }
        await Sharing.shareAsync(downloadResult.uri, {
          mimeType,
          dialogTitle: `Mở ${fileName}`,
        });
      }
    } catch (err) {
      console.error("❌ Error opening file externally", err);
      Alert.alert("Lỗi", "Không thể mở file.");
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
          loadingImage ? (
            <ActivityIndicator size="small" color="#999" />
          ) : base64ImageUri || !file.path.startsWith("file://") ? (
            <Image
              source={{
                uri: file.path.startsWith("file://")
                  ? base64ImageUri!
                  : file.path,
              }}
              style={styles.image}
              resizeMode="cover"
              onError={() => {
                console.warn("⚠️ Không thể hiển thị ảnh");
              }}
            />
          ) : (
            <Text style={{ fontSize: 12, color: "red" }}>
              Không thể hiển thị ảnh
            </Text>
          )
        ) : (
          <View style={styles.fileContent}>
            <MaterialCommunityIcons
              name={iconName as any}
              size={28}
              color={iconColor}
            />
            <Text style={styles.fileName} numberOfLines={1}>
              {file.filename}.{file.extension}
            </Text>
            <Text style={styles.fileSize}>
              {(Number(file.size || 0) / 1024).toFixed(1)} KB
            </Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Modal preview */}
      <Modal visible={modalVisible} animationType="slide">
        <View style={{ flex: 1, backgroundColor: "#000" }}>
          {isImage && (
            <Image
              source={{
                uri: file.path.startsWith("file://")
                  ? base64ImageUri!
                  : file.path,
              }}
              style={{ flex: 1, resizeMode: "contain" }}
            />
          )}
          {isPdf && <WebView source={{ uri: file.path }} style={{ flex: 1 }} />}
          {isVideo && (
            <Video
              source={{ uri: file.path }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              style={{ flex: 1 }}
            />
          )}
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={{ padding: 20 }}
          >
            <Text style={{ color: "#fff", textAlign: "center" }}>Đóng</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default FileMessageBubble;
