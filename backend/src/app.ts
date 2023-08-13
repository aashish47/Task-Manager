import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { config } from "./config/config";
import { authenticateFirebaseToken, authenticateToken } from "./middlewares/authenticateFirebaseToken";
import boardRoutes from "./routes/boardRoutes";
import commentRoutes from "./routes/commentRoutes";
import listRoutes from "./routes/listRoutes";
import notificationRoutes from "./routes/notificationRoutes";
import taskRoutes from "./routes/taskRoutes";
import userRoutes from "./routes/userRoutes";
import workspaceRoutes from "./routes/workspaceRoutes";
import boardHandlers from "./socketHandlers/boardHandlers";
import commentHandlers from "./socketHandlers/commentHandlers";
import commonHandlers from "./socketHandlers/commonHandlers";
import listHandlers from "./socketHandlers/listHandlers";
import notificationHandlers from "./socketHandlers/notificationHandlers";
import taskHandlers from "./socketHandlers/taskHandlers";
import workspaceHandlers from "./socketHandlers/workspaceHandlers";

const app = express();
const server = http.createServer(app);
const PORT = config.server.port;
const DBURI = config.mongo.url;
const firebaseConfig = config.firebaseConfig;
const origin = "http://localhost:5173";

export let io = new Server(server, {
    cors: {
        origin,
    },
});

const environment = process.env.NODE_ENV || "development";
export const baseURL = environment === "production" ? "https://task-manager-dt0i.onrender.com" : origin;
console.log(`Current Environment: ${environment} BaseUrl: ${baseURL}`);

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }));
app.use((req, _res, next) => {
    console.log(req.path, req.method, "\n");
    next();
});
app.use(cors());

app.use("/api", authenticateFirebaseToken);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/users", userRoutes);
app.use("/api/comments", commentRoutes);

app.get("/config", (_req, res) => {
    res.json(firebaseConfig);
});

if (environment === "production") {
    app.use(express.static("public"));
    app.get("*", (_req, res) => {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    io = new Server(server);
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

        notificationHandlers(uid, io);
        workspaceHandlers(socket, connected, io);
        boardHandlers(socket, connected, io);
        listHandlers(socket, connected, io);
        taskHandlers(socket, connected, io);
        commentHandlers(socket, connected, io);
        commonHandlers(socket, socketId, connected, uid);
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
