import axios from "axios";
import useAuthContext from "../hooks/useAuthContext";
import { useEffect } from "react";

const api = axios.create({
    baseURL: "http://localhost:3000/api",
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
});

export const fetchWorkspaces = async (uid: string) => {
    try {
        const response = await api.get(`/workspaces?uid=${uid}`);
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error fetching workspaces");
        }
    }
};

export const createWorkspace = async ({ name, description, createdBy }: { name: string; description: string; createdBy: string }) => {
    try {
        const response = await api.post("/workspaces", { name, description, createdBy });
        return response.data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        } else {
            throw new Error("Error creating workspace");
        }
    }
};
