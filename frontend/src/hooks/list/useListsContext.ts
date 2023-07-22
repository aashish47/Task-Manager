import { useQuery } from "@tanstack/react-query";
import { fetchListsByBoardId } from "../../api/api";
import { ListType } from "../../types/listTypes";

const useListsContext = (boardId: string) => {
    const { data: lists } = useQuery<Array<ListType>>({ queryKey: ["Lists", boardId], queryFn: () => fetchListsByBoardId({ boardId }) });

    return lists;
};

export default useListsContext;
