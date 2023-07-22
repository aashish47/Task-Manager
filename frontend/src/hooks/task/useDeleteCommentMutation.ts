import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteComment } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useDeleteCommentMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: deleteComment,
        onSettled: (data, error, variables, context) => {
            const { taskId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Comments", taskId] });
            socket?.emit("invalidateComments", taskId);
        },
    });
};

export default useDeleteCommentMutation;
