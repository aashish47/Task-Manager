import { useQuery } from "@tanstack/react-query";
import { fetchBoards } from "../../api/api";
import { BoardType } from "../../types/boardTypes";

const useBoardsContext = () => {
    const { data: boards } = useQuery<Array<BoardType>>({ queryKey: ["Boards"], queryFn: () => fetchBoards() });
    return boards;
};

export default useBoardsContext;
