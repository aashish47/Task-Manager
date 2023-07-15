import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createList } from "../api/api";
import useSocketContext from "./useSocketContext";

const useCreateListMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();
    return useMutation({
        mutationFn: createList,
        onSuccess: (data, variables, context) => {
            const { boardId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });
            // queryClient.invalidateQueries({ queryKey: ["Boards"] });
            socket?.emit("invalidateLists", boardId);
            socket?.emit("invalidateBoards", boardId);
        },
    });
};

export default useCreateListMutation;
