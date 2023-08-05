import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBoardMembers } from "../../api/api";

const useUpdateBoardMembers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateBoardMembers,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["Boards"] });
        },
    });
};

export default useUpdateBoardMembers;
