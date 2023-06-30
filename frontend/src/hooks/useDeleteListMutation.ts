import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteList } from "../api/api";

const useDeleteListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteList,
        onSettled: (data, error, variables, context) => {
            const { boardId } = variables;
            queryClient.invalidateQueries({ queryKey: ["Lists", boardId] });
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useDeleteListMutation;
