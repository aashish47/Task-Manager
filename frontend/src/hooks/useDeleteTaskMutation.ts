import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../api/api";

const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteTask,
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Tasks", boardId] });
            queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });
        },
    });
};

export default useDeleteTaskMutation;
