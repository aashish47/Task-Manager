import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../api/api";
import useSocketContext from "./useSocketContext";

const useCreateCommentMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createComment,
        onSuccess: (data, variables, context) => {
            const { taskId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Comments", taskId] });
            socket?.emit("invalidateComments", taskId);
        },
    });
};

export default useCreateCommentMutation;
