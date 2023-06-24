import { ReactNode, useEffect, useState } from "react";

import { Socket, io } from "socket.io-client";
import { socketContext } from "../hooks/useSocketContext";

const SocketContextProvider = ({ children }: { children: ReactNode }) => {
    const [socket, setSocket] = useState<Socket | null>(null);
    const token = localStorage.getItem("ID_TOKEN");
    useEffect(() => {
        const socketInstance = io("http://localhost:3000", { query: { authorization: `Bearer ${token}` } });
        setSocket(socketInstance);
        return () => {
            socketInstance.disconnect();
        };
    }, [token]);
    return <socketContext.Provider value={socket}>{children}</socketContext.Provider>;
};

export default SocketContextProvider;
