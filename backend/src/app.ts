import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { config } from "./config/config";
import workspaceRoutes from "./routes/workspaceRoutes";
import boardRoutes from "./routes/boardRoutes";
import listRoutes from "./routes/listRoutes";
import taskRoutes from "./routes/taskRoutes";
import invitationRoutes from "./routes/invitationRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import http from "http";
import { Server } from "socket.io";
import { authenticateFirebaseToken, authenticateToken } from "./middlewares/authenticateFirebaseToken";
import Notification from "./models/Notification";
import notificationService from "./services/notificationService";

const app = express();
const server = http.createServer(app);
export const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173",
    },
});
const PORT = config.server.port;
const DBURI = config.mongo.url;

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((req, res, next) => {
    console.log(req.path, req.method, "\n");
    next();
});
app.use(authenticateFirebaseToken);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/invitation", invitationRoutes);
app.use("/api/notifications", notificationRoutes);

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

        socket.emit("error", error.message);
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
