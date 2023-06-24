import { useQuery } from "@tanstack/react-query";
import { fetchListsByBoardId } from "../api/api";

export type ListType = {
    createdAt: string;
    createdBy: string;
    boardId: string;
    name: string;
    tasksIds: [string];
    updatedAt: string;
    __v: number;
    _id: string;
};

const useListsContext = (boardId: string) => {
    const { data: lists } = useQuery<Array<ListType>>({ queryKey: ["Lists", boardId], queryFn: () => fetchListsByBoardId({ boardId }) });

    return lists;
};

export default useListsContext;
