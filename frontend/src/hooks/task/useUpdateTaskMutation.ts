import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTask } from "../../api/api";
import { TaskType } from "../../types/taskTypes";
import useSocketContext from "../context/useSocketContext";

const useUpdateTaskMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: updateTask,
        onMutate: async ({ boardId, taskId, newTask }) => {
            await queryClient.cancelQueries(["Tasks", boardId]);
            const previousTaskData = queryClient.getQueryData(["Tasks", boardId]) as TaskType[];
            const newTaskData: TaskType[] = queryClient.setQueryData(["Tasks", boardId], (old: any) =>
                old.map((task: TaskType) => {
                    if (task._id === taskId) {
                        return newTask;
                    }
                    return task;
                })
            );
            return { previousTaskData, newTaskData };
        },
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Tasks", boardId], context?.previousTaskData);
            }
            // queryClient.invalidateQueries(["Tasks", boardId]);
            socket?.emit("invalidateTasks", boardId);
        },
    });
};

export default useUpdateTaskMutation;
