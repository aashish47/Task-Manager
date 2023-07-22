import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTask } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useDeleteTaskMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: deleteTask,
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Tasks", boardId] });
            // queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });

            socket?.emit("invalidateTasks", boardId);
            socket?.emit("invalidateLists", boardId);
        },
    });
};

export default useDeleteTaskMutation;
