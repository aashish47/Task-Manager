import { useQuery } from "@tanstack/react-query";
import { getWorkspaceById } from "../../api/api";
import { WorkspaceType } from "../../types/workspaceTypes";

const useGetWorkspaceById = (workspaceId: string) => {
    const { data: workspaces } = useQuery<WorkspaceType>(["Workspaces", workspaceId], () => getWorkspaceById({ workspaceId }));

    return workspaces;
};

export default useGetWorkspaceById;
