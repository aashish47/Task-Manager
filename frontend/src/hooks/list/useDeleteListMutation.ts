import { useMutation } from "@tanstack/react-query";
import { deleteList } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useDeleteListMutation = () => {
    const socket = useSocketContext();

    return useMutation({
        mutationFn: deleteList,
        onSettled: (_data, _error, variables, _context) => {
            const { boardId } = variables;
            socket?.emit("invalidateLists", boardId);
            socket?.emit("invalidateBoards", boardId);
        },
    });
};

export default useDeleteListMutation;
