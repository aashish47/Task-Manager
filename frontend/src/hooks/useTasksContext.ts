import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/api";

export type TaskType = {
    createdAt: string;
    createdBy: string;
    listId: string;
    name: string;
    updatedAt: string;
    __v: number;
    _id: string;
};

const useTasksContext = () => {
    const { data: lists } = useQuery<Array<TaskType>>({ queryKey: ["Tasks"], queryFn: () => fetchTasks() });

    return lists;
};

export default useTasksContext;
