import { io } from "socket.io-client";
const API_URL = process.env.EXPO_PUBLIC_API_URL;
class SocketService {
    public socket: any;
    private url = API_URL
    static instanceCount = 0;

    private config = {
        autoConnect: true,
    }
    constructor() {
        this.socket = io(this.url, { ...this.config });
        SocketService.instanceCount++;
        console.log(`📡 New SocketManager instance created. Total: ${SocketService.instanceCount}`);
    }
    getSocket() {
        return this.socket
    }
}
export default new SocketService()