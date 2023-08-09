import { Server, Socket } from "socket.io";
import boardService from "../services/boardService";
import taskService from "../services/taskService";

export = (socket: Socket, connected: Map<string, Set<string>>, io: Server) => {
    socket.on("invalidateComments", async (taskId) => {
        const task = await taskService.getTaskById(taskId);
        if (!task) {
            return;
        }
        const { boardId } = task;
        const board = await boardService.getBoardById(boardId);
        const members = board?.members;
        if (members) {
            members.map((member) => {
                if (connected.has(member)) {
                    io.to(member).emit("invalidateComments", taskId);
                }
            });
        }
    });
};
