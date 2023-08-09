import { Server, Socket } from "socket.io";
import boardService from "../services/boardService";

export = (socket: Socket, connected: Map<string, Set<string>>, io: Server) => {
    socket.on("invalidateLists", async (boardId) => {
        const board = await boardService.getBoardById(boardId);
        const members = board?.members;
        if (members) {
            members.map((member) => {
                if (connected.has(member)) {
                    io.to(member).emit("invalidateLists", boardId);
                }
            });
        }
    });
};
