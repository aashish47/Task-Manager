import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateWorkspaceMembers } from "../../api/api";

const useUpdateWorkspaceMembers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateWorkspaceMembers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Workspaces"] });
        },
    });
};

export default useUpdateWorkspaceMembers;
