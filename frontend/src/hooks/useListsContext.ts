import { useQuery } from "@tanstack/react-query";
import { fetchLists } from "../api/api";

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

const useListsContext = () => {
    const { data: lists } = useQuery<Array<ListType>>({ queryKey: ["Lists"], queryFn: () => fetchLists() });

    return lists;
};

export default useListsContext;
