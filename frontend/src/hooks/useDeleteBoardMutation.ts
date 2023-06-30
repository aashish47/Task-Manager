import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../api/api";

const useDeleteBoardMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBoard,
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useDeleteBoardMutation;
