import axios from "axios";
import { getRefreshApiKey } from "../helpers/refreshTokenHelper";
import { updateToken } from "../helpers/tokenManager";
import { BoardType, CreateBoardType } from "../types/boardTypes";
import { CreateCommentType } from "../types/commentTypes";
import { CreateListType, ListType } from "../types/listTypes";
import { CreateTaskType, TaskType } from "../types/taskTypes";
import { CreateWorkspaceType, WorkspaceType } from "../types/workspaceTypes";

const baseURL = "https://task-manager-dt0i.onrender.com";
// const baseURL = "http://localhost:3000";

const api = axios.create({
    // baseURL: "http://localhost:3000/api",
    baseURL: `${baseURL}/api`,
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

export const handleTokenExpireError = async () => {
    console.log("firebase token expire");
    try {
        const apiKey = getRefreshApiKey();
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

        const idTokenNew = data.id_token;
        const refreshTokenNew = data.refresh_token;
        localStorage.setItem("ID_TOKEN", idTokenNew);
        localStorage.setItem("REFRESH_TOKEN", refreshTokenNew);
        updateToken(idTokenNew);
    } catch (error) {
        console.log(error);
    }
};

// Workespaces Functions

export const getWorkspacesByMembers = async () => {
    try {
        const response = await api.get(`/workspaces`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const createWorkspace = async (workspace: CreateWorkspaceType) => {
    try {
        const response = await api.post("/workspaces", workspace);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const getWorkspaceById = async ({ workspaceId }: { workspaceId: string }) => {
    try {
        const response = await api.get(`/workspaces/${workspaceId}`);
        return response.data;
    } catch (error) {
        checkErrorType(error);
    }
};

export const updateWorkspace = async ({ workspaceId, newWorkspace }: { workspaceId: string; newWorkspace: WorkspaceType }) => {
    try {
        const response = await api.put(`/workspaces/${workspaceId}`, { newWorkspace });

        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const updateWorkspaceMembers = async ({ workspaceId, members }: { workspaceId: string; members: string[] }) => {
    try {
        const response = await api.put(`/workspaces/${workspaceId}/members`, { members });
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const deleteWorkspace = async ({ workspaceId }: { workspaceId: string }) => {
    try {
        const response = await api.delete(`/workspaces/${workspaceId}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

// Boards Functions

export const fetchBoards = async () => {
    try {
        const response = await api.get(`/boards`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const createBoard = async (board: CreateBoardType) => {
    try {
        const response = await api.post("/boards", board);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const updateBoard = async ({ boardId, newBoard }: { boardId: string; newBoard: BoardType }) => {
    try {
        const response = await api.put(`/boards/${boardId}`, { newBoard });

        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const deleteBoard = async ({ boardId }: { boardId: string }) => {
    try {
        const response = await api.delete(`/boards/${boardId}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const updateBoardMembers = async ({ boardId, members }: { boardId: string; members: string[] }) => {
    try {
        const response = await api.put(`/boards/${boardId}/members`, { members });
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

// Lists Functions

export const fetchLists = async () => {
    try {
        const response = await api.get(`/lists`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const fetchListsByBoardId = async ({ boardId }: { boardId: string }) => {
    try {
        const response = await api.get(`/lists/boards/${boardId}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const createList = async (List: CreateListType) => {
    try {
        const response = await api.post("/lists", List);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const updateList = async ({ boardId, listId, newList }: { boardId: string; listId: string; newList: ListType }) => {
    try {
        const response = await api.put(`/lists/${listId}`, { newList, boardId });

        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const deleteList = async ({ boardId, listId }: { boardId: string; listId: string }) => {
    try {
        const response = await api.delete(`/lists/${listId}`);
        return response.data;
    } catch (error) {
        console.log(boardId);
        await checkErrorType(error);
    }
};

// Tasks Functions

export const fetchTasks = async () => {
    try {
        const response = await api.get(`/tasks`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const fetchTasksByBoardId = async ({ boardId }: { boardId: string }) => {
    try {
        const response = await api.get(`/tasks/boards/${boardId}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const createTask = async (task: CreateTaskType) => {
    try {
        const response = await api.post("/tasks", task);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const updateTask = async ({ boardId, taskId, newTask }: { boardId: string; taskId: string; newTask: TaskType }) => {
    try {
        const response = await api.put(`/tasks/${taskId}`, { newTask, boardId });
        return response.data;
    } catch (error) {
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
            boardId,
        });
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const deleteTask = async ({ boardId, taskId }: { boardId: string; taskId: string }) => {
    try {
        const response = await api.delete(`/tasks/${taskId}`);
        return response.data;
    } catch (error) {
        console.log(boardId);
        await checkErrorType(error);
    }
};

// Notification Functions

export const fetchNotifications = async () => {
    try {
        const response = await api.get("/notifications");
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

// User functions

export const createUser = async (newUser: { uid: string; name: string; email: string }) => {
    try {
        const response = await api.post("/users", newUser);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const getUserByUid = async ({ uid }: { uid: string }) => {
    try {
        const response = await api.get(`/users/uid/${uid}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const searchUsersByName = async ({ name }: { name: string }) => {
    if (name.length < 2) {
        return [];
    }
    try {
        const response = await api.get(`/users/name/${name}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

// Comments Functions

export const fetchCommentsByTaskId = async ({ taskId }: { taskId: string }) => {
    try {
        const response = await api.get(`/comments/task/${taskId}`);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const createComment = async (comment: CreateCommentType) => {
    try {
        const response = await api.post("/comments", comment);
        return response.data;
    } catch (error) {
        await checkErrorType(error);
    }
};

export const deleteComment = async ({ commentId, taskId }: { commentId: string; taskId: string }) => {
    try {
        const response = await api.delete(`/comments/${commentId}`);
        return response.data;
    } catch (error) {
        console.log(taskId);
        await checkErrorType(error);
    }
};

// Config request

export const getConfig = async () => {
    try {
        const response = await axios.get(`${baseURL}/config`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};
