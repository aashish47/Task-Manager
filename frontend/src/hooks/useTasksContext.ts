import { useQuery } from "@tanstack/react-query";
import { fetchTasksByBoardId } from "../api/api";

export type TaskType = {
    createdAt: string;
    createdBy: string;
    listId: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useTasksContext = (boardId: string) => {
    const { data: lists } = useQuery<Array<TaskType>>({ queryKey: ["Tasks", boardId], queryFn: () => fetchTasksByBoardId({ boardId }) });

    return lists;
};

export default useTasksContext;
