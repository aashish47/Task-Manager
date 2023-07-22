import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWorkspace } from "../../api/api";

const useCreateWorkspaceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createWorkspace,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Workspaces"] });
        },
    });
};

export default useCreateWorkspaceMutation;
