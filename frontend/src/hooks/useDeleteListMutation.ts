import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../api/api";
import { Socket } from "socket.io-client";
import useSocketContext from "./useSocketContext";

const useDeleteListMutation = () => {
    const queryClient = useQueryClient();
    const socket = useSocketContext();

    return useMutation({
        mutationFn: deleteList,
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            // queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });
            // queryClient.invalidateQueries({ queryKey: ["Boards"] });
            socket?.emit("invalidateLists", boardId);
            socket?.emit("invalidateBoards", boardId);
        },
    });
};

export default useDeleteListMutation;
