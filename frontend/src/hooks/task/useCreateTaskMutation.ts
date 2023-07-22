import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createTask } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useCreateTaskMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createTask,
        onSuccess: (data, variables, context) => {
            const { boardId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Tasks", boardId] });
            // queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });
            socket?.emit("invalidateTasks", boardId);
            socket?.emit("invalidateLists", boardId);
        },
    });
};

export default useCreateTaskMutation;
