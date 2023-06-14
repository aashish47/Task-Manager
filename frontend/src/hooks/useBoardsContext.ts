import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../api/api";

export type BoardType = {
    createdAt: string;
    createdBy: string;
    workspaceId: string;
    name: string;
    listsIds: [string];
    updatedAt: string;
    __v: number;
    _id: string;
};

const useBoardsContext = () => {
    const { data: boards } = useQuery<Array<BoardType>>({ queryKey: ["Boards"], queryFn: () => fetchBoards() });

    return boards;
};

export default useBoardsContext;
