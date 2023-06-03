import mongoose from "mongoose";
import cors from "cors";
import express from "express";
import { config } from "./config/config";
import workspaceRoutes from "./routes/workspaceRoutes";
import boardRoutes from "./routes/boardRoutes";
import listRoutes from "./routes/listRoutes";
import taskRoutes from "./routes/taskRoutes";
import authenticateFirebaseToken from "./middlewares/authenticateFirebaseToken";

const app = express();
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

mongoose
    .connect(DBURI)
    .then(() => {
        app.listen(PORT);
        console.log(`Server running at port ${PORT} \n`);
    })
    .catch((error) => console.log(error));
