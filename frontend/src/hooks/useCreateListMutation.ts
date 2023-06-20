import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createList } from "../api/api";

const useCreateListMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createList,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Lists"] });
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useCreateListMutation;
