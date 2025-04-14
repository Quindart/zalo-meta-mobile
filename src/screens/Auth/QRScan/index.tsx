import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Image, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CameraView, useCameraPermissions } from 'expo-camera';
import RootLayout from '@/layout/RootLayout';
import { ROUTING } from '@/utils/constant';
import { RootStackParamList } from '@/navigation/type';
import styles from './css';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Dialog, Portal, Provider as PaperProvider } from 'react-native-paper';
import { getInforQR, loginQR } from '@/services/auth.service'
import SocketService from '@/services/Socket.service';
import SOCKET_EVENTS from '@/types/socket.event.enum';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';

const socketService = SocketService.getInstance().getSocket();

const QRScanTemplate = () => {
    const [visible, setVisible] = useState(false);
    const userStore = useSelector((state: RootState) => state.user);
    const token = userStore.accessToken
    const [scannedData, setScannedData] = useState('');
    const [hasPermission, setHasPermission] = useState(false);
    const [scanned, setScanned] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();
    const [isOpenFlash, setIsOpenFlash] = useState(false);
    const [inforPC, setInforPC] = useState<any>(null);
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    const [resultLogin, setResultLogin] = useState<any>(null);

    // Fix the toggle behavior to be more reliable
    const showDialog = () => setVisible(true);
    const hideDialog = () => {
        setVisible(false);
        setScanned(false);
    };

    useEffect(() => {
        if (!permission) {
            requestPermission().then((response) => setHasPermission(response.granted));
        } else {
            setHasPermission(permission.granted);
        }
    }, [permission, requestPermission]);

    useEffect(() => {
        socketService.connect();
        socketService.off(SOCKET_EVENTS.QR.ACCEPTED_LOGIN);
    }, []);

    const handleBarCodeScanned = async ({ type, data }: { type: string; data: string }) => {
        if (scanned) return;
        setScanned(true);
        setScannedData(data);
        console.log(`Scanned QR code with type ${type} and data ${data}`);

        try {
            const jsonData = JSON.parse(data);
            const result = await getInforQR(jsonData);
            console.log("result", result);

            if (result.success === true) {
                setInforPC(result.data);
                showDialog();
            } else {
                console.log("Login failed, please try again.");
                setScanned(false);
            }
        } catch (error) {
            console.error("Error processing QR code:", error);
            setScanned(false);
        }
    };

    const DialogAcceptLogin = () => {
        return (
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Title>
                    <View style={styles.dialogTitle}>
                        <Image
                            source={require('../../../../assets/scan_qr.png')}
                            style={{ width: 100, height: 100, resizeMode: 'contain' }}
                        />
                    </View>
                </Dialog.Title>
                <Dialog.Title>
                    <Text style={{ fontSize: 23, fontWeight: '600' }}>Đăng nhập Zalo bằng mã QR?</Text>
                </Dialog.Title>
                <Dialog.Content>
                    <View style={styles.info}>
                        <View>
                            <Text>Thiết bị:</Text>
                            <Text>Thời gian:</Text>
                            <Text>Địa điểm:</Text>
                        </View>
                        <View>
                            <Text>{inforPC?.browser} {inforPC?.os}</Text>
                            <Text>{new Date().toLocaleString()}</Text>
                            <Text>TP.HCM, Việt Nam</Text>
                        </View>
                    </View>
                    <Text>Bạn có muốn đăng nhập với thông tin được quét không?</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>Hủy</Button>
                    <Button onPress={handleAcceptLoginOnWeb}>Xác nhận</Button>
                </Dialog.Actions>
            </Dialog>
        );
    };

    const handleAcceptLoginOnWeb = async () => {
        console.log('Accept login on web');

        try {
            // let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZjY0ODZlMGVhMzFhY2NlMDNiM2QxMyIsInBob25lIjoiMDM2NDgzNTY5MiIsImVtYWlsIjoicXVhbmc4MnRoY3NwYkBnbWFpbC5jb20iLCJleHBpcnlfYWNjZXNzdG9rZW4iOiIxZCIsImV4cGlyeV9yZWZyZXNodG9rZW4iOiI3ZCIsImlhdCI6MTc0NDI2NDUzOSwiZXhwIjoxNzQ0MzUwOTM5fQ.wPPsC1PUNt_s4V5u18by9nb_Y5XCyU9avvWyIHYOD_4";
            const result = await loginQR(`${token}`);
            hideDialog();
            setResultLogin(result.data);
            socketService.emit(SOCKET_EVENTS.QR.ACCEPTED_LOGIN, {
                ...result.data
            });

            console.log("Login successful, please check your phone.");
        } catch (error) {
            console.error('Error processing login:', error);
            hideDialog();
        }
    };

    if (!hasPermission) {
        return (
            <RootLayout>
                <Text>Ứng dụng cần quyền camera để quét mã QR. Vui lòng cấp quyền.</Text>
            </RootLayout>
        );
    }

    return (
        <PaperProvider>
            <View style={styles.fullScreenContainer}>
                <CameraView
                    style={styles.fullScreenCamera}
                    barcodeScannerSettings={{
                        barcodeTypes: ['qr'],
                    }}
                    onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
                    enableTorch={isOpenFlash}
                />

                <View style={styles.topContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
                        <Text style={styles.textBold}>X</Text>
                    </TouchableOpacity>
                    <Text style={styles.centerText}>
                        Quét mã QR để truy cập vào ứng dụng
                    </Text>
                </View>

                <View style={styles.bottomContent}>
                    <TouchableOpacity
                        style={styles.openFlash}
                        onPress={() => setIsOpenFlash(!isOpenFlash)}
                    >
                        <Icon name={isOpenFlash ? 'flash-on' : 'flash-off'} size={30} color={'#fff'} />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.buttonTouchable}
                        onPress={() => setScanned(false)}
                    >
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                </View>

                <Portal>
                    <DialogAcceptLogin />
                </Portal>
            </View>
        </PaperProvider>
    );
};

export default QRScanTemplate;