import { useQuery } from "@tanstack/react-query";
import { fetchTasksByBoardId } from "../../api/api";
import { TaskType } from "../../types/taskTypes";

const useTasksContext = (boardId: string) => {
    const { data: lists } = useQuery<Array<TaskType>>({ queryKey: ["Tasks", boardId], queryFn: () => fetchTasksByBoardId({ boardId }) });

    return lists;
};

export default useTasksContext;
