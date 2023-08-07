import { useMutation } from "@tanstack/react-query";
import { createTask } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useCreateTaskMutation = () => {
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createTask,
        onSuccess: (_data, variables, _context) => {
            const { boardId } = variables;

            socket?.emit("invalidateTasks", boardId);
            socket?.emit("invalidateLists", boardId);
        },
    });
};

export default useCreateTaskMutation;
