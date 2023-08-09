import { Server, Socket } from "socket.io";
import workspaceService from "../services/workspaceService";

export = (socket: Socket, connected: Map<string, Set<string>>, io: Server) => {
    socket.on("invalidateWorkspaces", async (workspaceId) => {
        const workspace = await workspaceService.getWorkspaceById(workspaceId);
        const members = workspace?.members;
        if (members) {
            members.map((member) => {
                if (connected.has(member)) {
                    io.to(member).emit("invalidateWorkspaces");
                }
            });
        }
    });
};
