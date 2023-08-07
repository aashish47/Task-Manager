import { useMutation } from "@tanstack/react-query";
import { deleteTask } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useDeleteTaskMutation = () => {
    const socket = useSocketContext();
    return useMutation({
        mutationFn: deleteTask,
        onSettled: (_data, _error, variables, _context) => {
            const { boardId } = variables;

            socket?.emit("invalidateTasks", boardId);
            socket?.emit("invalidateLists", boardId);
        },
    });
};

export default useDeleteTaskMutation;
