import { useMutation, useQueryClient } from "@tanstack/react-query";
import { moveTask } from "../api/api";
import { ListType } from "./useListsContext";
import { TaskType } from "./useTasksContext";

const useMoveTaskMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: moveTask,
        onMutate: async ({ taskId, startListId, finishListId, newStartList, newFinishList }) => {
            await queryClient.cancelQueries(["Tasks"]);
            await queryClient.cancelQueries(["Lists"]);

            const previousTaskData = queryClient.getQueryData(["Tasks"]) as TaskType[];
            const previousListData = queryClient.getQueryData(["Lists"]) as ListType[];
            const previousData = { previousTaskData, previousListData };

            const newListData = queryClient.setQueryData(["Lists"], (old: any) =>
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

            const newTaskData: TaskType[] = queryClient.setQueryData(["Tasks"], (old: any) =>
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
            if (error) {
                console.log(error);
                queryClient.setQueryData(["Tasks"], context?.previousData.previousTaskData);
                queryClient.setQueryData(["Lists"], context?.previousData.previousListData);
            }

            queryClient.invalidateQueries(["Tasks"]);
            queryClient.invalidateQueries(["Lists"]);
        },
    });
};

export default useMoveTaskMutation;
