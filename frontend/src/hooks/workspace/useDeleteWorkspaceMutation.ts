import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../../api/api";

const useDeleteWorkspaceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWorkspace,
        onSettled: (data, error, variables, context) => {
            const { workspaceId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Workspaces"] });
        },
    });
};

export default useDeleteWorkspaceMutation;
