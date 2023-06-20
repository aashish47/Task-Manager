import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createBoard } from "../api/api";

const useCreateBoardMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createBoard,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useCreateBoardMutation;
