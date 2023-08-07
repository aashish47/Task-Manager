import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBoard } from "../../api/api";

const useDeleteBoardMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteBoard,
        onSettled: (_data, _error, _variables, _context) => {
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useDeleteBoardMutation;
