import { useMutation } from "@tanstack/react-query";
import { createList } from "../../api/api";
import useSocketContext from "../context/useSocketContext";

const useCreateListMutation = () => {
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createList,
        onSuccess: (_data, variables, _context) => {
            const { boardId } = variables;

            socket?.emit("invalidateLists", boardId);
            socket?.emit("invalidateBoards", boardId);
        },
    });
};

export default useCreateListMutation;
