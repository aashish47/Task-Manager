import { createContext, useContext } from "react";
import { Socket } from "socket.io-client";

export const socketContext = createContext<Socket | null>(null);

const useSocketContext = () => {
    const context = useContext(socketContext);
    return context;
};

export default useSocketContext;
