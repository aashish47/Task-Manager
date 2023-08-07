import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useDeleteCommentMutation = () => {
    const socket = useSocketContext();
    return useMutation({
        mutationFn: deleteComment,
        onSettled: (_data, _error, variables, _context) => {
            const { taskId } = variables;
            socket?.emit("invalidateComments", taskId);
        },
    });
};

export default useDeleteCommentMutation;
