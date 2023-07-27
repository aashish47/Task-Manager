import { useQuery } from "@tanstack/react-query";
import { getWorkspacesByMembers } from "../../api/api";
import { WorkspaceType } from "../../types/workspaceTypes";

const useWorkspacesContext = () => {
    const { data: workspaces } = useQuery<Array<WorkspaceType>>(["Workspaces"], () => getWorkspacesByMembers());

    return workspaces;
};

export default useWorkspacesContext;
