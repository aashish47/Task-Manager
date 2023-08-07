import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteWorkspace } from "../../api/api";

const useDeleteWorkspaceMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteWorkspace,
        onSettled: (_data, _error, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["Workspaces"] });
        },
    });
};

export default useDeleteWorkspaceMutation;
