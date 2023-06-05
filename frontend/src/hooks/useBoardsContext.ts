import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../api/api";

const useBoardsContext = () => {
    const { data: boardsData } = useQuery<
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

    return boardsData;
};

export default useBoardsContext;
