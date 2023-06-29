import axios from "axios";
import { ListType } from "../hooks/useListsContext";
import { TaskType } from "../hooks/useTasksContext";
import { BoardType } from "../hooks/useBoardsContext";
import { Task } from "../components/EnterTaskTitle";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("ID_TOKEN");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

const checkErrorType = async (error: any) => {
    if (error.response && error.response.data && error.response.data.code && error.response.data.code === "auth/id-token-expired") {
        await handleTokenExpireError();
    } else {
        console.log(error);
    }
};

const handleTokenExpireError = async () => {
    console.log("firebase token expire");
    try {
        const apiKey = import.meta.env.VITE_API_KEY;
        const refreshToken = localStorage.getItem("REFRESH_TOKEN");

        const url = `https://securetoken.googleapis.com/v1/token?key=${apiKey}`;
        const requestData = {
            grant_type: "refresh_token",
            refresh_token: refreshToken,
        };

        const response = await axios.post(url, requestData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        const data = response.data;
        console.log(data);

        const idTokenNew = data.id_token;
        const refreshTokenNew = data.refresh_token;
        localStorage.setItem("ID_TOKEN", idTokenNew);
        localStorage.setItem("REFRESH_TOKEN", refreshTokenNew);
    } catch (error: any) {
        console.log(error);
    }
};

// Workespaces Functions

export const fetchWorkspaces = async () => {
    try {
        const response = await api.get(`/workspaces`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const createWorkspace = async ({ name, description, createdBy }: { name: string; description: string; createdBy: string }) => {
    try {
        const response = await api.post("/workspaces", { name, description, createdBy });
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// Boards Functions

export const fetchBoards = async () => {
    try {
        const response = await api.get(`/boards`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const createBoard = async ({ name, workspaceId, createdBy }: { name: string; workspaceId: string; createdBy: string }) => {
    try {
        const response = await api.post("/boards", { name, workspaceId, createdBy });
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const updateBoard = async ({ boardId, newBoard }: { boardId: string; newBoard: BoardType }) => {
    try {
        const response = await api.put(`/boards/${boardId}`, { newBoard });

        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// Lists Functions

export const fetchLists = async () => {
    try {
        const response = await api.get(`/lists`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const fetchListsByBoardId = async ({ boardId }: { boardId: string }) => {
    try {
        const response = await api.get(`/lists/boards/${boardId}`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const createList = async ({ name, boardId, createdBy }: { name: string; boardId: string; createdBy: string }) => {
    try {
        const response = await api.post("/lists", { name, boardId, createdBy });
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const updateList = async ({ boardId, listId, newList }: { boardId: string; listId: string; newList: ListType }) => {
    try {
        const response = await api.put(`/lists/${listId}`, { newList });

        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// Tasks Functions

export const fetchTasks = async () => {
    try {
        const response = await api.get(`/tasks`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const fetchTasksByBoardId = async ({ boardId }: { boardId: string }) => {
    try {
        const response = await api.get(`/tasks/boards/${boardId}`);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const createTask = async (newTask: Task) => {
    try {
        const response = await api.post("/tasks", newTask);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const updateTask = async ({ boardId, taskId, newTask }: { boardId: string; taskId: string; newTask: TaskType }) => {
    try {
        const response = await api.put(`/tasks/${taskId}`, { newTask });

        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const moveTask = async ({
    boardId,
    taskId,
    startListId,
    finishListId,
    newStartList,
    newFinishList,
}: {
    boardId: string;
    taskId: string;
    startListId: string;
    finishListId: string;
    newStartList: ListType;
    newFinishList: ListType;
}) => {
    try {
        const response = await api.put(`/tasks/${taskId}/move`, {
            startListId,
            finishListId,
            newStartList,
            newFinishList,
        });
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// Notification Functions

export const fetchNotifications = async () => {
    try {
        const response = await api.get("/notifications");
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// Invitation functions

export const sendInvitation = async ({ boardId, clients }: { boardId: string; clients: string[] }) => {
    try {
        const response = await api.post("/invitation/send", { boardId, clients });
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

// User functions

export const createUser = async () => {
    try {
        const response = await api.post("/users");
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const fetchUsers = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};

export const searchUsersByName = async ({ name }: { name: string }) => {
    if (name.length < 2) {
        return [];
    }
    try {
        const response = await api.get(`/users/name/${name}`);
        console.log(response);
        return response.data;
    } catch (error: any) {
        await checkErrorType(error);
    }
};
