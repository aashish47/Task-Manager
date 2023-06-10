import { useQuery } from "@tanstack/react-query";
import { fetchLists } from "../api/api";

const useListsContext = () => {
    const { data: lists } = useQuery<
        Array<{
            createdAt: string;
            createdBy: string;
            boardId: string;
            name: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }>
    >({ queryKey: ["Lists"], queryFn: () => fetchLists() });

    return lists;
};

export default useListsContext;
