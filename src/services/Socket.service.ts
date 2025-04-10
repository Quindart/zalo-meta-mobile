import { io } from "socket.io-client";
const API_URL = process.env.EXPO_PUBLIC_API_URL;

class SocketService {
    public socket: any;
    private static instance: SocketService;
    private url = API_URL
    static instanceCount = 0;
    private config = {
        reconnectionDelayMax: 10000,
    }
    constructor() {
        this.socket = io(this.url, { ...this.config });

        SocketService.instanceCount++;
        console.log(`📡 New SocketManager instance created. Total: ${SocketService.instanceCount}`);
    }
    static getInstance(): SocketService {
        if (!SocketService.instance) {
            SocketService.instance = new SocketService();
        }
        return SocketService.instance;
    }
    getSocket() {
        return this.socket
    }
}
export default SocketService;