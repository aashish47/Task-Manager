import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveTask } from "../../api/api";
import useSocketContext from "../context/useSocketContext";
import { ListType } from "../../types/listTypes";
import { TaskType } from "../../types/taskTypes";

const useMoveTaskMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();

    return useMutation({
        mutationFn: moveTask,
        onMutate: async ({ boardId, taskId, startListId, finishListId, newStartList, newFinishList }) => {
            await queryClient.cancelQueries(["Tasks", boardId]);
            await queryClient.cancelQueries(["Lists", boardId]);

            const previousTaskData = queryClient.getQueryData(["Tasks", boardId]) as TaskType[];
            const previousListData = queryClient.getQueryData(["Lists", boardId]) as ListType[];
            const previousData = { previousTaskData, previousListData };

            const newListData = queryClient.setQueryData(["Lists", boardId], (old: any) =>
                old.map((list: ListType) => {
                    if (list._id === startListId) {
                        return newStartList;
                    }
                    if (list._id === finishListId) {
                        return newFinishList;
                    }
                    return list;
                })
            );

            const newTaskData: TaskType[] = queryClient.setQueryData(["Tasks", boardId], (old: any) =>
                old.map((task: TaskType) => {
                    if (task._id === taskId) {
                        return { ...task, listId: finishListId };
                    }

                    return task;
                })
            );

            const newData = { newTaskData, newListData };

            return { previousData, newData };
        },
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Tasks", boardId], context?.previousData.previousTaskData);
                queryClient.setQueryData(["Lists", boardId], context?.previousData.previousListData);
            }

            // queryClient.invalidateQueries(["Tasks", boardId]);
            // queryClient.invalidateQueries(["Lists", boardId]);
            socket?.emit("invalidateTasks", boardId);
            socket?.emit("invalidateLists", boardId);
        },
    });
};

export default useMoveTaskMutation;
