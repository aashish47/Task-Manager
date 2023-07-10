import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/api";

const useCreateCommentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createComment,
        onSuccess: (data, variables, context) => {
            const { taskId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Comments", taskId] });
        },
    });
};

export default useCreateCommentMutation;
