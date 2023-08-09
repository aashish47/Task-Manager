import { Socket } from "socket.io";

export = (socket: Socket, socketId: string, connected: Map<string, Set<string>>, uid: string) => {
    socket.on("disconnect", () => {
        // Remove the socket ID from the user's set of connected sockets
        if (connected.has(uid)) {
            const sockets = connected.get(uid);
            if (sockets) {
                sockets.delete(socketId);
                // If the user has no more connected sockets, remove the entry from the map
                if (sockets.size === 0) {
                    connected.delete(uid);
                    // Leave the user's room
                    socket.leave(uid);
                }
            }
        }

        console.log(`${socketId} disconnected`);
        console.log("Map:", connected);
    });
};
