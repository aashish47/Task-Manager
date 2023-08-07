import { useMutation } from "@tanstack/react-query";
import { createComment } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useCreateCommentMutation = () => {
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createComment,
        onSuccess: (_data, variables, _context) => {
            const { taskId } = variables;
            socket?.emit("invalidateComments", taskId);
        },
    });
};

export default useCreateCommentMutation;
