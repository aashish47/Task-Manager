import { useQuery } from "@tanstack/react-query";
import { fetchWorkspaces } from "../api/api";
import { WorkspaceType } from "../types/workspaceTypes";

const useWorkspacesContext = () => {
    const { data: workspaces } = useQuery<Array<WorkspaceType>>(["Workspaces"], () => fetchWorkspaces());

    return workspaces;
};

export default useWorkspacesContext;
