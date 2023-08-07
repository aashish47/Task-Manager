import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { config } from "./config/config";
import { authenticateFirebaseToken, authenticateToken } from "./middlewares/authenticateFirebaseToken";
import Notification from "./models/Notification";
import boardRoutes from "./routes/boardRoutes";
import commentRoutes from "./routes/commentRoutes";
import listRoutes from "./routes/listRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import boardService from "./services/boardService";
import notificationService from "./services/notificationService";
import taskService from "./services/taskService";
import workspaceService from "./services/workspaceService";

const app = express();
const server = http.createServer(app);
const PORT = config.server.port;
const DBURI = config.mongo.url;

export let io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});

const environment = process.env.NODE_ENV || "development";
console.log(`Current Environment: ${environment}`);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((req, res, next) => {
    console.log(req.path, req.method, "\n");
    next();
});
app.use("/api", authenticateFirebaseToken);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

if (environment === "production") {
    app.use(express.static(path.join(__dirname, "../../frontend/dist")));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
    });
    io = new Server(server);
} else if (environment === "development") {
    app.use(cors());
}

export const connected = new Map<string, Set<string>>();

io.on("connection", async (socket) => {
    try {
        const authorization = socket.handshake.query.authorization as string | undefined;

        const decodedToken = await authenticateToken(authorization);

        const uid = decodedToken.uid;
        const socketId = socket.id;
        // Join the user's room
        socket.join(uid);

        // Store the socket ID in the user's set of connected sockets
        if (connected.has(uid)) {
            connected.get(uid)?.add(socketId);
        } else {
            connected.set(uid, new Set([socketId]));
        }

        const notifications = await Notification.find({ uid, isPending: true });
        const totalNotifications = notifications.length;
        if (totalNotifications > 0) {
            io.to(uid).emit("notifications", totalNotifications);
            notifications.map((notification) => {
                const id = notification._id;
                notificationService.updateNotification(id, { isPending: false });
            });
        }

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

        socket.on("invalidateBoards", async (boardId) => {
            const board = await boardService.getBoardById(boardId);
            const members = board?.members;
            if (members) {
                members.map((member) => {
                    if (connected.has(member)) {
                        io.to(member).emit("invalidateBoards");
                    }
                });
            }
        });

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

        socket.on("invalidateTasks", async (boardId) => {
            const board = await boardService.getBoardById(boardId);
            const members = board?.members;
            if (members) {
                members.map((member) => {
                    if (connected.has(member)) {
                        io.to(member).emit("invalidateTasks", boardId);
                    }
                });
            }
        });

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

        // Handle disconnect event
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
        console.log("Map:", connected);
    } catch (error: any) {
        console.error("Socket connection error:", error);
        socket.emit("error", error.code);
        socket.disconnect(true);
    }
});

mongoose
    .connect(DBURI)
    .then(() => {
        server.listen(PORT);
        console.log(`Server running at port ${PORT} \n`);
    })
    .catch((error) => console.log(error));
