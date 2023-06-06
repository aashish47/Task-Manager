import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../api/api";

const useBoardsContext = () => {
    const { data: boards } = useQuery<
        Array<{
            createdAt: string;
            createdBy: string;
            workspaceId: string;
            name: string;
            updatedAt: string;
            __v: number;
            _id: string;
        }>
    >({ queryKey: ["Boards"], queryFn: () => fetchBoards() });

    return boards;
};

export default useBoardsContext;
