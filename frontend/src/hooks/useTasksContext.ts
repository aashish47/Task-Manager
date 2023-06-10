import { useQuery } from "@tanstack/react-query";
import { fetchTasks } from "../api/api";

const useTasksContext = () => {
    const { data: lists } = useQuery<
        Array<{
            createdAt: string;
            createdBy: string;
            listId: string;
            name: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }>
    >({ queryKey: ["Tasks"], queryFn: () => fetchTasks() });

    return lists;
};

export default useTasksContext;
