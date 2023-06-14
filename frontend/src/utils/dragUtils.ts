import { DropResult } from "react-beautiful-dnd";
import { ListType } from "../hooks/useListsContext";
import { UseMutationResult } from "@tanstack/react-query";
import { TaskType } from "../hooks/useTasksContext";

export const onDragEnd = async (
    result: DropResult,
    moveTaskMutation: UseMutationResult<
        any,
        unknown,
        { taskId: string; startListId: string; finishListId: string; newStartList: ListType; newFinishList: ListType },
        { previousData: { previousTaskData: TaskType[]; previousListData: ListType[] }; newData: { newTaskData: TaskType[]; newListData: ListType[] } }
    >,
    updateListMutation: UseMutationResult<any, unknown, { listId: string; newList: ListType }, { previousListData: ListType[]; newListData: ListType[] }>,
    lists: ListType[] | null
) => {
    const { draggableId, source, destination } = result;

    if (!destination) {
        return;
    }
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
        return;
    }

    const startList = lists?.find((list) => list._id === source.droppableId);
    const finishList = lists?.find((list) => list._id === destination.droppableId);

    if (startList && finishList) {
        if (startList === finishList) {
            const newTasksIds = Array.from(startList.tasksIds);
            newTasksIds.splice(source.index, 1);
            newTasksIds.splice(destination.index, 0, draggableId);
            const newList = { ...startList, tasksIds: newTasksIds } as ListType;

            try {
                await updateListMutation.mutateAsync({ listId: startList._id, newList });
            } catch (error) {
                console.error("Error updating list tasks:", error);
            }
        } else {
            const newStartTasksIds = Array.from(startList.tasksIds);
            newStartTasksIds.splice(source.index, 1);
            const newStartList = { ...startList, tasksIds: newStartTasksIds } as ListType;

            const newFinishTasksIds = Array.from(finishList.tasksIds);
            newFinishTasksIds.splice(destination.index, 0, draggableId);
            const newFinishList = { ...finishList, tasksIds: newFinishTasksIds } as ListType;

            try {
                await moveTaskMutation.mutateAsync({
                    taskId: draggableId,
                    startListId: startList._id,
                    finishListId: finishList._id,
                    newStartList,
                    newFinishList,
                });
            } catch (error) {
                console.error("Error updating list tasks:", error);
            }
        }
    }
};
