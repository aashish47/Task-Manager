import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../api/api";

const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteComment,
        onSettled: (data, error, variables, context) => {
            const { taskId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Comments", taskId] });
        },
    });
};

export default useDeleteCommentMutation;
