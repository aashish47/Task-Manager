import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspace } from "../../api/api";
import { WorkspaceType } from "../../types/workspaceTypes";
import useSocketContext from "../context/useSocketContext";

const useUpdateWorkspaceMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: updateWorkspace,
        onMutate: async ({ workspaceId, newWorkspace }) => {
            await queryClient.cancelQueries(["Workspaces"]);

            const previousWorkspaceData = queryClient.getQueryData(["Workspaces"]) as WorkspaceType[];

            const newWorkspaceData: WorkspaceType[] = queryClient.setQueryData(["Workspaces"], (old: any) =>
                old.map((workspace: WorkspaceType) => {
                    if (workspace._id === workspaceId) {
                        return newWorkspace;
                    }
                    return workspace;
                })
            );
            return { previousWorkspaceData, newWorkspaceData };
        },
        onSettled: (_data, error, variables, context) => {
            const { workspaceId } = variables;
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Workspaces"], context?.previousWorkspaceData);
            }
            socket?.emit("invalidateWorkspaces", workspaceId);
        },
    });
};

export default useUpdateWorkspaceMutation;
