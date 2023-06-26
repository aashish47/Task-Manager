import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces } from "../api/api";

export type WorkspaceType = {
    createdAt: string;
    createdBy: string;
    description: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useWorkspacesContext = () => {
    const { data: workspaces } = useQuery<Array<WorkspaceType>>(["Workspaces"], () => fetchWorkspaces());

    return workspaces;
};

export default useWorkspacesContext;
